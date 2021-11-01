// Mock data
const link1 = {
  title: 'All about HTML',
  description:
    'This is all about HTML. This is all about Javascript.This is all about Javascript.This is all about Javascript.',
  url: 'http://www.naver.com',
  img: {
    url: 'http://ogp.me/logo.png',
    width: '300',
    height: '300',
    type: 'image/png'
  },
  tags: ['loveit', 'html'],
  createDate: new Date(2021, 10, 28),
  readStatus: false,
  clickCount: 5,
  category: 'Front',
  memo: ''
};
const link2 = {
  title: 'All about Javascript',
  description:
    'This is all about Javascript. This is all about Javascript.This is all about Javascript.This is all about Javascript.',
  url: 'http://www.naver.com',
  img: {
    url: 'http://ogp.me/logo.png',
    width: '300',
    height: '300',
    type: 'image/png'
  },
  tags: ['loveit', 'javascript'],
  createDate: new Date(2021, 10, 31),
  readStatus: true,
  clickCount: 10,
  category: 'Front',
  memo: 'best article ever'
};
const link3 = {
  title: 'All about CSS',
  description:
    'This is all about CSS. This is all about CSS.This is all about CSS.This is all about CSS.',
  url: 'http://www.naver.com',
  img: {
    url: 'http://ogp.me/logo.png',
    width: '300',
    height: '300',
    type: 'image/png'
  },
  tags: [],
  createDate: new Date(2021, 10, 31),
  readStatus: false,
  clickCount: 0,
  category: '',
  memo: ''
};
const link4 = {
  title: 'All about game',
  description:
    'This is all about game. This is all about game.This is all about CSS.This is all about CSS.',
  url: 'http://www.naver.com',
  img: {
    url: 'http://ogp.me/logo.png',
    width: '300',
    height: '300',
    type: 'image/png'
  },
  tags: [],
  createDate: new Date(2021, 10, 6),
  readStatus: true,
  clickCount: 0,
  category: 'Game',
  memo: ''
};
const link5 = {
  title: 'All about game2',
  description:
    'This is all about game. This is all about game.This is all about CSS.This is all about CSS.',
  url: 'http://www.naver.com',
  img: {
    url: 'http://ogp.me/logo.png',
    width: '300',
    height: '300',
    type: 'image/png'
  },
  tags: [],
  createDate: new Date(2021, 10, 6),
  readStatus: false,
  clickCount: 0,
  category: 'Game',
  memo: ''
};

const links = [link1, link2, link3, link4, link5];
const categories = ['Game', 'Front', ''];

// store
const store = {
  state: {
    links,
    categories
  },
  get links() {
    return this.state.links;
  },
  get categories() {
    return this.state.categories;
  }
};

export default store;
