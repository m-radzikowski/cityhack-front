import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  static BASE_URL = 'http://192.168.48.36/';

  constructor(private http: HttpClient) {
  }
}
