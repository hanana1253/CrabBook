export default (() => {
  let categories = [];

  let hashtags = ['html', 'css'];

  return {
    get categories() {
      return categories;
    },

    setCategories(newCategories) {
      categories = newCategories;
    },

    get hashtags() {
      hashtags = this.allLinks.reduce(
        (acc, { tags: cur }) => [...new Set([...acc, ...cur])],
        []
      );
      // return hashtags;
      return ['html', 'css'];
    },

    setHashtags(newHashtags) {
      hashtags = newHashtags;
    },

    get allLinks() {
      return categories.flatMap(({ items }) => items);
    }
  };
})();
