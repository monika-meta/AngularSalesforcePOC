import { SalesforceHashLocationStrategy } from './util/sf-path-location-strategy';
import { LocationStrategy } from '@angular/common';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { StaticPathPipe } from './pipes/static-path.pipe';
import { SalesforceApiService } from './sf-api-service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { OtherPageComponent } from './components/other-page/other-page.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HederPageComponent } from './components/heder-page/heder-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptor';
@NgModule({
  declarations: [
    AppComponent,
    StaticPathPipe,
    FirstPageComponent,
    OtherPageComponent,
    HomePageComponent,
    HederPageComponent 
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: "**", component: HomePageComponent}
    ])
  ],
  providers: [
    SalesforceApiService,
    {
      provide: LocationStrategy,
      useClass: SalesforceHashLocationStrategy
    },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
