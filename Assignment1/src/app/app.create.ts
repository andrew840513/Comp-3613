import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AjaxService} from "./app.ajaxservice";

@Component({
  selector: 'app-root',
  templateUrl: './app.form.html',
  providers: [AjaxService]
})

export class AppCreateComponent {
  _ajaxService: AjaxService;
  url = 'request';
  body;

  title = 'Create new employee file';
  decline = 'cancel';
  provinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

  constructor(private ajaxService: AjaxService) {
    this._ajaxService = ajaxService;
    this._ajaxService.setData(this.url);
  }

  createUser(form: NgForm) {
    this.body = form.value;
    console.log(form.value);
    this._ajaxService.setBody(this.body);
    this.sendData();
  }

  sendData() {
    this._ajaxService.postData().subscribe(
      data => {
      },
      error => {

      },
      () => {
      }
    );
  }
}
