export async function getMovieData(year) {
  const dateSet = new Set();
  const csv = await d3.csv(`./data/movie${year}.csv`);
  const data = csv.map(d => {
    dateSet.add(new Date(d.date));
    d.date = new Date(d.date);
    d.value = parseInt(d.value);
    d.key = parseInt(d.key);
    return d;
  }).sort((a, b) => a.date - b.date);

  return {
    dates: Array.from(dateSet).sort(),
    data
  }
}
