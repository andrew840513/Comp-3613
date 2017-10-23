import {Component} from '@angular/core';
import {AjaxService} from './app.ajaxservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.manage.html',
  providers: [AjaxService]
})

export class AppManageComponent {
  _ajaxService: AjaxService;
  url = 'request?User=All';
  deleteUrl = 'request?delete=';

  data;
  message;
  ID;

  refreshText = 'No employee right now';

  constructor(ajaxService: AjaxService) {
    this._ajaxService = ajaxService;
    this._ajaxService.setData(this.url);
    this.getData();
  }

  changeText(ID: String) {
    this.ID = ID;
  }

  getData() {
    this._ajaxService.getData().subscribe(
      data => {
        this.data = data;
      },
      error => {
        this.refreshText = 'No employee right now';
      },
      () => {
        this.refreshText = 'No employee right now';
      });
  }

  getUser() {
    this.refreshText = 'Fetching the data';
    this._ajaxService.setData(this.url);
    this.getData();
  }

  deleteUser(ID) {
    const newUrl = this.deleteUrl + ID;
    this._ajaxService.setData(newUrl);
    this.deleteData();
  }

  deleteData() {
    this._ajaxService.getData().subscribe(
      data => {
        this.message = data;
        this.getUser();
      },
      error => {
      },
      () => {
      });
  }

}
