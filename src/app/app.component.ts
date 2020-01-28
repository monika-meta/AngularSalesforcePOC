import { SalesforceApiService } from './sf-api-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _sfApi: SalesforceApiService) {

  }

  title = 'Angular 4 with Salesforce';

  ngOnInit() {
  }

}
