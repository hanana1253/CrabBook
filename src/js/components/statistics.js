// import store from '../store/store-test.js';
// DOM Nodes

// state, 링크 데이터(임시)
let state = [];

// Functions
const countScrapsByCategory = () => {
  [...state].map(({ items }) => items.length);
};

// const getCategoriesTitle = () => {
//   state.map(({ title }) => title);
// };
// const countScrapsByCategory = categories =>
//   categories.map(
//     compareCategory =>
//       [...store.links].filter(({ category }) => compareCategory === category)
//         .length
//   );

// const countReadScrapsByCategory = categories =>
//   categories.map(
//     compareCategory =>
//       [...store.links].filter(
//         ({ category, readStatus }) => compareCategory === category && readStatus
//       ).length
//   );

// TODO: generateColors
// 랜덤컬러? 사용자 지정?

const pieChart = document.querySelector('.profil__chart').getContext('2d');
const pieScrapsByCategory = new Chart(pieChart, {
  type: 'pie',
  data: {
    labels: state.map(({ title }) => title),
    datasets: [
      {
        label: 'My First Dataset',
        data: countScrapsByCategory(),
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

// Event
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data: newState } = await axios.get('/state');
    state = newState;
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
