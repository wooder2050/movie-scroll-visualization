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
  const xScale = d3.scaleUtc()
    .domain(d3.extent(dates))
    .range([margin.left, width - margin.right]);


  // 1. y 척도 구현하기
  //  - 선형척도를 사용
  //  - domain : data의 value 최소최대
  //  - range : [height - margin.bottom, margin.top]
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([height - margin.bottom, margin.top]);


  // 2. x 축 구현하기
  //  - 아래(Bottom)에 위치
  //  - xScale (x척도)
  const xAxis = d3.axisBottom(xScale);


  // 2. y 축 구현하기
  //  - 왼쪽(Left)에 위치
  //  - yScale (y척도)
  const yAxis =d3.axisLeft(yScale);


  svg.append('g')
    .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
    .call(xAxis);

  svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',0)')
    .call(yAxis);


  // 3. 라인 차트 그리기
  //  1) d3.line과 x, y메소드 구현
  //    - x {key}는 'date'
  //    - y {key}는 'value'
  const line =


  //  2) svg에 path 요소와 속성 추가
  //   (svg는 d3.select(’svg’)로 위에서 먼저 할당된 변수입니다.)
  //    - path 요소 추가
  //    - data binding : data 변수
  //    - d 속성 : line 변수
  //    - fill 속성 : 'none'
  //    - stroke 속성 : d3.schemeTableau10[0]
  svg.append(


}

makeChart();
