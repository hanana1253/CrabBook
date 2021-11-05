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
    title: 'Web Bible 🙏',
    items: [
      {
        id: 1,
        title: '웹 프로그래밍 튜토리얼 | PoiemaWeb',
        description: 'Front-end Development Tutorial',
        url: 'https://poiemaweb.com/',
        img: {
          url: 'https://poiemaweb.com/img/poiemaweb.jpg',
          width: '1200',
          height: '630',
          type: 'image/png'
        },
        tags: ['web', 'programming'],
        createDate: '2021-10-04T15:00:00.000Z',
        readStatus: false,
        memo: ''
      },
      {
        id: 2,
        title: 'MDN Web Docs',
        description:
          'The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.',
        url: 'https://developer.mozilla.org/en-US/',
        img: {
          url: 'https://developer.mozilla.org/mdn-social-share.0ca9dbda.png',
          width: null,
          height: null,
          type: 'png'
        },
        tags: ['web'],
        createDate: '2021-10-23T15:00:00.000Z',
        readStatus: true,
        memo: ''
      },
      {
        id: 3,
        title: 'React – 사용자 인터페이스를 만들기 위한 JavaScript 라이브러리',
        description: 'A JavaScript library for building user interfaces',
        url: 'https://ko.reactjs.org/',
        img: {
          url: 'https://reactjs.org/logo-og.png',
          width: null,
          height: null,
          type: 'png'
        },
        tags: ['web', 'react'],
        createDate: '2021-11-03T15:00:00.000Z',
        readStatus: false,
        memo: ''
      },
      {
        id: 8,
        title: 'JavaScript With Syntax For Types.',
        description:
          'TypeScript extends JavaScript by adding types to the language. TypeScript speeds up your development experience by catching errors and providing fixes before you even run your code.',
        url: 'https://www.typescriptlang.org/',
        img: {
          url: '',
          width: null,
          height: null,
          type: ''
        },
        tags: [],
        createDate: '2021-10-25T15:00:00.000Z',
        readStatus: true,
        memo: ''
      }
    ]
  },
  {
    id: 2,
    title: "Web chobo's blog 🐥",
    items: [
      {
        id: 4,
        title: 'Hanana1253 Blog - 성수동 코시생 하나나의 코딩일기',
        description:
          '성수동에서 코딩공부하는 하나나의 일상과 공부 기록입니다. Records of what I learned from Coding and Life',
        url: 'https://hanana1253.github.io/',
        img: {
          url: 'https://hanana1253.github.io/images/default.jpg',
          width: null,
          height: null,
          type: 'jpg'
        },
        tags: ['web', 'front-end'],
        createDate: '2021-10-28T15:00:00.000Z',
        readStatus: true,
        memo: ''
      },
      {
        id: 5,
        title: 'sosoyim (쏘쏘임) - velog',
        description: '무럭무럭 자라는 주니어 프론트엔드 개발자입니다.',
        url: 'https://velog.io/@sosoyim',
        img: {
          url: 'https://images.velog.io/velog.png',
          width: null,
          height: null,
          type: 'png'
        },
        tags: ['web', 'front-end'],
        createDate: '2021-10-28T15:00:00.000Z',
        readStatus: false,
        memo: ''
      },
      {
        id: 6,
        title: 'jkpark104 (jkpark104) - velog',
        url: 'https://velog.io/@jkpark104',
        img: {
          url: 'https://images.velog.io/velog.png',
          width: null,
          height: null,
          type: 'png'
        },
        tags: ['web', 'front-end'],
        createDate: '2021-10-28T15:00:00.000Z',
        readStatus: true,
        memo: ''
      },
      {
        id: 7,
        title: "hoya's dev blog",
        description: 'To be a beautiful developer🧑🏻‍💻',
        url: 'https://hoya-kim.github.io/',
        img: {
          url: '',
          width: null,
          height: null,
          type: ''
        },
        tags: ['web', 'front-end'],
        createDate: '2021-10-28T15:00:00.000Z',
        readStatus: false,
        memo: ''
      }
    ]
  },
  {
    id: 3,
    title: 'Tools 🔨',
    items: [
      {
        id: 20,
        title: 'GitHub: Where the world builds software',
        description:
          'GitHub is where over 73 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and feat...',
        url: 'https://github.com/',
        img: {
          url: 'https://github.githubassets.com/images/modules/site/social-cards/github-social.png',
          width: '1200',
          height: '620',
          type: 'image/png'
        },
        tags: [],
        createDate: '2021-10-25T15:00:00.000Z',
        readStatus: true,
        memo: ''
      },
      {
        id: 9,
        title: 'Visual Studio Code - Code Editing. Redefined',
        description:
          'Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.  Visual Studio Code is free and available on your favorite platform - Linux, macOS, and Windows.',
        url: 'https://code.visualstudio.com/',
        img: {
          url: 'https://code.visualstudio.com/opengraphimg/opengraph-home.png',
          width: null,
          height: null,
          type: 'png'
        },
        tags: [],
        createDate: '2021-10-22T15:00:00.000Z',
        readStatus: true,
        memo: ''
      },
      {
        id: 10,
        title: 'Slides – Create and share presentations online',
        description:
          "Slides is a place for creating, presenting and sharing presentations. The Slides editor is available right in your browser. Unlike traditional presentation software, like PowerPoint, there's no need to download anything.",
        url: 'https://slides.com/',
        img: {
          url: 'https://static.slid.es/logo/slides-logo-495x479.png',
          width: null,
          height: null,
          type: 'png'
        },
        tags: [],
        createDate: '2021-10-22T15:00:00.000Z',
        readStatus: false,
        memo: ''
      },
      {
        id: 11,
        title:
          'Notion – 메모, 작업, 위키, 데이터베이스를 위한 올인원 워크스페이스',
        description:
          '매일 쓰는 여러 업무용 앱을 하나로 합친 새로운 도구. 당신과 당신의 팀을 위한 올인원 워크스페이스예요.',
        url: 'https://www.notion.so/ko-kr/product?utm_source=google&utm_campaign=10805039169&utm_medium=104440699897&utm_content=455555244437&utm_term=notion&targetid=aud-841221518584:kwd-312974742&gclid=CjwKCAjwiY6MBhBqEiwARFSCPpI-mJrFN6LdbSf2it5EkyKKjLuDxvh6JHPI5F0npYy0ojmGAkmr4BoCzSwQAvD_BwE',
        img: {
          url: 'https://www.notion.so/front-static/meta/default.png',
          width: null,
          height: null,
          type: 'png'
        },
        tags: [],
        createDate: '2021-10-22T15:00:00.000Z',
        readStatus: false,
        memo: ''
      },
      {
        id: 15,
        title: 'GIPHY - Be Animated',
        description:
          'GIPHY is the platform that animates your world. Find the GIFs, Clips, and Stickers that make your conversations more positive, more expressive, and more you.',
        url: 'https://giphy.com/',
        img: {
          url: 'https://giphy.com/static/img/giphy-be-animated-logo.gif',
          width: '517',
          height: '517',
          type: 'gif'
        },
        tags: [],
        createDate: '2021-10-24T15:00:00.000Z',
        readStatus: false,
        memo: ''
      }
    ]
  },
  {
    id: 4,
    title: 'Portal 🏠',
    items: [
      {
        id: 12,
        title: '네이버',
        description:
          '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
        url: 'http://www.naver.com',
        img: {
          url: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
          width: null,
          height: null,
          type: 'png'
        },
        tags: [],
        createDate: '2021-10-20T15:00:00.000Z',
        readStatus: false,
        memo: ''
      },
      {
        id: 13,
        title: 'Daum',
        description: '나의 관심 콘텐츠를 가장 즐겁게 볼 수 있는 Daum',
        url: 'http://www.daum.net',
        img: {
          url: '//i1.daumcdn.net/svc/image/U03/common_icon/5587C4E4012FCD0001',
          width: null,
          height: null,
          type: null
        },
        tags: [],
        createDate: '2021-10-20T15:00:00.000Z',
        readStatus: false,
        memo: ''
      }
    ]
  },
  {
    id: 5,
    title: '🎬',
    items: [
      {
        id: 16,
        title: 'YouTube',
        description:
          'YouTube에서 마음에 드는 동영상과 음악을 감상하고, 직접 만든 콘텐츠를 업로드하여 친구, 가족뿐 아니라 전 세계 사람들과 콘텐츠를 공유할 수 있습니다.',
        url: 'https://www.youtube.com/',
        img: {
          url: 'https://www.youtube.com/img/desktop/yt_1200.png',
          width: null,
          height: null,
          type: 'png'
        },
        tags: [],
        createDate: '2021-10-20T15:00:00.000Z',
        readStatus: true,
        memo: ''
      },
      {
        id: 17,
        title:
          'Netflix South Korea - Watch TV Shows Online, Watch Movies Online',
        description:
          'Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.',
        url: 'https://netflix.com/',
        img: {
          url: 'https://assets.nflxext.com/ffe/siteui/vlv3/b70b092f-1760-4498-b462-b4ef19907ec7/72fa8b1a-b8d1-4e08-92cc-53a418069108/KR-en-20211101-popsignuptwoweeks-perspective_alpha_website_small.jpg',
          width: null,
          height: null,
          type: 'jpg'
        },

        tags: [],
        createDate: '2021-10-20T15:00:00.000Z',
        readStatus: true,
        memo: ''
      },
      {
        id: 18,
        title:
          '왓챠 - 체르노빌, 킬링이브, 왕좌의 게임 외 10만 편 영화, 드라마 무제한 감상',
        description:
          '모든 영화, 드라마, 다큐멘터리, 애니메이션을 언제 어디서나 최고의 화질로 무제한 감상하세요.',
        url: 'https://watcha.com/',
        img: {
          url: 'https://do6ll9a75gxk6.cloudfront.net/images/og.84e274ba21ac6d47d8ad.png',
          width: null,
          height: null,
          type: 'png'
        },
        tags: [],
        createDate: '2021-10-27T15:00:00.000Z',
        readStatus: true,
        memo: ''
      },
      {
        id: 19,
        title:
          '새로운 감동과 가능성을 발견해 보세요 우리가 좋아하는 모든 이야기, 11월 12일 스트리밍 시작',
        description:
          '디즈니, 픽사, 마블, 스타워즈, 내셔널지오그래픽, Star를 다 함께 즐길 수 있는 곳. 인기 영화, 고전 작품, 시리즈, 오리지널을 모두 한자리에서 만나보세요.',
        url: 'https://www.preview.disneyplus.com/ko-kr',
        img: {
          url: 'https://static-assets.bamgrid.com/product/disneyplus/images/share-default.14fadd993578b9916f855cebafb71e62.png',
          width: null,
          height: null,
          type: 'png'
        },
        tags: [],
        createDate: '2021-10-27T15:00:00.000Z',
        readStatus: true,
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
          $('#rso a').each(function (idx) {
            const href = $(this).attr('href');
            if (href !== '#') {
              linkList.push(href);
            }
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
        ogImage: img,
        ogUrl
      } = result;
      console.log(url, ogUrl, recommendUrl);
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
        createDate: new Date(),
        readStatus: false,
        clickCount: 0,
        memo: ''
      };
      res.send(recommendCardData);
    } catch (e) {
      res.send(null);
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
  }
);

app.patch('/store/:categoryId([0-9]+)', (req, res) => {
  const { categoryId } = req.params;
  const { title } = req.body;

  store.forEach(category => {
    if (category.id === +categoryId) category.title = title;
  });

  res.send(store);
});

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

app.patch('/store/:categoryId([0-9]+)/:cardId([0-9]+)/tag', (req, res) => {
  const { categoryId, cardId } = req.params;
  const { tag } = req.body;
  store
    .find(({ id }) => id === +categoryId)
    .items.find(({ id }) => id === +cardId)
    .tags.push(tag);

  res.send(store);
});

// DELETE
app.delete('/store/:id([0-9]+)', (req, res) => {
  const { id } = req.params;

  store = store.filter(category => category.id !== +id);

  res.send(store);
});

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
); // port, callback
