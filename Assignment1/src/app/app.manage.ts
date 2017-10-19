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
  testUrl = 'http://localhost:8080/A00962243_Assignment1/request?User=All';
  data;
  message;

  constructor(ajaxService: AjaxService) {
    this._ajaxService = ajaxService;
    this._ajaxService.setData(this.url);
    this.getData();
  }

  getData() {
    this._ajaxService.getData().subscribe(
      data => {
        this.data = data;
        console.log(data);
      },
      error => {
      },
      () => {
      });
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
        console.log(data);
      },
      error => {
      },
      () => {
      });
  }
}
