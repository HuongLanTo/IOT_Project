import { Component, OnInit } from '@angular/core';
import { SensorData, sensorData } from '../../data/sensor_data';
import { AqiInfo, aqiInfo } from '../../data/aqi';
import * as _ from 'lodash';
import Chart from 'chart.js';
import Moment from 'moment';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { ThreeDay, threeDay } from 'src/app/data/three_day';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sensor_data: SensorData[] = sensorData;
  current_sensor_data:SensorData = this.sensor_data[0];
  aqi_info: AqiInfo[] = aqiInfo;
  current_aqi_info: AqiInfo;
  three_day_aqi_data: ThreeDay[];
  g = '1592490877';

  public sensorChart: any;
  public datasets: any;
  public data: any;
  public Chart: any;
  
  constructor(
    
  ) { }

  ngOnInit() {
    
    this.setCurrentAqiInfo(this.current_sensor_data.aqi);
    this.get3DayAqiData();
    parseOptions(Chart, chartOptions());
    var noChart = document.getElementById('no_chart');
    var co2Chart = document.getElementById('co2_chart');
    var pm25Chart = document.getElementById('pm25_chart');
    var aqiLineChart = document.getElementById('aqi_line_chart');
    var aqiBarChart = document.getElementById('aqi_bar_chart');
    var no_data = [];
    var co2_data = [];
    var pm25_data = [];
    var t = [];

    for (var i = 0; i < this.sensor_data.length; i++) {
      no_data.push(this.sensor_data[i].no);
      co2_data.push(this.sensor_data[i].co2);
      pm25_data.push(this.sensor_data[i].pm25);
      t.push(Moment(this.sensor_data[i].time * 1000).format('DD/MM/YYYY HH:mm'));
    }
    // var r = Object.assign({}, chartExample1);
    var no_chart = new Chart(noChart, {
			type: 'line',
			options: {
        maintainAspectRatio: false,
        scales:{
          yAxes: [{
            scaleLabel: {
              labelString: "NO",
              display: true
            }
          }]
        }
      },
      data: {
        labels: t,
        datasets: [{
          label: 'NO',
          data: no_data
        }]
      },
    });
    
    
    var co2_chart = new Chart(co2Chart, {
			type: 'line',
			options: {
        scales:{
          yAxes: [{
            scaleLabel: {
              labelString: "CO2",
              display: true
            }
          }]
        }
      },
      data: {
        labels: t,
        datasets: [{
          label: 'CO2',
          data: co2_data
        }]
      },
    });
    
    var pm25_chart = new Chart(pm25Chart, {
			type: 'line',
			options: {
        scales:{
          yAxes: [{
            scaleLabel: {
              labelString: "Bụi PM2.5",
              display: true
            }
          }]
        }
      },
      data: {
        labels: t,
        datasets: [{
          label: 'Bụi PM2.5',
          data: pm25_data
        }]
      },
    });

    var aqi_line_chart = new Chart(aqiLineChart, {
			type: 'line',
			options: {
        maintainAspectRatio: false,
        scales:{
          yAxes: [{
            scaleLabel: {
              labelString: "NO",
              display: true
            }
          }]
        }
      },
      data: {
        labels: t,
        datasets: [{
          label: 'NO',
          data: no_data
        }]
      },
    });

    var aqi_bar_chart = new Chart(aqiBarChart, {
			type: 'bar',
			options: {
        maintainAspectRatio: false,
        scales:{
          yAxes: [{
            scaleLabel: {
              labelString: "NO",
              display: true
            }
          }]
        }
      },
      data: {
        labels: t,
        datasets: [{
          label: 'NO',
          data: no_data
        }]
      },
    });

    // var aaqiBarChart = Object.assign('aqi_bar_chartsaa', chartExample2);
    // aaqiBarChart.data.labels = t;
    // aaqiBarChart.data.datasets[0].data = no_data;
    // aaqiBarChart.data.datasets[0].label = 'NO';
  }

  selectedNode(nameNode){
    for ( var i = 0; i < this.sensor_data.length; i++) {
      if (nameNode == this.sensor_data[i].nameNode) {
        this.current_sensor_data = this.sensor_data[i];
      }
    }

    var temp = this.current_sensor_data.aqi;
    this.setCurrentAqiInfo(temp);
  }

  setCurrentAqiInfo(temp) {
    if (temp >= 0 && temp <= 50) {
      this.current_aqi_info = this.aqi_info[0];
    } else if (temp >= 51 && temp <= 100) {
      this.current_aqi_info = this.aqi_info[1];
    } else if (temp >= 101 && temp <= 150) {
      this.current_aqi_info = this.aqi_info[2];
    } else if (temp >= 151 && temp <= 200) {
      this.current_aqi_info = this.aqi_info[3];
    } else if (temp >= 201 && temp <= 300) {
      this.current_aqi_info = this.aqi_info[4];
    } else if (temp >= 301) {
      this.current_aqi_info = this.aqi_info[5];
    }
  }

  updateData(chart: Chart, data: string[], t: string[]) {
    chart.data.datasets[0].data = data;
    chart.data.labels = t,
    chart.options.scales.yAxes[0].scaleLabel.labelString = "NO",
    chart.update();
  }

  get3DayAqiData() {
    this.three_day_aqi_data = [];
    threeDay.forEach(e => {
      if (e.nameNode == this.current_sensor_data.nameNode) {
        this.three_day_aqi_data.push(e);
      }
    })
  }

}
