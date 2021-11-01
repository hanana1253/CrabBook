const express = require('express');
const ogs = require('open-graph-scraper');

const app = express();

const PORT = 3001;

// Mock data
const store = [
  {
    id: 0,
    title: 'uncategorized',
    items: []
  },
  {
    id: 1,
    title: 'Category1',
    items: [
      {
        id: 1001,
        title: '[JavaScript] - 커링에 대해 알아보자',
        description: 'JS의 커링이란?',
        url: 'https://velog.io/@hustle-dev/Javascript-커링에-대해-알아보자',
        img: {
          url: 'https://media.vlpt.us/images/hustle-dev/post/37a3fe98-6f34-4c27-8765-4c2c9a1021f2/스크린샷 2021-10-03 오후 12.46.11.png?w=768',
          width: null,
          height: null,
          type: 'png'
        },
        tags: [],
        createDate: new Date(),
        readStatus: false,
        clickCount: 0,
        memo: ''
      },
      {
        id: 1002,
        title: '[JavaScript] - 커링에 대해 알아보자',
        description: 'JS의 커링이란?',
        url: 'https://velog.io/@hustle-dev/Javascript-커링에-대해-알아보자',
        img: {
          url: 'https://media.vlpt.us/images/hustle-dev/post/37a3fe98-6f34-4c27-8765-4c2c9a1021f2/스크린샷 2021-10-03 오후 12.46.11.png?w=768',
          width: null,
          height: null,
          type: 'png'
        },
        tags: [],
        createDate: new Date(),
        readStatus: false,
        clickCount: 0,
        memo: ''
      }
    ]
  },
  {
    id: 2,
    title: 'Category2',
    items: [
      {
        id: 2001,
        title: '[JavaScript] - 커링에 대해 알아보자',
        description: 'JS의 커링이란?',
        url: 'https://velog.io/@hustle-dev/Javascript-커링에-대해-알아보자',
        img: {
          url: 'https://media.vlpt.us/images/hustle-dev/post/37a3fe98-6f34-4c27-8765-4c2c9a1021f2/스크린샷 2021-10-03 오후 12.46.11.png?w=768',
          width: null,
          height: null,
          type: 'png'
        },
        tags: [],
        createDate: new Date(),
        readStatus: false,
        clickCount: 0,
        memo: ''
      }
    ]
  }
];

app.use(express.static('src')); // 서버의 루트 디렉토리 (static 파일들)
app.use(express.json());

app.get('/state', (req, res) => {
  res.send(store);
});

// app.post('/todos', (req, res) => {
//   const newTodos = req.body;

//   todos = [newTodos, ...todos];

//   res.send(todos);
// });

// app.patch('/todos', (req, res) => {
//   const { completed } = req.body;

//   todos = todos.map(todo => ({ ...todo, completed }));

//   res.send(todos);
// });

// // PATCH /todos/:id {completed} or {content} ---- (:id) <- 파라미터
// app.patch('/todos/:id', (req, res) => {
//   const { id } = req.params;
//   const payload = req.body;

//   todos = todos.map(todo => (todo.id === +id ? { ...todo, ...payload } : todo));

//   res.send(todos);
// });

// // DELETE /todos/id
// app.delete('/todos/:id([0-9]+)', (req, res) => {
//   const { id } = req.params;

//   todos = todos.filter(todo => todo.id !== +id);

//   res.send(todos);
// });

// // DELETE /todos/completed
// app.delete('/todos/completed', (req, res) => {
//   todos = todos.filter(todo => !todo.completed);

//   res.send(todos);
// });

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
); // port, callback

// const options = { url: 'http://naver.com/' };

// ogs(options).then(data => {
//   const { error, result, response } = data;
//   const {
//     ogTitle,
//     ogType,
//     ogUrl,
//     ogDescription,
//     ogImage,
//     requestUrl,
//     success
//   } = result;
//   console.log(
//     ogTitle,
//     ogType,
//     ogUrl,
//     ogDescription,
//     ogImage,
//     requestUrl,
//     success
//   );
// });

// {
//   title: {string}
//   description: {string}
//   url: {string}
//   img: {object} {
//     url: 'http://ogp.me/logo.png',
//     width: '300',
//     height: '300',
//     type: 'image/png'
//   }
//   tags: {Array<string>}
//   createDate: {Date}
//   readStatus: {boolean}
//   clickCount: {number}
//   category: {string}
//   memo: {string}
// }
