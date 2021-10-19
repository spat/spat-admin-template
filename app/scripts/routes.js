
export default {
  '/': {
    tag: 'page-index',
  },
  '/:collection': {
    tag: 'page-index',
  },
  '/:dir(.+)/:id': {
    tag: 'page-index',
  },
};

