export default (() => {
  let categories = [];

  let hashtags = [];

  const diffDays = (date1, date2) =>
    Math.floor(Math.abs(date1 - date2) / (1000 * 3600 * 24));

  return {
    get categories() {
      return categories;
    },

    setCategories(newCategories) {
      categories = newCategories;
    },

    get hashtags() {
      return hashtags;
    },

    setHashtags(newHashtags) {
      hashtags = newHashtags;
    },

    get allLinks() {
      return categories.flatMap(({ items }) => items);
    },

    get visitesLinks() {
      return this.allLinks.filter(({ readStatus }) => readStatus);
    },

    getDailyScrapsPerYear() {
      const arr = Array(366).fill(0);
      const today = new Date(new Date().toString().slice(0, 16));
      this.allLinks.forEach(({ createDate }) => {
        const compareDate = new Date(createDate);
        if (diffDays(today, compareDate) <= 365)
          arr[diffDays(today, compareDate)] += 1;
      });
      return arr;
    }
  };
})();
