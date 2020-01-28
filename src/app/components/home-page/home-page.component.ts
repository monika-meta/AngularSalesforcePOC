import { Component, OnInit } from '@angular/core';
import { SalesforceApiService } from '../../sf-api-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private _sfApi: SalesforceApiService) {}

  ngOnInit() {
    this.loadHomePageData();
  this.loadActivityData();
  }
  homePageModel = {};
  count = 1;
  currentDate = new Date();
  IsTrialOrg 
  communityURL
  IsSystemSettingVisited
  IsSampleDataAvailable 
  IsDP360SyncEnabled 
  ActiveFilter = [];
  ActivityList = [];
  feedLoading = true;
  DefaultActivityListSize = 12;
  DefaultActivityActiveJSON = {
      Type: 'My Activity',
      RequiredNumberOfRecords: this.ActivityList.length + this.DefaultActivityListSize
  }
  WidgetPermissionMap = {
      'Invoices': ['Customer invoicing'],
      'Payments': ['Customer invoicing'],
      'New Customers': [],
      'New': ['Service job'],
      'Active': ['Service job'],
      'Completed': ['Service job'],
      'Active Orders': ['Vendor order'],
      'Active Receivings': ['Vendor receiving'],
      'Parts Needed': [],
      'Active Orderss': ['Merchandise', 'Service job', 'Deal'],
      'Deposits': ['Merchandise', 'Service job', 'Deal'],
      'Balance Due': ['Merchandise', 'Service job', 'Deal']
  };
  WidgetPermissionMap1 = {
      'Store Summary': {
          'Invoices': ['Customer invoicing'],
          'Payments': ['Customer invoicing'],
          'New Customers': []
      },
      'Service Jobs': {
          'New': ['Service job'],
          'Active': ['Service job'],
          'Completed': ['Service job']
      },
      'Vendor Orders': {
          'Active Orders': ['Vendor order'],
          'Active Receivings': ['Vendor receiving'],
          'Parts Needed': []
      },
      'Customer Orders': {
          'Active Orders': ['Merchandise', 'Service job', 'Deal'],
          'Deposits': ['Merchandise', 'Service job', 'Deal'],
          'Balance Due': ['Merchandise', 'Service job', 'Deal']
      }
  };
  MockTabs = [{
      Name: 'first'
  }, {
      Name: 'second'
  }, {
      Name: 'three'
  }];
  MockCardBox = [{
      Name: 'first'
  }, {
      Name: 'second'
  }, {
      Name: 'three'
  }];
   cardResponseResult:any = [{
    isLoading: true
}, {
    isLoading: true
}, {
    isLoading: true
}, {
    isLoading: true
}];
widgets = [{
    Name: 'Store Summary',
    BlockList: [{
        FilterName: 'Today'
    }]
}, {
    Name: 'Service Jobs',
    BlockList: [{
        FilterName: 'Customer Pay'
    }]
}, {
    Name: 'Vendor Orders',
    BlockList: [{
        FilterName: null
    }]
}, {
    Name: 'Customer Orders',
    BlockList: [{
        FilterName: null
    }]
}];

  setFontSizeForBlockData(value) {
      value = value.toString();
      var minCharLength = 8;
      var noOfChars = value.length;
      var fontSize = 20;
      var fontSizeValue = "20px";
      if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
          fontSizeValue = (13 - (noOfChars - minCharLength)) + "px";
      } else if (noOfChars <= minCharLength) {
          fontSizeValue = fontSize + "px";
      } else {
          fontSizeValue = (fontSize - (noOfChars - minCharLength)) + "px";
      }
      return fontSizeValue;
  }

  NewCustomer() {
      // loadState($state, 'AddEditCustomer');
  }

  NewVendor() {
      // loadState($state, 'AddEditVendor');
  }

  NewPart() {
      // loadState($state, 'AddEditPart');
  }

 createVOHeaderOrReceivingOrInvoicing(type) {
      // $rootScope.$broadcast('CreateVendorPopUpEvent', type);
  }

  openHeader() {
      setTimeout(function() {
          // angular.element('.createBtn').parent().addClass('open');
      }, 10);
  }

   openSearchBar() {
     
  }

   to_trusted(html_code) {
      return '';
  }

  firstTimeLogin() {
    
  }
  currentRefreshCardIndex;

  cardFilder(filterName, cardIndex) {
    let  filtersJSON = [{
          Name: this.cardResponseResult[cardIndex].Name,
          BlockList: [{
              FilterName: filterName
          }]
      }];
      for (let j = 0; j < this.cardResponseResult[cardIndex].FilterList.length; j++) {
          if (filterName == this.cardResponseResult[cardIndex].FilterList[j].Name) {
            this.cardResponseResult[cardIndex].FilterList[j].IsActive = true;
          } else {
            this.cardResponseResult[cardIndex].FilterList[j].IsActive = false;
          }
      }
      this._sfApi.getSummaryCardsDetails(JSON.stringify(filterName))
      .subscribe((successResult:any) => {
          this.currentRefreshCardIndex = cardIndex;
          this.cardResponseResult[cardIndex] = successResult[0];
          for (let j = 0; j < this.cardResponseResult[cardIndex].FilterList.length; j++) {
              if (filterName == this.cardResponseResult[cardIndex].FilterList[j].Name) {
                  this.cardResponseResult[cardIndex].FilterList[j].IsActive = true;
              }
          }
      }, (errorMessage)=> {
          // Notification.error(errorMessage);
      });
  }

   loadHomePageData() :any{
    
      this.widgets.forEach((params, index)=> {
          this.getWidgetData([params], index);
      });
  }

  getWidgetData(params, index) :any{
    this._sfApi.getSummaryCardsDetails(JSON.stringify(params))
    .subscribe((response:any) => {
      console.log("response1", response);
      this.cardResponseResult[index] = (response && response[0]) ? response[0] : null;
      for (let j = 0; j < this.cardResponseResult[index].FilterList.length; j++) {
          if (this.cardResponseResult[index].FilterList[j].FilterOrderNumber == 1) {
            this.cardResponseResult[index].FilterList[j].IsActive = true;
          } else {
            this.cardResponseResult[index].FilterList[j].IsActive = false;
          }
      }
      
    }) 
  }

  loadActivityData() {
      this.DefaultActivityActiveJSON.RequiredNumberOfRecords = this.ActivityList.length + this.DefaultActivityListSize;
      this._sfApi.getActivityHistoryList(JSON.stringify(this.DefaultActivityActiveJSON))
    .subscribe((successResult:any) => {
          this.ActivityList = successResult;
              // setTimeout(function() {
              //     var ActivityContainerHeight = angular.element(".Bp_home_topCardHead").height();
              //     ActivityContainerHeight = ActivityContainerHeight - 14;
              //     var ActivityDataContainerHeight = ActivityContainerHeight - 95;
              //     angular.element(".Bp_home_LongCardBlockMock").css("height", ActivityContainerHeight + 'px');
              //     angular.element(".Bp_home_LongCardBlock").css("height", ActivityContainerHeight + 'px');
              //     angular.element(".BP_Home_activity_history_data").css("height", ActivityDataContainerHeight + 'px');
              // }, 10);
          this.feedLoading = false;
      }, (errorMessage) =>{
          this.feedLoading = false;
          // Notification.error(errorMessage);
      });
  }

  ActivityHistoryToggle(ActivityName) {
      this.DefaultActivityActiveJSON.Type = ActivityName;
      this.DefaultActivityActiveJSON.RequiredNumberOfRecords = this.DefaultActivityListSize;
      this._sfApi.getActivityHistoryList(JSON.stringify(this.DefaultActivityActiveJSON))
    .subscribe((successResult:any) => {
          this.ActivityList = successResult;
      }, (errorMessage) =>{
          // Notification.error(errorMessage);
      });
  }

  syncLeadWithDP360() {
    this._sfApi.syncLeadWithDP360()
    .subscribe((successResult:any) => {
        // Notification.success('Synched successfully');
      }, (errorMessage)=> {
          // Notification.error(errorMessage);
      });
  }
  
  MoveToState(stateName, attr) {
      if (attr != undefined && attr != null && attr != '') {
          // loadState($state, stateName, attr);
      } else {
          // loadState($state, stateName);
      }
  }

  widgetPermisssions(BlockName, PermissionLabel) {
      var PermissionVal = this.WidgetPermissionMap1[BlockName][PermissionLabel];
      if (PermissionVal.length == 0) {
          return true;
      } else {
          var defaultPermission = false;
          for (var i = 0; i < PermissionVal.length; i++) {
              // var PermissionValue = $rootScope.GroupOnlyPermissions[PermissionVal[i]]['view'];
              defaultPermission = defaultPermission ;
          }
          return defaultPermission;
      }
  }

  MoveToSourceEntityState(sourceEntityName, sourceEntityId) {
      var stateParamJson = {
          Id: sourceEntityId
      };
      this.MoveToState(this.SourceEntityToPageNameMap[sourceEntityName], stateParamJson);
  }

  SourceEntityToPageNameMap = {
      'Customer Order': true ? 'CustomerOrder_V2' : 'CustomerOrder',
      'Customer Invoice': true ? 'CustomerOrder_V2' : 'CustomerOrder',
      'Vendor Order': 'VendorOrder',
      'Vendor Receiving': 'VendorOrderReceiving',
      'Vendor Invoicing': 'VendorOrderInvoicing',
      'Customer': 'ViewCustomer',
      'Vendor': 'ViewVendor',
      'Price File': 'ViewVendor'
  };


  

}
