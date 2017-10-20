import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AjaxService} from './app.ajaxservice';
import {Router} from '@angular/router';
import {Employee, provinces} from './app.data-model';

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
  provinces = provinces;

  data;
  message;
  errorMessage;

  employee;

  constructor(private ajaxService: AjaxService, private router: Router) {
    this._ajaxService = ajaxService;
    this._ajaxService.setData(this.url);
    this.employee = new Employee();
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
