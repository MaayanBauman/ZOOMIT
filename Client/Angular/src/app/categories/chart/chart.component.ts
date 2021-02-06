import { Component, AfterViewInit } from '@angular/core';
import { CategoryChart } from '../../../models/category';
import * as d3 from 'd3';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements AfterViewInit {
  private svg: any;
  private margin: number;
  private width: number
  private height: number
  private maxIndex: number;

  constructor() {
    this.margin = 100;
    this.width = 750 - (this.margin * 2);
    this.height = 400 - (this.margin * 2);
    this.maxIndex = 15;
  }

  ngAfterViewInit(): void {
    this.createSvg();
    d3.json('http://localhost:8080/events/categories/count').then((data: any) => this.drawBars(data));
  }

  private createSvg(): void {
    this.svg = d3.select("#chart")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr('viewBox',`0 0 ${ this.width + (this.margin * 2)} ${this.height + (this.margin * 2)}`)
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: CategoryChart[]): void {
    // Add X axis
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d._id))
    .padding(0.2);

    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-15,0)rotate(0)")
    .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, Math.max(...data.map(d => d.count))])
    .range([this.height, 0]);

    this.svg.append("g")
    .call(d3.axisLeft(y))
    .selectAll("text")
    .attr("transform", "translate(-15,0)rotate(0)") ;

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: CategoryChart) => x(d._id))
    .attr("y", (d: CategoryChart) => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", (d: CategoryChart) => this.height - y(d.count))
    .attr("fill", "#F26D21");
  }
}
