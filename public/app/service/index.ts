import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DemoService {
  baseUrl = 'http://jsonplaceholder.typicode.com';

  constructor(private http: Http) {}

  getByType(type = 'posts') {
    return this.http.get(`${this.baseUrl}/${type}`)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}