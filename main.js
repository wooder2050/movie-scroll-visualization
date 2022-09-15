import * as d3 from "d3";

async function getData() {
  const dateSet = new Set();
  const csv = await d3.csv(`./data/movie2019.csv`);
  const data = csv.map(d => {
    const date = new Date(d.date);
    dateSet.add(date);
    d.date = date;
    d.value = parseInt(d.value);
    return d;
  }).sort((a, b) => a.date - b.date);
  const dates = Array.from(dateSet).sort();

  return {data, dates}
}

async function makeChart() {
  const width = 1000; 
  const height = 1000;
  const margin = { top: 80, right: 30, bottom: 100, left: 80 };

  const { data, dates } = await getData();

  const body = d3.select("body");
  const svg = body.append("svg")
      .attr("width", width)
      .attr("height", height);

  // x 척도
  const xScale = d3.scaleUtc()
    .domain(d3.extent(dates))
    .range([margin.left, width - margin.right]);

  // y 척도
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([height - margin.bottom, margin.top]);

  // x 축 
  const xAxis = d3.axisBottom(xScale);

  // y 축 
  const yAxis = d3.axisLeft(yScale);

  svg.append('g')
    .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
    .call(xAxis);

  svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',0)')
    .call(yAxis);

  // 선 그리기
  const line = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.value));

  svg.append('path')
    .data([data])
    .attr('d', line)
    .attr('fill', 'none')
    .style("stroke", d3.schemeTableau10[0]);

}

makeChart();