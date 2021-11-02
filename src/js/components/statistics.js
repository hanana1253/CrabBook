// import { Chart } from 'chart.js';
// import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

// const { Chart } = require('chart.js');

// DOM Nodes
const profilChart = document.querySelector('.profil__chart').getContext('2d');
const timeWeekChart = document
  .querySelector('.time__chart--week')
  .getContext('2d');
const jandi__chart = document.querySelector('.jandi__chart').getContext('2d');

// state, 링크 데이터(임시)
let state = [];

// Functions
const countLinksByCategory = () => state.map(({ items }) => items.length);

// TODO: generateColors
// 랜덤컬러? 사용자 지정?
const renderChart = (type, data) => new Chart(type, data);

const renderChartWithOptions = (type, data, options) =>
  new Chart(type, data, options);

// Sample Charts==========================
// Bar Charts Weekly
const labelsTimeChart = ['Mon', 'Tue', 'Wds', 'Thr', 'Fri', 'Sat', 'Sun'];
const dataTimeChart = {
  labels: labelsTimeChart,
  datasets: [
    {
      label: 'Weekly chart',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }
  ]
};
const configTimeChart = {
  type: 'bar',
  data: dataTimeChart,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

// Event
window.addEventListener('DOMContentLoaded', async () => {
  // SAMPLE CHARTS
  renderChart(timeWeekChart, configTimeChart);

  try {
    const { data: newState } = await axios.get('/store');
    state = newState;
    // TODO: 함수 빼기
    renderChart(profilChart, {
      type: 'doughnut',
      data: {
        labels: state.map(({ title }) => title),
        datasets: [
          {
            label: 'Scraps by category',
            data: countLinksByCategory(),
            backgroundColor: [
              // TODO: generateColors
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          }
        ]
      },
      options: {
        responsive: false,
        cutout: 110
      }
    });

    // renderChart(timeWeekChart, configTimeChart);
  } catch (e) {
    console.error(e);
  }
});
