import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

declare function unescape(s:string): string;
declare function escape(s:string): string;

declare var getSfApiWrapperAccount : () => DataApiAccount;
declare var getSfApiWrapperContact : () => DataApiContact;
declare var getSfApiWrapperHomePage : () => DataApiHomePage;

//Response information
export interface ApiStatus {
    statusCode: number;
    status: boolean;
    code: string;
    message: string;
    method?: string;
}

//Callback function for the API call
export interface ApiHandler<T> {
    (response: T, status: ApiStatus);
}

//Config options for making api call.
export interface CallConfiguration { buffer: boolean, escape: boolean, timeout: number }

const DEFAULT_CONFIG: CallConfiguration = { buffer: true, escape: false, timeout: 30000 };

//Interface of the JS wrapper provided by Salesforce
export interface DataApiAccount {
  getAccount( callback : ApiHandler<string>, configuration : CallConfiguration) : void;
}
export interface DataApiContact {
  getContact( callback : ApiHandler<string>, configuration : CallConfiguration) : void;
}

export interface DataApiHomePage {
  scheduleEmail( callback : ApiHandler<string>, configuration : CallConfiguration) : void;
  getSummaryCardsDetails(data: any, callback : ApiHandler<string>, configuration : CallConfiguration) : void;
  getActivityHistoryList(data: any, callback : ApiHandler<string>, configuration : CallConfiguration) : void;
  syncLeadWithDP360( callback : ApiHandler<string>, configuration : CallConfiguration) : void;

  // scheduleEmail: function(){
  //   return RemoteActionService($q, '{!$RemoteAction.NewHomePageCtrl.IsSystemvisted}');
  // },
  // getSummaryCardsDetails: function(SummaryCardsDefultJson){
  //   return RemoteActionService($q, '{!$RemoteAction.NewHomePageCtrl.getSummaryCardsDetails}',SummaryCardsDefultJson);
  // },
  // getActivityHistoryList: function(ActivityName){
  //   return RemoteActionService($q, '{!$RemoteAction.NewHomePageCtrl.getActivityHistoryList}',ActivityName);
  // },
  // syncLeadWithDP360: function(){
  //   return RemoteActionService($q, '{!$RemoteAction.NewHomePageCtrl.syncLeadWithDP360}');
  // }
}


class ApiObservableBuilder<T> {
    
      constructor() {
      }
    
      observer: any;
    
      private handleResponse(resp: T, status: ApiStatus) {

        if (!(status.statusCode >= 200 && status.statusCode <= 302)) {
            this.observer.error("Error response from api: " + status.statusCode + " " + JSON.stringify(status));
        } else {
            let result : any = this.decodeString(resp);
            if (typeof result === 'string') {
              try {
                //Server response may be well defined but the wrapper may not automatically 
                //json parse all response types.
                result = JSON.parse(result);
              } catch (e) {
    
              }
            }
            this.observer.next(result);
            this.observer.complete();
        }
      }
      decodeString(inputString) {
        if (inputString == null) {
            return inputString;
        }
        try {
            var res = inputString.match('^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$');
        } catch (ex) {}
        
        if (res == null) {
            return inputString;
        }
        var outputString = decodeURIComponent(escape(window.atob(inputString)));
        return outputString;
        }
    
      public getResponseHandler() : (resp: T, status: ApiStatus) => void {
        return this.handleResponse.bind(this);
      }
      
      public build(apiCall : () => void) : Observable<T> {
        let builder = this;
        let observable : Observable<T> = Observable.create(function(observer) {
          builder.observer = observer;
    
          apiCall();
        });
        return observable;
      }
}
    
    
@Injectable()
export class SalesforceApiService {
  DataApiHomePage = getSfApiWrapperHomePage();
    private getCallBuilder<T>() : ApiObservableBuilder<T> {
        return new ApiObservableBuilder<T>();
    }
    public getAccount() : Observable<string> {
        let accountApi = getSfApiWrapperAccount();
        let builder = this.getCallBuilder<string>();
        return builder.build(() => accountApi.getAccount( builder.getResponseHandler(), DEFAULT_CONFIG));
    }
    public getContact() : Observable<string> {
      let contactApi = getSfApiWrapperContact();
      let builder = this.getCallBuilder<string>();
      return builder.build(() => contactApi.getContact( builder.getResponseHandler(), DEFAULT_CONFIG));
  }
  public scheduleEmail() : Observable<string> {
    let contactApi = getSfApiWrapperContact();
    let builder = this.getCallBuilder<string>();
    return builder.build(() => this.DataApiHomePage.scheduleEmail( builder.getResponseHandler(), DEFAULT_CONFIG));
}
public getSummaryCardsDetails(data) : Observable<string> {
  let contactApi = getSfApiWrapperContact();
  let builder = this.getCallBuilder<string>();
  return builder.build(() => this.DataApiHomePage.getSummaryCardsDetails(this.encodeString(data), builder.getResponseHandler(), DEFAULT_CONFIG));
}
public getActivityHistoryList(data) : Observable<string> {
  let contactApi = getSfApiWrapperContact();
  let builder = this.getCallBuilder<string>();
  return builder.build(() => this.DataApiHomePage.getActivityHistoryList(this.encodeString(data), builder.getResponseHandler(), DEFAULT_CONFIG));
}
public syncLeadWithDP360() : Observable<string> {
  let contactApi = getSfApiWrapperContact();
  let builder = this.getCallBuilder<string>();
  return builder.build(() => this.DataApiHomePage.syncLeadWithDP360( builder.getResponseHandler(), DEFAULT_CONFIG));
}
encodeString(inputString) {
  if (inputString == null) {
      return inputString;
  }
  var outputString = window.btoa(unescape(encodeURIComponent(inputString)));
  return outputString;
}


}
