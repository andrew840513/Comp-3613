import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AjaxService {
  private dataUrl;
  private body;

  constructor(private http: Http) {
  }

  setData(dataUrl) {
    this.dataUrl = dataUrl;
  }

  setBody(body) {
    this.body = body;
  }

  getData(): Observable<string[]> {
    return this.http.get(this.dataUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  postData(): Observable<string[]> {
    return this.http.post(this.dataUrl, this.body)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
