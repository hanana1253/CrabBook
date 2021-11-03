const express = require('express');
const cheerio = require('cheerio-httpcli');

const app = express();

const PORT = 3001;

app.use(express.static('src')); // 서버의 루트 디렉토리 (static 파일들)
app.use(express.json());

app.get('/test/:keywords', (req, res) => {
  const { keywords: keywordString } = req.params;

  const returnRecommendedUrl = keywordstring => {
    const url = `https://www.google.com/search?q=${keywordstring}&oq=${keywordstring}&aqs=chrome..69i57.6936j0j7&sourceid=chrome&ie=UTF-8`;
    const params = {};
  
    return new Promise((resolve, reject) => {
      const linkList = [];
      cheerio.fetch(url, params, (err, $) => {
        if (err) {
          reject(err);
        } else {
          $('#rso > div > div > div > div > a').each(function (idx) {
            const href = $(this).attr('href');
            linkList[idx] = href;
          });
          resolve(linkList);
        }
      });
    });
  };
  
  (async () => {
    try {
      const url = await returnRecommendedUrl(keywordString);
      res.send(url);
    } catch (e) {
      console.log(e);
    }
  })();
});


// (async () => {
//   try {
//     const urls = await returnRecommendedUrl(hashtags);
//     setURL(getRandomElements(urls, 1)[0]);
//   } catch (e) {
//     console.log(e);
//   }
// })();

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
); // port, callback
