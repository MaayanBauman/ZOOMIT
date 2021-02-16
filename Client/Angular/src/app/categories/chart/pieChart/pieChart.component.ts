import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CategoryWithEventsCount } from '../../../../models/category';
import * as d3 from 'd3';

// Adopted from Basic pie chart example on D3 Graph Gallery:
// https://www.d3-graph-gallery.com/graph/pie_basic.html
@Component({
  selector: 'pie-chart',
  templateUrl: './pieChart.component.html'
})
export class PieChartComponent implements OnChanges {
  @Input() categories: CategoryWithEventsCount[];
  private svg: any;
  private margin: number;
  private width: number;
  private height: number;
  private radius: number;
  private colors: any;

  constructor() {
    this.categories = [];
    this.margin = 100;
    this.width = 750;
    this.height = 600;
    this.radius =  Math.min(this.width, this.height) / 2 - this.margin;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.categories && this.categories.length) {
      this.createSvg();
      this.createColors(this.categories.filter(category => category.prices !== undefined));
      this.drawChart(this.categories.filter(category => category.prices !== undefined));
    }
  }

  private createSvg(): void {
    this.svg = d3.select("#pieChart")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr('viewBox',`0 0 ${ this.width + (this.margin * 2)} ${this.height + (this.margin * 2)}`)
    .append("g")
    .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
  }

  private createColors(data: any): void {
    this.colors = d3.scaleOrdinal()
    .domain(data.map((d: any) => d.prices.toString()))
    .range(["#fbd3bc", "#f69964", "#f26d21", "#ee5a18", "#e83e0b"]);
  }

  private drawChart(data: any): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.prices));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: any) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(pie(data))
    .enter()
    .append('text')
    .text((d: any) => d.data.name)
    .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 14)
    .attr("font-weight", "bold");
  }
}
