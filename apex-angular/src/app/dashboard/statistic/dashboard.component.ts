import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist/dist/chartist.component";
import { barChartSingle, barChartmulti, pieChartSingle, pieChartmulti, lineChartSingle, lineChartMulti, areaChartSingle, areaChartMulti } from '../../shared/data/ngxChart';
import * as chartsData from '../../shared/configs/ngx-charts.config';
import * as tableData from '../../shared/data/smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { DashboardService } from './dashboard.service';
import { saveAs } from 'file-saver/FileSaver';
const now = new Date();
declare var require: any;

const data: any = require('../../shared/data/chartist-Dashboard.json');

export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

    
    clientSource: any;
    clientsettings = {}
    
    qtyPersonneArrive: number;
    qtyPersonneFemme: number;
    qtyPersonneHomme: number;
    qtyResrv: number;
    
    DashboardBar= { "labels": ["","","","",""],"series": [[ 0, 0, 0, 0, 0]]};
    qtyTotalResrv: number;
    qtyResrvWaiting: number;
    qtyResrvConfirmed: number;
    qtyResrvCanceled: number;
    qtyResrvArrive: number;
    
    ChartPerStatus = "Aujourd'hui";
    ChartPerGenre = "Aujourd'hui";
    
    pieChartData : any;
   
    ngOnInit() {}
    
    constructor(private dashboardService: DashboardService) {
       
        this.dashboardService.getTotalChart().subscribe(data => {
             console.dir(data);
             this.qtyPersonneArrive = data.qtyPersonneArrive;
             this.qtyPersonneFemme = data.qtyPersonneFemme;
             this.qtyPersonneHomme = data.qtyPersonneHomme;
             this.qtyResrv = data.qtyResrv;
        });
    
        this.getTotalChartPerStatusToday();
        this.getTotalChartPerGenreToday();

        this.dashboardService.getAllReservationByClient().subscribe(data => {
             console.dir(data);
            this.clientSource =data;
            this.clientsettings = tableData.clientsettings;
        });
    }
    /**
     * START STATISTICS PAR STATUT
     */
     getTotalChartPerStatusToday(){
        this.ChartPerStatus="Aujourd'hui";
        this.dashboardService.getTotalChartPerStatusToday().subscribe(data => {
             console.dir(data);
            
            this.DashboardBar= {
                                "labels": ["","","","",""],
                                "series": [
                                  [
                                    data.qtyResrv,
                                    data.qtyResrvWaiting,
                                    data.qtyResrvConfirmed,
                                    data.qtyResrvCanceled,
                                    data.qtyResrvArrive
                                  ]
                                ]
                              }
            this.BarChart.data = this.DashboardBar;
            if(data.qtyResrv>0){
                this.BarChart.options.high = data.qtyResrv;
            }else this.BarChart.options.high =100;
    
            this.qtyTotalResrv = data.qtyResrv;
            this.qtyResrvWaiting = data.qtyResrvWaiting;
            this.qtyResrvConfirmed = data.qtyResrvConfirmed;
            this.qtyResrvCanceled = data.qtyResrvCanceled;
            this.qtyResrvArrive = data.qtyResrvArrive;
            
        });
    }

       // ************** THIS WEEK ******************//
    getTotalChartPerStatusWeek(){
       this.ChartPerStatus="Cette Semaine";
       this.dashboardService.getTotalChartPerStatusWeek().subscribe(data => {
             console.dir(data);
           this.DashboardBar= {
                                "labels": ["","","","",""],
                                "series": [
                                  [
                                    data.qtyResrv,
                                    data.qtyResrvWaiting,
                                    data.qtyResrvConfirmed,
                                    data.qtyResrvCanceled,
                                    data.qtyResrvArrive
                                  ]
                                ]
                              }
            this.BarChart.data = this.DashboardBar;
            if(data.qtyResrv>0){
                this.BarChart.options.high = data.qtyResrv;
            }else this.BarChart.options.high =100;
    
            this.qtyTotalResrv = data.qtyResrv;
            this.qtyResrvWaiting = data.qtyResrvWaiting;
            this.qtyResrvConfirmed = data.qtyResrvConfirmed;
            this.qtyResrvCanceled = data.qtyResrvCanceled;
            this.qtyResrvArrive = data.qtyResrvArrive;
        });
    }
        // ************** THIS MONTH ******************//
    getTotalChartPerStatusMonth(){
       this.ChartPerStatus="Ce mois";
       this.dashboardService.getTotalChartPerStatusMonth().subscribe(data => {
             console.dir(data);
           this.DashboardBar= {"labels": ["","","","",""],
                                "series": [
                                  [
                                    data.qtyResrv,
                                    data.qtyResrvWaiting,
                                    data.qtyResrvConfirmed,
                                    data.qtyResrvCanceled,
                                    data.qtyResrvArrive
                                  ]
                                ]
                              }
            this.BarChart.data = this.DashboardBar;
            if(data.qtyResrv>0){
                this.BarChart.options.high = data.qtyResrv;
            }else this.BarChart.options.high =100;
    
            this.qtyTotalResrv = data.qtyResrv;
            this.qtyResrvWaiting = data.qtyResrvWaiting;
            this.qtyResrvConfirmed = data.qtyResrvConfirmed;
            this.qtyResrvCanceled = data.qtyResrvCanceled;
            this.qtyResrvArrive = data.qtyResrvArrive;
        });
    }
        // ************** THIS YEAR ******************//
    getTotalChartPerStatusYear(){ 
        this.ChartPerStatus="Cette Ann\u00e9e";
       this.dashboardService.getTotalChartPerStatusYear().subscribe(data => {
             console.dir(data);
             this.DashboardBar= {
                                "labels": ["","","","",""],
                                "series": [
                                  [
                                    data.qtyResrv,
                                    data.qtyResrvWaiting,
                                    data.qtyResrvConfirmed,
                                    data.qtyResrvCanceled,
                                    data.qtyResrvArrive
                                  ]
                                ]
                              }
            this.BarChart.data = this.DashboardBar;
            if(data.qtyResrv>0){
                this.BarChart.options.high = data.qtyResrv;
            }else this.BarChart.options.high =100;
    
            this.qtyTotalResrv = data.qtyResrv;
            this.qtyResrvWaiting = data.qtyResrvWaiting;
            this.qtyResrvConfirmed = data.qtyResrvConfirmed;
            this.qtyResrvCanceled = data.qtyResrvCanceled;
            this.qtyResrvArrive = data.qtyResrvArrive;
        });         
    }   
            
    /**
     * START STATISTICS PAR GENRE
     */
    
    getTotalChartPerGenreToday(){
       this.ChartPerGenre="Aujourd'hui";
       this.dashboardService.getTotalChartPerGenreToday().subscribe(data => {
             console.dir(data);
             this.pieChartData = [
                      {
                        "name": "Homme",
                        "value": data.qtyPersonneHommeArrive
                      },
                      {
                        "name": "Femme",
                        "value": data.qtyPersonneFemmeArrive
                      }
                    ];
            this.pieChartSingle = this.pieChartData;
        });
    }
       
    
       // ************** THIS WEEK ******************//
    getTotalChartPerGenreWeek(){
       this.ChartPerGenre="Cette Semaine";
      this.dashboardService.getTotalChartPerGenreWeek().subscribe(data => {
             console.dir(data);
           this.pieChartData = [
                      {
                        "name": "Homme",
                        "value": data.qtyPersonneHommeArrive
                      },
                      {
                        "name": "Femme",
                        "value": data.qtyPersonneFemmeArrive
                      }
                    ];
            this.pieChartSingle = this.pieChartData;
        });
    }
        // ************** THIS MONTH ******************//
    getTotalChartPerGenreMonth(){
       this.ChartPerGenre="Ce mois";
      this.dashboardService.getTotalChartPerGenreMonth().subscribe(data => {
             console.dir(data);
           this.pieChartData = [
                      {
                        "name": "Homme",
                        "value": data.qtyPersonneHommeArrive
                      },
                      {
                        "name": "Femme",
                        "value": data.qtyPersonneFemmeArrive
                      }
                    ];
            this.pieChartSingle = this.pieChartData;
        });
    }
        // ************** THIS YEAR ******************//
    getTotalChartPerGenreYear(){ 
       this.ChartPerGenre="Cette Ann\u00e9e";
       this.dashboardService.getTotalChartPerGenreYear().subscribe(data => {
             console.dir(data);
           this.pieChartData = [
                      {
                        "name": "Homme",
                        "value": data.qtyPersonneHommeArrive
                      },
                      {
                        "name": "Femme",
                        "value": data.qtyPersonneFemmeArrive
                      }
                    ];
            this.pieChartSingle = this.pieChartData;
        });         
    } 
    Exporter(){
        this.dashboardService.ExporterClientCart().subscribe(data => {
            console.log(data);
            this.dashboardService.downloadDraftFile(data).subscribe (
            dataS => {
                saveAs(dataS, "Reservation List - " + now + ".xls");
            }
            );
        });
    }         
            
  // line chart configuration Starts
    WidgetlineChart: Chart = {
        type: 'Line', data: data['WidgetlineChart'],
        options: {
            axisX: {
                showGrid: true,
                showLabel: false,
                offset: 0,
            },
            axisY: {
                showGrid: false,
                low: 40,
                showLabel: false,
                offset: 0,
            },
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            fullWidth: true,
        },
    };

    //  Bar chart configuration Starts
    BarChart: Chart = {
        type: 'Bar', data: this.DashboardBar, options: {
            axisX: {
                showGrid: false,
            },
            axisY: {
                showGrid: false,
                showLabel: false,
                offset: 0
            },
            low: 0,
            high:this.qtyTotalResrv, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        },
        responsiveOptions: [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ],
        events: {
            created(data: any): void {
                var defs = data.svg.elem('defs');
                
                defs.elem('linearGradient', {
                    id: 'gradient4',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(200, 9, 121,1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(255, 106, 0, 1)'
                });
                defs.elem('linearGradient', {
                    id: 'gradient5',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(0, 75, 145,1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(120, 204, 55, 1)'
                });

                defs.elem('linearGradient', {
                    id: 'gradient6',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(132, 60, 247,1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(56, 184, 242, 1)'
                });
                defs.elem('linearGradient', {
                    id: 'gradient7',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(155, 60, 183,1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(255, 57, 111, 1)'
                });
                defs.elem('linearGradient', {
                    id: 'gradient8',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': '#ffffff'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(255, 106, 0, 1)'
                });

            },
            draw(data: any): void {
                var barHorizontalCenter, barVerticalCenter, label, value;
                if (data.type === 'bar') {

                    data.element.attr({
                        y1: 195,
                        x1: data.x1 + 0.001
                    });

                }
            }
        },

    };
    // Bar chart configuration Ends

  
    // Line chart configuration Ends
    
    //Pie Charts
    pieChartSingle = pieChartSingle;
    pieChartView: any[] = chartsData.pieChartView;

    // options
    pieChartShowLegend = chartsData.pieChartShowLegend;

    pieChartColorScheme = chartsData.pieChartColorScheme;

    // pie
    pieChartShowLabels = chartsData.pieChartShowLabels;
    pieChartExplodeSlices = chartsData.pieChartExplodeSlices;
    pieChartDoughnut = chartsData.pieChartDoughnut;
    pieChartGradient = chartsData.pieChartGradient;

    pieChart1ExplodeSlices = chartsData.pieChart1ExplodeSlices;
    pieChart1Doughnut = chartsData.pieChart1Doughnut;
    
    onSelect(event) {
       //your code here
    }
   
}
