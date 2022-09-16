export function scroller(visFuncList) {
  const sections = d3.selectAll(".step");
  const containerStart = 0;
  let currentIndex = -1;
  let sectionPositions = [];

  function execute() {
    // 3. 브라우저 크기가 변경되거나, 스크롤 할 때마다 감지하기
    // [start]
    d3.select(window)
      .on("scroll.scroller", showCurrentVis)
      .on("resize.scroller", setSectionPositions);
    // [end]

    setSectionPositions();

    const timer = d3.timer(function () {
      showCurrentVis();
      timer.stop();
    });
  }

  function setSectionPositions() {
    let startPos;
    sectionPositions = [];

    // 1. .step 위치 파악하기
    // [start]
    d3.selectAll(".step").each(function (d, i) {
      const top = this.getBoundingClientRect().top;

      if (i === 0) {
        startPos = top;
      }
      sectionPositions.push(top - startPos);
    });
    // [end]
  }

  function showCurrentVis() {
    const pos = window.pageYOffset - 300 - containerStart;

    // 2. 현재 위치 알아내기
    // [start]
    let sectionIndex = d3.bisect(sectionPositions, pos);
    sectionIndex = Math.min(d3.selectAll(".step").size() - 1, sectionIndex);
    // [end]

    if (currentIndex !== sectionIndex) {
      activate(sectionIndex);
      currentIndex = sectionIndex;
    }
  }

  function activate(index) {
    d3.selectAll(".step")
      .transition()
      .duration(500)
      .style("opacity", function (d, i) {
        return i === index ? 1 : 0.1;
      });

    visFuncList[index]();
  }

  return execute;
}
