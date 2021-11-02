// import { Chart } from 'chart.js';
// import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

// const { Chart } = require('chart.js');

// DOM Nodes
const profilChart = document.querySelector('.profil__chart').getContext('2d');
const readChart = document.querySelector('.read__chart').getContext('2d');

// state, 링크 데이터(임시)
let state = [];

// Functions
const countLinksByCategory = () => state.map(({ items }) => items.length);

// TODO: generateColors
// 랜덤컬러? 사용자 지정?
const renderChart = (type, data) => new Chart(type, data);

const renderChartWithOptions = (type, data, options) =>
  new Chart(type, data, options);

// date settings
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
    console.log(dt, end);
    // debugger;
    const iso = dt.toISOString().substring(0, 10);
    data.push({
      x: iso,
      y: isoDayOfWeek(dt),
      d: iso,
      v: Math.random() * 50 // 얼마나 많은 횟수가 들어갔나 임시 넣기
    });
    dt = new Date(dt.setDate(dt.getDate() + 1)); // 다음날
  }
  // debugger;
  console.log(data);
  return data;
};

const dataTest = {
  datasets: [
    {
      label: 'Jandi',
      data: generateData(),
      backgroundColor(c) {
        // c: generateData의 v
        const value = c.dataset.data[c.dataIndex].v;
        const alpha = (10 + value) / 60; // 0.0 ~ 1
        return `rgba(0, 200, 0, ${alpha})`;
      },
      borderColor: 'green',
      borderRadius: 1,
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255, 26, 104, 0.2)',
      hoverBorderColor: 'rgba(255, 26,104,1',
      width(c) {
        const a = c.chart.chartArea || {};
        return (a.right - a.left) / 53 - 1; // width height
      },
      height(c) {
        const a = c.chart.chartArea || {};
        return (a.bottom - a.top) / 7 - 1;
      }
    }
  ]
};

// scales block
// TODO: scales 무한 높이
const scales = {
  y: {
    type: 'time',
    offset: true, // 각각 요소 간격
    time: {
      unit: 'day',
      round: 'day',
      isoWeek: 1,
      parser: 'i',
      displayFormats: {
        day: 'iii'
      }
    },
    reserve: true,
    position: 'right',
    ticks: {
      maxRotation: 0,
      autoSkip: true,
      padding: 1,
      font: {
        size: 9
      }
    }
  }
};

const configTest = {
  type: 'matrix',
  dataTest,
  options: {
    // maintainAspectRatio: false,
    scales,
    plugins: {
      legend: {
        display: false
      }
    }
  }
};

// Event
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data: newState } = await axios.get('/state');
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
      }
    });

    // TODO: 함수 빼기
    renderChartWithOptions(readChart, configTest);
  } catch (e) {
    console.error(e);
  }
});

// const barChart = document.querySelector('.read__chart.bar').getContext('2d');
// const barChartReadScrapsByCategory = new Chart(barChart, {
//   type: 'bar',
//   data: {
//     labels: store.categories,
//     datasets: [
//       {
//         label: 'scrapped',
//         data: countScrapsByCategory(store.categories),
//         backgroundColor: [
//           // TODO: generateColors
//           'rgba(255, 99, 132, 20)',
//           'rgba(54, 162, 235, 20)',
//           'rgba(255, 205, 86, 20)'
//         ]
//       },
//       {
//         label: 'read',
//         data: countReadScrapsByCategory(store.categories),
//         backgroundColor: [
//           // TODO: generateColors
//           'rgba(255, 99, 132, 70)',
//           'rgba(54, 162, 235, 70)',
//           'rgba(255, 205, 86, 70)'
//         ]
//       }
//     ]
//   }
//   // options: {
//   //   maintainAspectRatio: false,
//   //   scales: {
//   //     xAxes: [{ stacked: true }],
//   //     yAxes: [{ stacked: true }]
//   //   }
//   // }
// });
