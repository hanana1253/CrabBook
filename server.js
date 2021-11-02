const express = require('express');
const ogs = require('open-graph-scraper');

const app = express();

const PORT = 3001;

// Mock data
let store = [
  {
    id: 0,
    title: 'uncategorized',
    items: []
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
  ogs(req.body)
    .then(data => {
      const { result } = data;
      const {
        ogTitle: title,
        ogUrl: url,
        ogDescription: description,
        ogImage: img
      } = result;

      store[0].items = [
        ...store[0].items,
        {
          id: 2001,
          title,
          description,
          url,
          img,
          tags: [],
          createDate: new Date(),
          readStatus: false,
          clickCount: 0,
          memo: ''
        }
      ];
      res.send(store);
    })
    .catch(e => {
      console.error(e);
    });
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
