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

  // 아래 코드를 완성해보세요

  // 1. x 척도 구현하기
  //  - 시간척도(UTC)를 사용
  //  - domain : dates 날짜 최소최대
  //  - range : [margin.left, width - margin.right] 
  const xScale =


  // 1. y 척도 구현하기
  //  - 선형척도를 사용
  //  - domain : data의 value 최소최대
  //  - range : [height - margin.bottom, margin.top] 
  const yScale =


}

makeChart();