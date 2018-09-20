import { Component, OnInit, Input, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlotChartModule } from '../shared/graphs/flot-chart/flot-chart.module';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const FakeDataSource = {
    data: [],
    total: 200,
    getRandomData() {
        if (this.data.length > 0) {
            this.data = this.data.slice(1);
        }

        // do a random walk
        while (this.data.length < this.total) {
            const prev = this.data.length > 0 ? this.data[this.data.length - 1] : 50;
            let y = prev + Math.random() * 10 - 5;
            if (y < 0) {
                y = 0;
            }
            if (y > 100) {
                y = 100;
            }
            this.data.push(y);
        }

        // zip the generated y values with the x values
        const res = [];
        for (let i = 0; i < this.data.length; ++i) {
            res.push([i, this.data[i]]);
        }
        return res;
    }
};

const SensorChartOptions = {
    yaxis: {
        min: 0,
        max: 100
    },
    xaxis: {
        min: 0,
        max: 100
    },
    colors: ['rgb(87, 136, 156)'],
    grid: {
        show: true,
        hoverable: true,
        clickable: true,
        borderWidth: 0
    },
    series: {
        lines: {
            lineWidth: 1,
            fill: true,
            fillColor: {
                colors: [
                    {
                        opacity: 0.4
                    },
                    {
                        opacity: 0
                    }
                ]
            },
            steps: false
        }
    }
};

@Component({
    selector: 'jhi-sensor-graph',
    templateUrl: './sensor-graph.component.html',
    styles: []
})
export class SensorGraphComponent implements OnInit, OnDestroy {
    public liveStats: Array<any>;
    private interval;
    sensorChartOptions = SensorChartOptions;

    constructor(private route: ActivatedRoute, private http: HttpClient) {}

    ngOnInit() {
        this.loadStats();
        this.interval = setInterval(() => {
            this.loadStats();
        }, 1000);
    }

    loadStats() {
        this.liveStats = [FakeDataSource.getRandomData()];
    }

    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}
