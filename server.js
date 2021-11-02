const express = require('express');
const ogs = require('open-graph-scraper');

const app = express();

const PORT = 3001;

// Mock data
let store = [
  {
    id: 0,
    title: 'uncategorized',
    items: [
      {
        id: 1001,
        title: '[JavaScript] - 커링에 대해 알아보자',
        description: 'JS의 커링이란?1',
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
        description: 'JS의 커링이란?2',
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
    id: 1,
    title: 'Category1',
    items: [
      {
        id: 1001,
        title: '[JavaScript] - 커링에 대해 알아보자',
        description: 'JS의 커링이란?1',
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
        description: 'JS의 커링이란?2',
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
        description: 'JS의 커링이란?3',
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

app.get('/store', (req, res) => {
  res.send(store);
});

app.post('/store', (req, res) => {
  const newStore = req.body;
  store = [...store, newStore];

  res.send(store);
});

app.post('/store/link', (req, res) => {
  const url = req.body;

  // ogs 처리한 정보가 아래 담겨야 합니다.
  store[0].items = [
    ...store[0].items,
    {
      id: 2001,
      title: '[JavaScript] - 커링에 대해 알아보자',
      description: 'JS의 커링이란?3',
      url,
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
  ];
  res.send(store);
});

// app.patch('/todos', (req, res) => {
//   const { completed } = req.body;

//   todos = todos.map(todo => ({ ...todo, completed }));

//   res.send(todos);
// });

// // PATCH /todos/:id {completed} or {content} ---- (:id) <- 파라미터
app.patch('/store/:currentCategoryId/:currentCardIndex', (req, res) => {
  const { currentCategoryId, currentCardIndex } = req.params;
  const { toBePlacedCategoryId, toBePlacedCardIndex } = req.body;

  let droppedItem = null;

  store.forEach(({ id, items }) => {
    if (id === +currentCategoryId)
      droppedItem = items.splice(currentCardIndex, 1);
  });

  store.forEach(({ id, items }) => {
    if (id === +toBePlacedCategoryId)
      items.splice(toBePlacedCardIndex, 0, droppedItem[0]);
  });

  res.send(store);
});

// // DELETE /todos/id
app.delete('/store/:id([0-9]+)', (req, res) => {
  const { id } = req.params;

  store = store.filter(todo => todo.id !== +id);

  res.send(store);
});

// // DELETE /todos/completed
// app.delete('/todos/completed', (req, res) => {
//   todos = todos.filter(todo => !todo.completed);

//   res.send(todos);
// });

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
); // port, callback

// const options = {
//   url: 'https://velog.io/@hustle-dev/Javascript-%EC%BB%A4%EB%A7%81%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90'
// };

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
//     [
//       `ogTitle:${ogTitle}`,
//       `ogType:${ogType}`,
//       `ogUrl:${ogUrl}`,
//       `ogDescription:${ogDescription}`,
//       `ogUrl:${ogUrl}`,
//       `ogImage:${ogImage}`,
//       `requestUrl:${requestUrl}`,
//       `success:${success}`
//     ].join('\n')
//   );
//   console.log(ogImage);
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
