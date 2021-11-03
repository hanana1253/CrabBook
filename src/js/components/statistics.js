// import Chart from '../../../node_modules/chart.js';
// import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
// import mock from '../store/mock.js';
import render from '../view/render.js';
import state from '../store/state.js';
import { createDropZone, createCategory, createLinkCard } from './Kanban.js';
// const Chart = require('chart.js');
// const { Chart } = require('chart.js');

// DOM Nodes
const profilChart = document.querySelector('.profil__chart').getContext('2d');
const timeWeekChart = document
  .querySelector('.time__chart--week')
  .getContext('2d');
const jandiChart = document.querySelector('.jandi__chart').getContext('2d');

// Functions
const countLinksByCategory = () =>
  state.categories.map(({ items }) => items.length);

// TODO: generateColors

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

// Jandi Chart
const isoDayOfWeek = date => {
  let weekday = date.getDay(); // 0...6 sun~
  weekday = ((weekday + 6) % 7) + 1; // start from monday
  return weekday + ''; // String
};
// 365 네모 만들기
const generateData = () => {
  const today = new Date(new Date().toString().slice(0, 16));
  const data = [];
  const end = today;
  // 일 년 전부 터
  let dt = new Date(
    new Date(new Date(new Date().setDate(end.getDate() - 364)))
      .toString()
      .slice(0, 16)
  );
  let i = 0;
  const scraps = state.getDailyScrapsPerYear();
  const offset = new Date(dt).getTimezoneOffset() * 60000;
  while (dt <= end) {
    const iso = new Date(dt - offset).toISOString().substring(0, 10);
    data.push({
      x: iso,
      y: isoDayOfWeek(dt),
      d: iso,
      v: scraps[364 - i] // 얼마나 많은 횟수가 들어갔나
    });
    i += 1;
    // 다음날
    dt = new Date(
      new Date(new Date(dt.setDate(dt.getDate() + 1))).toString().slice(0, 16)
    );
  }

  return data;
};
const scalesJandi = {
  y: {
    type: 'time',
    offset: true,
    time: {
      unit: 'day',
      round: 'day',
      isoWeekday: 1,
      parser: 'i',
      displayFormats: {
        day: 'iiiiii'
      }
    },
    reverse: true,
    position: 'right',
    ticks: {
      maxRotation: 0,
      autoSkip: true,
      padding: 1,
      font: {
        size: 9
      }
    },
    grid: {
      display: false,
      drawBorder: false,
      tickLength: 0
    }
  },
  x: {
    type: 'time',
    position: 'bottom',
    offset: true,
    time: {
      unit: 'week',
      round: 'week',
      isoWeekday: 1,
      displayFormats: {
        week: 'MMM dd'
      }
    },
    ticks: {
      maxRotation: 0,
      autoSkip: true,
      font: {
        size: 9
      }
    },
    grid: {
      display: false,
      drawBorder: false,
      tickLength: 0
    }
  }
};

const createDataJandi = () => ({
  datasets: [
    {
      label: 'My Matrix',
      data: generateData(),
      backgroundColor(c) {
        const value = c.dataset.data[c.dataIndex].v;
        const alpha = (10 + value) / 60;
        return Chart.helpers.color('green').alpha(alpha).rgbString();
      },
      borderColor(c) {
        const value = c.dataset.data[c.dataIndex].v;
        const alpha = (10 + value) / 60;
        return Chart.helpers
          .color('green')
          .alpha(alpha)
          .darken(0.3)
          .rgbString();
      },
      borderWidth: 1,
      hoverBackgroundColor: 'yellow',
      hoverBorderColor: 'yellowgreen',
      width(c) {
        const a = c.chart.chartArea || {};
        return (a.right - a.left) / 53 - 1;
      },
      height(c) {
        const a = c.chart.chartArea || {};
        return (a.bottom - a.top) / 7 - 1;
      }
    }
  ]
});
const createOptionsJandi = () => ({
  aspectRatio: 5,
  plugins: {
    legend: false,
    tooltip: {
      displayColors: false,
      callbacks: {
        title() {
          return '';
        },
        label(context) {
          const v = context.dataset.data[context.dataIndex];
          return ['d: ' + v.d, 'v: ' + v.v.toFixed(2)];
        }
      }
    }
  },
  scales: scalesJandi,
  layout: {
    padding: {
      top: 10
    }
  }
});
const createConfigJandi = () => ({
  type: 'matrix',
  data: createDataJandi(),
  options: createOptionsJandi()
});

const fetchCharts = () => {
  // 1. 차트를 만들기 위한 charts 배열
  const configProfil = {
    type: 'doughnut',
    data: {
      labels: state.categories.map(({ title }) => title),
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
      cutout: '80%'
    }
  };

  document.querySelector(
    '.profil__text'
  ).textContent = `${state.visitesLinks.length} / ${state.allLinks.length}`;

  const charts = [
    { canvas: profilChart, data: configProfil },
    { canvas: timeWeekChart, data: configTimeChart },
    { canvas: jandiChart, data: createConfigJandi() }
  ];

  console.log('hiii');

  render.myPage(charts);
};

// fetchCharts();

// Event

// document.querySelector('.sidebar__button--statistics').onclick = () => {
//   fetchCharts();
// };

export default fetchCharts;
