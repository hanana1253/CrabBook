// const timeWeekChart = document
//   .querySelector('.time__chart--week')
//   .getContext('2d');
// const jandiChart = document.querySelector('.jandi__chart').getContext('2d');

// TODO: statistics 부분은 render.js에 합칠 예정
export default (chartDatas, links) => {
  chartDatas.forEach(({ canvas, data }) => new Chart(canvas, data));
};
