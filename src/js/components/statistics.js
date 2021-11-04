import state from '../store/state.js';
import render from '../view/render.js';
import { createLinkCard } from './Kanban.js';

// DOM Nodes
const profilChart = document.querySelector('.profil__chart');
const readWeekChart = document.querySelector('.read__chart--week');
const jandiChart = document.querySelector('.jandi__chart');

// Functions
const getCountLinksByCategory = () =>
  state.categories.map(({ items }) => items.length);

const getCountReadLinksByCategory = () =>
  state.categories.map(
    ({ items }) => items.filter(({ readStatus }) => readStatus).length
  );

// const getRecentLinks = () => state.allLinks.slice(-5).reverse();

// TODO: generateColors
const backgroundColorset = [
  '#dc8583',
  '#d15c5a',
  '#c63431',
  '#9e2927',
  '#761f1d',
  '#4f1413',
  '#3b0f0e',
  '#270a09'
];

const createConfigProfil = () => ({
  type: 'doughnut',
  data: {
    labels: state.categories.map(({ title }) => title),
    datasets: [
      {
        label: 'Scraps by category',
        data: getCountLinksByCategory(),
        backgroundColor: backgroundColorset,
        // backgroundColor: [
        //   // TODO: generateColors
        //   'rgb(255, 99, 132)',
        //   'rgb(54, 162, 235)',
        //   'rgb(255, 205, 86)'
        // ],
        hoverOffset: 4
      }
    ]
  },
  options: {
    cutout: '30%'
  }
});

// const DATA_COUNT = 7;
// const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };
const createConfigRead = () => ({
  type: 'bar',
  data: {
    labels: state.categories.map(({ title }) => title),
    datasets: [
      {
        label: 'scrap',
        type: 'bar',
        borderColor: '#e29998',
        data: getCountLinksByCategory(),
        fill: false
      },
      {
        label: 'read',
        type: 'line',
        backgroundColor: '#9e2927',
        data: getCountReadLinksByCategory()
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: '읽은 글과 스크랩한 글'
    },
    legend: { display: false }
  }
});

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
      label: 'Daily scraps per year',
      data: generateData(),
      backgroundColor(c) {
        const value = c.dataset.data[c.dataIndex].v;
        const alpha = (value || 0.5) / 5;
        return `rgba(158, 41, 39, ${alpha || 0.1})`;
        // return Chart.helpers.color('green').alpha(alpha).rgbString();
      },
      borderColor(c) {
        const value = c.dataset.data[c.dataIndex].v;
        const alpha = (value || 0.5) / 5;
        return `rgba(160, 60, 60, ${alpha || 0.1})`;
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
          return ['day: ' + v.d, 'scrap: ' + v.v.toFixed()];
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

let chartInstances = [];

// fetchCharts는 한 번만
const fetchCharts = () => {
  document.querySelector(
    '.profil__text'
  ).textContent = `${state.visitedLinks.length} / ${state.allLinks.length}`;

  const charts = [
    { canvas: profilChart, data: createConfigProfil() },
    { canvas: readWeekChart, data: createConfigRead() },
    { canvas: jandiChart, data: createConfigJandi() }
  ];

  charts.forEach(({ canvas, data }) => {
    // canvas.getContext('2d').restore();
    const chart = new Chart(canvas, data);
    chartInstances = [...chartInstances, chart];
  });

  // console.log(chartInstances);

  // console.log(getRecentLinks());
  const cards = state.recentLinks.map(createLinkCard);
  render.myPage(cards, chartInstances);
  // charts.forEach(({ canvas, data }) => {
  // canvas.getContext('2d').restore();
  // new Chart(canvas, data);
  // });

  // render.myPage(charts, state.recentLinks);
};

// Event

export default fetchCharts;
