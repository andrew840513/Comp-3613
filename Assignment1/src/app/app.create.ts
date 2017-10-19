import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AjaxService} from "./app.ajaxservice";
import {Router} from "@angular/router";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-root',
  templateUrl: './app.form.html',
  providers: [AjaxService]
})

export class AppCreateComponent {
  _ajaxService: AjaxService;
  url = 'request';
  testurl = 'http://localhost:8080/A00962243_Assignment1/request';
  body;

  title = 'Create new employee file';
  decline = 'cancel';
  provinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

  data;
  message;
  errorMessage;

  // input field
  firstName;
  lastName;
  phoneNumber;
  email;
  address;
  city;
  province;
  zip;
  constructor(private ajaxService: AjaxService, private router: Router) {
    this._ajaxService = ajaxService;
    this._ajaxService.setData(this.url);
    this.firstName = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.email = '';
    this.address = '';
    this.city = '';
    this.province = '';
    this.zip = '';
  }

  createUser(form: NgForm) {
    this.body = form.value;
    console.log(JSON.stringify(form.value));
    this._ajaxService.setBody(this.body);
    this.sendData();
  }

  sendData() {
    this._ajaxService.postData().subscribe(
      data => {
        this.data = data;
        this.message = this.data.message;
        setTimeout((router: Router) => {
          this.router.navigateByUrl('/manage');
        }, 1500);
      }, error => {
        this.errorMessage = 'Server error plese create again';
      },
      () => {
      }
    );
  }
}
