import { Component } from '@angular/core';
// import { ApiService } from './service';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;

  constructor() {
    this.title = 'TEST';
  }
}
