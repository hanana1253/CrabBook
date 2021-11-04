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
        id: 1,
        title: '네이버',
        description:
          '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
        url: 'https://www.naver.com/',
        img: {
          url: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
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
        id: 2,
        title: '네이버',
        description:
          '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
        url: 'https://www.naver.com/',
        img: {
          url: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
          width: null,
          height: null,
          type: 'png'
        },
        tags: ['portal', 'daum'],
        createDate: new Date(2021, 7, 3),
        readStatus: false,
        clickCount: 0,
        memo: ''
      },
      {
        id: 3,
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
        id: 4,
        title: '네이버',
        description:
          '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
        url: 'https://www.naver.com/',
        img: {
          url: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
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

// Get Store
app.get('/store', (req, res) => {
  res.send(store);
});

// Get Recommended Site
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
        requestUrl: url,
        ogDescription: description,
        ogImage: img
      } = result;
      const recommendCardData = {
        id: 0,
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
      };
      res.send(recommendCardData);
    } catch (e) {
      console.log(e);
    }
  })();
});

// Post new Category
app.post('/store', (req, res) => {
  const newStore = req.body;
  store = [...store, newStore];

  res.send(store);
});

// Post Card from sidebar
app.post('/store/link', (req, res) => {
  const { url, id } = req.body;

  ogs({ url })
    .then(data => {
      const {
        ogTitle: title,
        requestUrl: url,
        ogDescription: description,
        ogImage: img
      } = data.result;

      store[0].items = [
        ...store[0].items,
        {
          id,
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
          memo: ''
        }
      ];
      res.send(store);
    })
    .catch(e => {
      console.error(e);
    });
});

// Post Recommend Card to Store
app.post('/store/:toBePlacedCategoryId/:toBePlacedCardIndex', (req, res) => {
  const { toBePlacedCategoryId, toBePlacedCardIndex } = req.params;

  const { url, id } = req.body;

  ogs({ url })
    .then(data => {
      const {
        ogTitle: title,
        requestUrl: url,
        ogDescription: description,
        ogImage: img
      } = data.result;

      store.forEach(({ id: categoryId, items }) => {
        if (categoryId === +toBePlacedCategoryId)
          items.splice(+toBePlacedCardIndex, 0, {
            id,
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
            memo: ''
          });
      });
      res.send(store);
    })
    .catch(e => {
      console.error(e);
    });
});

// Patch LinkCard Position
app.patch(
  '/store/:currentCategoryId([0-9]+)/:currentCardIndex([0-9]+)',
  (req, res) => {
    const { currentCategoryId, currentCardIndex } = req.params;
    const { toBePlacedCategoryId, toBePlacedCardIndex } = req.body;

    let droppedItem = null;

    store.forEach(({ id, items }) => {
      if (id === +currentCategoryId)
        droppedItem = items.splice(currentCardIndex, 1);
    });

    const nextIndex =
      currentCategoryId === toBePlacedCategoryId &&
      toBePlacedCardIndex >= 2 &&
      currentCardIndex < toBePlacedCardIndex
        ? toBePlacedCardIndex - 1
        : toBePlacedCardIndex;

    store.forEach(({ id, items }) => {
      if (id === +toBePlacedCategoryId)
        items.splice(nextIndex, 0, droppedItem[0]);
    });

    res.send(store);
  }
);

// Patch Category Title
app.patch('/store/:categoryId([0-9]+)', (req, res) => {
  const { categoryId } = req.params;
  const { title } = req.body;

  store.forEach(category => {
    if (category.id === +categoryId) category.title = title;
  });

  res.send(store);
});

// Patch LinkCard Content
app.patch('/store/:categoryId([0-9]+)/:cardId/content', (req, res) => {
  const { categoryId, cardId } = req.params;
  const content = req.body;

  const targetCategoryIndex = store.findIndex(
    category => category.id === +categoryId
  );

  store[targetCategoryIndex].items = store[targetCategoryIndex].items.map(
    card => (card.id === +cardId ? { ...card, ...content } : card)
  );

  res.send(store);
});

// Patch LinkCard Tag
app.patch('/store/:categoryId([0-9]+)/:cardId([0-9]+)/tag', (req, res) => {
  const { categoryId, cardId } = req.params;
  const { tag } = req.body;
  store
    .find(({ id }) => id === +categoryId)
    .items.find(({ id }) => id === +cardId)
    .tags.push(tag);

  res.send(store);
});

// Delete Category
app.delete('/store/:id([0-9]+)', (req, res) => {
  const { id } = req.params;

  store = store.filter(category => category.id !== +id);

  res.send(store);
});

// Delete LinkCard
app.delete('/store/:categoryId([0-9]+)/:cardId([0-9]+)', (req, res) => {
  const { categoryId, cardId } = req.params;

  const targetIndex = store.findIndex(category => category.id === +categoryId);

  store[targetIndex].items = store[targetIndex].items.filter(
    card => card.id !== +cardId
  );

  res.send(store);
});

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
); // port, callback
