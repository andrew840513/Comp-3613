import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppHomeComponent} from './app.home';
import {AppManageComponent} from './app.manage';
import {AppCreateComponent} from "./app.create";
import {AppEditComponent} from './app.edit';
import {HttpModule} from '@angular/http';
import {routing} from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    AppHomeComponent,
    AppManageComponent,
    AppCreateComponent,
    AppEditComponent
  ],
  bootstrap: [AppComponent],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppModule {
}
