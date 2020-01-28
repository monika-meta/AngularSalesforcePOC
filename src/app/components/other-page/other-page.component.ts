import { Component, OnInit } from '@angular/core';
import { SalesforceApiService } from '../../sf-api-service';

@Component({
  selector: 'app-other-page',
  templateUrl: './other-page.component.html',
  styleUrls: ['./other-page.component.scss']
})
export class OtherPageComponent implements OnInit {

  contacts:any = [];
  constructor(private _sfApi: SalesforceApiService) {

    console.log("contactcontact  +++++++++++++++");

  }

  ngOnInit() {
    this._sfApi.getContact()
    .subscribe((contact) => {
      console.log("contactcontact  ", contact);
      this.contacts = contact;
    })
  }
}
