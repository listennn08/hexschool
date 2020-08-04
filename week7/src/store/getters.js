const getters = {
  loginInfo: (state) => state.loginInfo,
  msg: (state) => state.msg,
  category: (state) => state.category,
  tempProduct: (state) => state.tempProduct,
  products: (state) => state.products,
  page: (state) => state.page,
  loading: (state) => state.loading,
  pagination: (state) => state.pagination,
  sticky: (state) => state.sticky,
  files: (state) => state.files,
  orders: (state) => state.orders,
  order: (state) => state.order,
  coupons: (state) => state.coupons,
  coupon: (state) => state.coupon,
};

export default getters;
