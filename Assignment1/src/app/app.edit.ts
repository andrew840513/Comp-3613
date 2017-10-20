import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AjaxService} from './app.ajaxservice';
import {ActivatedRoute, Router} from '@angular/router';
import {Employee, provinces} from './app.data-model';

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

  title = 'Edit employee file';
  decline = 'cancel';
  provinces = provinces;

  employee: Employee;

  message;
  errorMessage;
  body;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, ajaxService: AjaxService) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
    this.url += this.id;
    this.employee = new Employee();
    this._ajaxService = ajaxService;
    this._ajaxService.setData(this.url);
    this.getData();
  }

  getData() {
    this._ajaxService.getData().subscribe(
      data => {
        this.data = data;
        this.employee.firstName = this.data.firstName;
        this.employee.lastName = this.data.lastName;
        this.employee.phoneNumber = this.data.phoneNumber;
        this.employee.email = this.data.email;
        this.employee.address = this.data.address;
        this.employee.city = this.data.city;
        this.employee.province = this.data.province;
        this.employee.zip = this.data.zip;
      },
      error => {
      },
      () => {
      });
  }

  createUser(form: NgForm) {
    this.body = form.value;
    this.body.employeeID = this.id;
    this._ajaxService.setBody(this.body);
    this.sendData();
  }

  sendData(){
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
