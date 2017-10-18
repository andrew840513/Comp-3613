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
  testUrl = 'assets/test.json';
  data;
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
}
