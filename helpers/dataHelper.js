module.exports = {
  findIdFromUrl(url) {
    const _id = url.split('/').pop();
    return _id;
  },
};
