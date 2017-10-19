import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AjaxService} from "./app.ajaxservice";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.form.html',
  providers: [AjaxService]
})

export class AppEditComponent {
  _ajaxService: AjaxService;
  id;
  data;
  url = 'request?User=';
  testUrl = 'http://localhost:8080/A00962243_Assignment1/request?User=';

  title = 'Edit employee file';
  decline = 'cancel';
  provinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

  // input field
  firstName;
  lastName;
  phoneNumber;
  email;
  address;
  city;
  province;
  zip;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, ajaxService:AjaxService) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
    this.testUrl += this.id;
    console.log(this.url);
    this._ajaxService = ajaxService;
    this._ajaxService.setData(this.url);
    this.getData();
  }

  getData() {
    this._ajaxService.getData().subscribe(
      data => {
        this.data = data;
        this.firstName = this.data.firstName;
        this.lastName = this.data.lastName;
        this.phoneNumber = this.data.phoneNumber;
        this.email = this.data.email;
        this.address = this.data.address;
        this.city = this.data.city;
        this.province = this.data.province;
        this.zip = this.data.zip;
      },
      error => {
      },
      () => {
      });
  }

  createUser(form: NgForm) {
    console.log(form.value);
  }
}
