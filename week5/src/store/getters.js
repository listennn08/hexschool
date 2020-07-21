const getters = {
    msg: (state) => state.msg,
    category: (state) => state.category,
    pid: (state) => state.tempProduct.id,
    product: (state) => state.tempProduct,
    products: (state) => state.products,
    productPage: (state) => state.productPage,
    loading: (state) => state.loading,
    pagination: (state) => state.pagination,
    sticky: (state) => state.sticky,
};

export default getters;
