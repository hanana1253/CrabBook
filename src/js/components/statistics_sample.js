// ===============SAMPLE CHARTS

// const { Chart } = require('chart.js');

const labelsTimeChart = ['Mon', 'Tue', 'Wds', 'Thr', 'Fri', 'Sat', 'Sun'];
const dataTimeChart = {
  labels: labelsTimeChart,
  datasets: [
    {
      label: 'My First Dataset',
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

const getTimeChart = dom => new Chart(dom, configTimeChart);
