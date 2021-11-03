const hashtags = ['javascript', 'crawling', 'html', 'css', 'accessibility'];

const store = {
  url: ''
};

const setURL = newURL => {
  store.url = newURL;
  console.log(store.url);
};



const getUrl = async () => {
  const getRandomElements = (array, numOfElems = 2) => {
    return [...array].sort(() => Math.random() - 0.5).slice(0, numOfElems);
  };
  try {
    const { data: newURL } = await axios.get(
      `/recommend/${getRandomElements(hashtags).join('+')}`
    );
    setURL(newURL);
    document.querySelector('.test').textContent = store.url;
  } catch (e) {
    console.error(e);
  }
};

document.querySelector('.button').onclick = getUrl;
