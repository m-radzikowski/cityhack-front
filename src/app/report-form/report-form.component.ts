import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Report} from '../report-list/report';
import {AppComponent} from '../app.component';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';

@Component({
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {

  report: Report = new Report(0, '', '');

  private url = AppComponent.BASE_URL + 'raports/';

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private location: Location,
              private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('id')) {
        this.http.get(this.url + params.get('id')).subscribe((report: Report) => {
          this.report = report;
        });
        this.http.get(this.url + 'generate/' + params.get('id'));
      }
    });
  }

  save() {
    this.http.post(this.url, this.report).subscribe((value) => {
      this.router.navigate(['/']);
    });
  }

  cancel() {
    this.location.back();
  }

}
