export default (() => {
  let categories = [];

  let hashtags = [];

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
    }
  };
})();
