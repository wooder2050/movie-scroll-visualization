import * as d3 from "d3";

export class LineChart {

  #margin;
  #width;
  #height;
  #maxValue;

  #chart;

  #xScale;
  #yScale;
  #xAxis;
  #xAxisGroup;
  #yAxis;
  #yAxisGroup;

  #line;
  #lineGroup;

  constructor(className, width, height, maxValue) {
    this.#margin = { top: 80, right: 30, bottom: 100, left: 80 };
    this.#width = width - this.#margin.left - this.#margin.right;
    this.#height = height - this.#margin.top - this.#margin.bottom;
    this.#maxValue = maxValue || 25000000;

    this.#init(className);
  }

  #init(className) {
    const svg = d3.select("#visbox").select("svg");

    this.#chart = svg.append("g")
      .attr('class', className)
      .attr('transform', `translate(${this.#margin.left},${this.#margin.top})`); 
    this.#xAxisGroup = this.#chart.append('g')
      .attr('transform', `translate(0,${this.#height - this.#margin.bottom})`)
      .style('font-size', 14);
    this.#yAxisGroup = this.#chart.append('g')
      .attr('transform', `translate(${this.#margin.left},0)`)
      .style('font-size', 14);
    this.#lineGroup = this.#chart.append('g').append('path');

    this.#xScale = d3.scaleUtc();
    this.#yScale = d3.scaleLinear();
    this.#xAxis = d3.axisBottom(this.#xScale);
    this.#yAxis = d3.axisLeft(this.#yScale);
    this.#line = d3.line()
  }

  #setXscale(dates) {
    this.#xScale
      .domain(d3.extent(dates))
      .range([this.#margin.left, this.#width - this.#margin.right]);
    return this;
  }

  #setYscale(data) {
    this.#yScale
      .domain([0, this.#maxValue || d3.max(data, d => d.value)])
      .range([this.#height - this.#margin.bottom, this.#margin.top]);
    return this;
  }

  #setXaxis() {
    this.#xAxisGroup.call(this.#xAxis);
    return this;
  }

  #setYaxis() {
    this.#yAxisGroup.call(this.#yAxis);
    return this;
  }

  #setLines(data) {
    // const t = d3.transition()
    //   .duration(250)
    //   .ease(d3.easeLinear)

    this.#line
      .x((d) => this.#xScale(d.date))
      .y((d) => this.#yScale(d.value));

    this.#lineGroup
      .data([data])
      .transition()
      .duration(250)
      .ease(d3.easeLinear)
      .attr("d", this.#line)
      .attr('fill', 'none')
      .style("stroke", d3.schemeTableau10[0])

    return this;
  }

  get chart() {
    return this.#chart;
  }

  show() {
    this.#chart.attr("opacity", 1);
  }

  unshow() {
    this.#chart.attr("opacity", 0);
  }

  drawChart(dates, data) {
    this.#setXscale(dates)
      .#setYscale(data)
      .#setXaxis()
      .#setYaxis()
      .#setLines(data)

    return this;
  }
}