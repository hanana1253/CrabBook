const express = require('express');
const ogs = require('open-graph-scraper');

const app = express();

const PORT = 3001;

// Mock data
const state = [
  {
    id: 1,
    title: 'Category1',
    img: {
      url: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
      width: null,
      height: null,
      type: 'png'
    }
  },
  {
    id: 2,
    title: 'Category2',
    img: {
      url: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
      width: null,
      height: null,
      type: 'png'
    }
  },
  {
    id: 3,
    title: 'Category3',
    img: {
      url: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
      width: null,
      height: null,
      type: 'png'
    }
  },
  {
    id: 4,
    title: '네이버',
    description: '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
    url: 'https://www.naver.com/',
    img: {
      url: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
      width: null,
      height: null,
      type: 'png'
    },
    tags: [],
    createDate: new Date(),
    readStatus: false,
    clickCount: 0,
    category: 'Portal',
    memo: ''
  }
];

app.use(express.static('src')); // 서버의 루트 디렉토리 (static 파일들)
app.use(express.json());

app.get('/state', (req, res) => {
  res.send(state);
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
