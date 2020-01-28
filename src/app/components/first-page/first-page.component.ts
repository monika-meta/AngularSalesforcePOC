import { Component, OnInit } from '@angular/core';
import { SalesforceApiService } from '../../sf-api-service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {
accounts:any = [];
  constructor(private _sfApi: SalesforceApiService) {
  }

  ngOnInit() {
    this._sfApi.getAccount()
    .subscribe((account) => {
      console.log("account", account);
      this.accounts = account;
    })
  }

}
