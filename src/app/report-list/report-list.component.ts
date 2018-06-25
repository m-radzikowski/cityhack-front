import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from '../app.component';
import {Report} from './report';
import {Router} from '@angular/router';

@Component({
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  private url = AppComponent.BASE_URL + 'raports/';

  reports: Report[] = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.http.get(this.url).subscribe((result: Report[]) => {
      this.reports = result;
    });
  }

  form(report?: Report) {
    const commands = ['/form'];
    if (!!report) {
      commands.push('' + report.id);
    }
    this.router.navigate(commands);
  }

  remove(id: number) {
    this.http.delete(this.url + id).subscribe(() => {
    });
  }

  details(report: Report) {
    this.router.navigate(['/details', report.id]);
  }

}
