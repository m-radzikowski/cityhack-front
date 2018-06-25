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

  private allComments: Comment[];
  private lastIndex: number;

  public chartType = 'doughnut';

  public chartData: Array<any> = [];

  public chartLabels: Array<any> = ['Negatywne', 'Pozytywne', 'Neutralne'];

  public chartColors: Array<any> = [{
    hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
    hoverBorderWidth: 0,
    backgroundColor: ['#dc3545', '#00c851', '#007bff'],
    hoverBackgroundColor: ['#c62f3e', '#00b448', '#006ee5']
  }];

  public chartOptions: any = {
    responsive: true
  };

  private reportUrl = AppComponent.BASE_URL + 'raports/';
  private commentUrl = AppComponent.BASE_URL + 'comments/';

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
          this.allComments = comments;
          let positive = 0, negative = 0, neutral = 0;
          this.comments.forEach((comment: Comment) => {
            if (comment.value === 'POSITIVE') {
              positive++;
            } else if (comment.value === 'NEGATIVE') {
              negative++;
            } else {
              neutral++;
            }
          });
          this.chartData.push(negative, positive, neutral);
        });
      }
    });
  }


  public chartClicked(e: any): void {
    const chartIndex = e.active[0]._index;

    this.comments = this.allComments;

    if (this.lastIndex === chartIndex) {
      return;
    }

    this.lastIndex = chartIndex;

    switch (chartIndex) {
      case 0: // NEGATIVE
        this.comments = this.comments.filter((comment: Comment) => {
          return comment.value === 'NEGATIVE';
        });
        break;
      case 1: // POSITIVE
        this.comments = this.comments.filter((comment: Comment) => {
          return comment.value === 'POSITIVE';
        });
        break;
      case 2: // NEUTRAL https://www.facebook.com/gdansk/posts/10160557809635424
        this.comments = this.comments.filter((comment: Comment) => {
          return comment.value === 'NEUTRAL';
        });
        break;
    }
  }

  public chartHovered(e: any): void {
  }

}
