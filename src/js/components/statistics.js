// import Chart from '../../../node_modules/chart.js';
// import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import mock from '../store/mock.js';
import render from '../view/renderSo.js';
import { createDropZone, createCategory, createLinkCard } from './Kanban.js';
// const Chart = require('chart.js');
// const { Chart } = require('chart.js');

// DOM Nodes
const profilChart = document.querySelector('.profil__chart').getContext('2d');
const timeWeekChart = document
  .querySelector('.time__chart--week')
  .getContext('2d');
const jandiChart = document.querySelector('.jandi__chart').getContext('2d');

// state, 링크 데이터(임시)
let store = [];

// Functions
const countLinksByCategory = () => store.map(({ items }) => items.length);

// TODO: generateColors

const createChart = (canvas, data) => new Chart(canvas, data);

// Sample Charts==========================
// Donough Chart Profil
// const configProfil = {
//   type: 'doughnut',
//   data: {
//     labels: ['Category1', 'Category2', 'Unsorted'],
//     datasets: [
//       {
//         label: 'Scraps by category',
//         data: [4, 3, 2],
//         backgroundColor: [
//           // TODO: generateColors
//           'rgb(255, 99, 132)',
//           'rgb(54, 162, 235)',
//           'rgb(255, 205, 86)'
//         ],
//         hoverOffset: 4
//       }
//     ]
//   },
//   options: {
//     legend: {
//       display: false
//     },
//     cutout: '80%'
//   }
// };
// Bar Chart Weekly

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
// setup date 365 squares
const generateData = () => {
  const d = new Date();
  const today = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    0,
    0,
    0,
    0
  );
  const data = [];
  const end = today;
  let dt = new Date(new Date().setDate(end.getDate() - 365)); // 일 년 전부터
  while (dt <= end) {
    const iso = dt.toISOString().substring(0, 10);
    data.push({
      x: iso,
      y: isoDayOfWeek(dt),
      d: iso,
      v: Math.random() * 50 // 얼마나 많은 횟수가 들어갔나 임시 넣기
    });
    dt = new Date(dt.setDate(dt.getDate() + 1)); // 다음날
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
const dataJandi = {
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
};
const optionsJandi = {
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
};
const configJandi = {
  type: 'matrix',
  data: dataJandi,
  options: optionsJandi
};

// Event
window.addEventListener('DOMContentLoaded', async () => {
  // SAMPLE CHARTS
  // renderChart(profilChart, configProfil);
  createChart(timeWeekChart, configTimeChart);
  createChart(jandiChart, configJandi);
  try {
    const { data: newState } = await axios.get('/store');
    store = newState;
    console.log('real : ', store);
    // state = mock;
    // console.log('mock', state);

    // REAL DATAS
    const configProfil = {
      type: 'doughnut',
      data: {
        labels: store.map(({ title }) => title),
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
    // createChart(profilChart, configProfil);

    const charts = [
      { canvas: profilChart, data: configProfil },
      { canvas: timeWeekChart, data: configTimeChart },
      { canvas: jandiChart, data: configJandi }
    ];

    // 마지막 요소 5개 가져오기
    // const MAXCARDS = 5;
    // const countRecentLinks = store.length <= MAXCARDS ? store.length : MAXCARDS;

    // const $sortedCards = store
    //   .slice(-countRecentLinks, -1)
    //   .reverse()
    //   .map(({ items }) => items.map(cardData => createLinkCard(cardData)));

    render(charts);

    // renderChart(timeWeekChart, configTimeChart);
  } catch (e) {
    console.error(e);
  }
});
