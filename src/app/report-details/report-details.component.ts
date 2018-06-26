import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Report} from '../report-list/report';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from '../app.component';
import {Comment} from './comment';
import * as moment from 'moment';

@Component({
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})
export class ReportDetailsComponent implements OnInit {

  @ViewChild('up') up: ElementRef;
  @ViewChild('down') down: ElementRef;

  report: Report;
  comments: Comment[];

  private allComments: Comment[];
  private lastIndex: number;

  public chartData: Array<any> = [];

  public chartLabels: Array<any> = ['Negatywne', 'Pozytywne', 'Neutralne'];

  public chartColors: Array<any> = [{
    hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
    hoverBorderWidth: 0,
    backgroundColor: ['#dc3545', '#00c851', '#007bff'],
    hoverBackgroundColor: ['#c62f3e', '#00b448', '#006ee5']
  }];

  public days: Array<any> = [];
  public daysValues: Array<any> = [
    {data: [], label: 'Negatywne'},
    {data: [], label: 'Pozytywne'},
    {data: [], label: 'Neutralne'},
  ];
  public daysColors: Array<any> = [
    {
      backgroundColor: 'rgb(220, 53, 69, 0.2)',
      borderColor: 'rgb(220, 53, 69, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgb(220, 53, 69, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(220, 53, 69, 1)'
    },
    {
      backgroundColor: 'rgb(0, 200, 81, 0.2)',
      borderColor: 'rgb(0, 200, 81)',
      borderWidth: 2,
      pointBackgroundColor: 'rgb(0, 200, 81)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(0, 200, 81)'
    },
    {
      backgroundColor: 'rgb(0, 123, 255, 0.2)',
      borderColor: 'rgb(0, 123, 255)',
      borderWidth: 2,
      pointBackgroundColor: 'rgb(0, 123, 255)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(0, 123, 255)'
    }
  ];

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

          this.comments.sort((a, b) => {
            const aa = new Date(a.createdTime);
            const bb = new Date(b.createdTime);
            if (aa < bb) {
              return -1;
            } else if (aa > bb) {
              return 1;
            } else {
              return 0;
            }
          }).forEach(comment => {
            const date = new Date(comment.createdTime);

            const label = moment(date).format('DD MMM');

            let idx = this.days.indexOf(label);
            if (idx === -1) {
              idx = this.days.push(label) - 1;
              this.daysValues[0].data[idx] = 0;
              this.daysValues[1].data[idx] = 0;
              this.daysValues[2].data[idx] = 0;
            }

            let valIdx = 0;
            if (comment.value === 'POSITIVE') {
              valIdx = 1;
            } else if (comment.value === 'NEGATIVE') {
              valIdx = 0;
            } else {
              valIdx = 2;
            }

            this.daysValues[valIdx].data[idx] = this.daysValues[valIdx].data[idx] + 1;
          });

          console.log(this.days);
          console.log(this.daysValues);
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


  sort(up: boolean) {
    if (up) {
      this.up.nativeElement.style.fontWeight = 'bold';
      this.up.nativeElement.style.color = 'blue';
      this.down.nativeElement.style.fontWeight = 'normal';
      this.down.nativeElement.style.color = '#6c757d';
    } else {
      this.down.nativeElement.style.fontWeight = 'bold';
      this.down.nativeElement.style.color = 'blue';
      this.up.nativeElement.style.fontWeight = 'normal';
      this.up.nativeElement.style.color = '#6c757d';
    }
    this.comments = this.comments.sort((a: Comment, b: Comment) => {
      return up ? b.likeCount - a.likeCount : a.likeCount - b.likeCount;
    });
  }
}
