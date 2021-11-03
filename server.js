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
    items: [
      {
        id: 2001,
        title: '네이버',
        description:
          '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
        url: 'https://www.naver.com/',
        img: {
          url: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_20212852414260.png',
          width: null,
          height: null,
          type: 'png'
        },
        tags: [],
        createDate: new Date(2021, 11, 3),
        readStatus: false,
        clickCount: 0,
        memo: ''
      }
    ]
  },
  {
    id: 1,
    title: 'New Category',
    items: [
      {
        id: 2001,
        title: '네이버',
        description:
          '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
        url: 'https://www.naver.com/',
        img: {
          url: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_20212852414260.png',
          width: null,
          height: null,
          type: 'png'
        },
        tags: [],
        createDate: new Date(2021, 7, 3),
        readStatus: false,
        clickCount: 0,
        memo: ''
      },
      {
        id: 2001,
        title: 'Daum',
        description: '나의 관심 콘텐츠를 가장 즐겁게 볼 수 있는 Daum',
        url: 'https://www.daum.net/',
        img: {
          url: '//i1.daumcdn.net/svc/image/U03/common_icon/5587C4E4012FCD0001',
          width: null,
          height: null,
          type: null
        },
        tags: [],
        createDate: new Date(2021, 6, 3),
        readStatus: false,
        clickCount: 0,
        memo: ''
      }
    ]
  },
  {
    id: 2,
    title: 'New Category',
    items: [
      {
        id: 2001,
        title: '네이버',
        description:
          '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
        url: 'https://www.naver.com/',
        img: {
          url: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_2020212852414260.png',
          width: null,
          height: null,
          type: 'png'
        },
        tags: [],
        createDate: new Date(2021, 8, 23),
        readStatus: false,
        clickCount: 0,
        memo: ''
      }
    ]
  },
  {
    id: 3,
    title: 'New Category',
    items: []
  }
];

app.use(express.static('src')); // 서버의 루트 디렉토리 (static 파일들)
app.use(express.json());

app.get('/store', (req, res) => {
  res.send(store);
});

app.get('/recommend/:keywordString', (req, res) => {
  const { keywordString } = req.params;

  const returnRandomRecommendedUrl = (keywordstring = 'html') => {
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
      const recommendUrl = await returnRandomRecommendedUrl(keywordString);
      const { result } = await ogs({ url: recommendUrl });
      const {
        ogTitle: title,
        ogUrl: url,
        ogDescription: description,
        ogImage: img
      } = result;
      const recommendCardData = {
        id: url,
        title,
        description,
        url,
        img,
        tags: [],
        createDate: new Date(),
        readStatus: false,
        clickCount: 0,
        memo: ''
      };
      res.send(recommendCardData);
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
          createDate: new Date(new Date().toString().slice(0, 16)),
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
