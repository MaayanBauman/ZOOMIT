import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CategoryWithEventsCount } from '../../../../models/category';
import * as d3 from 'd3';

@Component({
  selector: 'bar-chart',
  templateUrl: './barChart.component.html'
})

export class BarChartComponent implements OnChanges {
  @Input() categories: CategoryWithEventsCount[];

  private svg: any;
  private margin: number;
  private width: number;
  private height: number;

  constructor() {
    this.categories = [];
    this.margin = 100;
    this.width = 750 - (this.margin * 2);
    this.height = 400 - (this.margin * 2);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.categories && this.categories.length) {
      this.createSvg();
      this.drawBars(this.categories.filter(category => category.events !== undefined));
    }
  }

  private createSvg(): void {
    this.svg = d3.select("#barChart")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr('viewBox',`0 0 ${ this.width + (this.margin * 2)} ${this.height + (this.margin * 2)}`)
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Add X axis
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.name))
    .padding(0.2);

    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-15,0)rotate(0)")
    .style("text-anchor", "end")
    .style("font-family", "Assistant")
    .style("font-weight", "700");

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, Math.max(...data.map(d => d.events))])
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
    .attr("x", (d: any) => x(d.name))
    .attr("y", (d: any) => y(d.events))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => this.height - y(d.events))
    .attr("fill", "#F26D21");
  }
}
