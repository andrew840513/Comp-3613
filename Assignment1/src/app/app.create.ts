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
  provinces: string[] = provinces;

  data;
  message;
  errorMessage;
  error;
  employee: Employee;

  checked: Boolean = false;
  checkInput: Boolean;
  invalid;

  constructor(private ajaxService: AjaxService, private router: Router) {
    this._ajaxService = ajaxService;
    this._ajaxService.setData(this.url);
    this.employee = new Employee();
  }

  createUser(form: NgForm) {
    this.checked = true;
    this.checkInput = true;
    this.invalid = [];
    if (!this.regex(form.value.phoneNumber.trim(), /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)) {
      this.invalid.push({'error': 'please enter correct phone number'});
    }
    if (!this.regex(form.value.email.trim(), /^(([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/)) {
      this.invalid.push({'error': 'please enter correct email address'});
    }

    if (!this.regex(form.value.address.trim(), /\d{1,3}.?\d{0,3}\s[a-zA-Z]{2,30}\s[a-zA-Z]{2,15}/)) {
      this.invalid.push({'error': 'please enter correct address'});
    }

    if (!this.regex(form.value.city.trim(), /^[a-zA-Z]{2}[a-zA-Z]+$/)) {
      this.invalid.push({'error': 'please enter correct city name'});
    }

    if (!this.regex(form.value.province.trim(), /^[a-zA-Z]{2}$/)) {
      this.invalid.push({'error': 'please enter correct province'});
    }

    if (!this.regex(form.value.zip.trim(), /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)) {
      this.invalid.push({'error': 'please enter correct zip code'});
    }

    if (form.valid && this.checkInput) {
      this.body = form.value;
      this._ajaxService.setBody(this.body);
      this.sendData();
    }
  }

  sendData() {
    this._ajaxService.postData().subscribe(
      data => {
        this.data = data;
        this.message = this.data.message;
        this.error = this.data.error;
        if (this.error == null) {
          setTimeout((router: Router) => {
            this.router.navigateByUrl('/manage');
          }, 1500);
        }
      }, error => {
        this.errorMessage = 'Server error plese create again';
      },
      () => {
      }
    );
  }

  private regex(input, regex): boolean {
    const temp = new RegExp(regex);
    if (input.trim() === '') {
      this.checkInput = this.checkInput && true;
      return true;
    } else if (temp.test(input)) {
      this.checkInput = this.checkInput && true;
      return true;
    } else {
      this.checkInput = false;
      return false;
    }
  }
}
