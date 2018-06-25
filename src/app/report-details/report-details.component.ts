import {Component, OnInit} from '@angular/core';
import {Report} from '../report-list/report';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from '../app.component';
import {Comment} from './comment';

@Component({
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})
export class ReportDetailsComponent implements OnInit {

  report: Report;
  comments: Comment[];

  public chartType = 'doughnut';

  public chartData: Array<any> = [300, 50, 100, 40, 120];

  public chartLabels: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];

  public chartColors: Array<any> = [{
    hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
    hoverBorderWidth: 0,
    backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
    hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774']
  }];

  public chartOptions: any = {
    responsive: true
  };

  private reportUrl = AppComponent.BASE_URL + 'raports';
  private commentUrl = AppComponent.BASE_URL + 'comments';

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('id')) {
        this.http.get(this.reportUrl + params.get('id')).subscribe((report: Report) => {
          this.report = report;
        });
        this.http.get(this.commentUrl + params.get('id')).subscribe((comments: Comment[]) => {
          this.comments = comments;
        });
      }
    });
  }


  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

}
