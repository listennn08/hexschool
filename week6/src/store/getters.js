const getters = {
  loginInfo: (state) => state.loginInfo,
  msg: (state) => state.msg,
  category: (state) => state.category,
  tempProduct: (state) => state.tempProduct,
  products: (state) => state.products,
  productPage: (state) => state.productPage,
  loading: (state) => state.loading,
  pagination: (state) => state.pagination,
  sticky: (state) => state.sticky,
  files: (state) => state.files,
  orders: (state) => state.orders,
  coupons: (state) => state.coupons,
};

export default getters;
