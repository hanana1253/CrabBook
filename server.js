const express = require('express');
const ogs = require('open-graph-scraper');
const cheerio = require('cheerio-httpcli');

const app = express();

const PORT = 3001;

// Mock data
let store = [
  {
    id: 0,
    title: 'uncategorized',
    items: []
  },
  {
    id: 1,
    title: 'New Category',
    items: []
  }
];

app.use(express.static('src')); // 서버의 루트 디렉토리 (static 파일들)
app.use(express.json());

app.get('/store', (req, res) => {
  res.send(store);
});

app.get('/recommend/:keywords', (req, res) => {
  const { keywords: keywordString } = req.params;

  const returnRandomRecommendedUrl = keywordstring => {
    const url = `https://www.google.com/search?q=${keywordstring}&oq=${keywordstring}&aqs=chrome..69i57.6936j0j7&sourceid=chrome&ie=UTF-8`;
    const params = {};

    return new Promise((resolve, reject) => {
      const linkList = [];
      cheerio.fetch(url, params, (err, $) => {
        if (err) {
          reject(err);
        } else {
          $('#rso > div > div > div > div > a').each(function (idx) {
            const hrefs = $(this).attr('href');
            linkList[idx] = hrefs;
          });
          resolve([...linkList].sort(() => Math.random() - 0.5)[0]);
        }
      });
    });
  };
  
  (async () => {
    try {
      const url = await returnRandomRecommendedUrl(keywordString);
      res.send(url);
    } catch (e) {
      console.log(e);
    }
  })();
});


app.post('/store', (req, res) => {
  const newStore = req.body;
  store = [...store, newStore];

  res.send(store);
});

app.post('/store/link', (req, res) => {
  ogs(req.body)
    .then(data => {
      const {
        ogTitle: title,
        ogUrl: url,
        ogDescription: description,
        ogImage: img
      } = data.result;

      store[0].items = [
        ...store[0].items,
        {
          id: Math.floor(Math.random() * 1000),
          title,
          description,
          url,
          img: {
            url: '',
            width: null,
            height: null,
            type: '',
            ...img
          },
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

  const index =
    currentCategoryId === toBePlacedCategoryId &&
    toBePlacedCardIndex >= 2 &&
    currentCardIndex < toBePlacedCardIndex
      ? toBePlacedCardIndex - 1
      : toBePlacedCardIndex;

  store.forEach(({ id, items }) => {
    if (id === +toBePlacedCategoryId) items.splice(index, 0, droppedItem[0]);
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
