const state = {
  loginInfo: {
    uuid: null,
    token: null,
    isLogin: false,
  },
  msg: {
    text: '',
    type: false,
  },
  products: [],
  tempProduct: {
    id: null,
    title: null,
    category: null,
    content: null,
    imageUrl: [],
    enabled: null,
    origin_price: null,
    price: null,
    unit: null,
    options: {
      store: null,
    },
  },
  page: {
    open: false,
  },
  loading: false,
  pagination: {},
  category: '',
  sticky: false,
  files: [],
  orders: [],
  order: {},
  coupons: [],
  coupon: {
    id: null,
    title: null,
    percent: null,
    enabled: null,
    deadline: {
      datetime: null,
      diff: null,
    },
  },
};

export default state;
