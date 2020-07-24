const state = {
    loginInfo: {
        uuid: null,
        token: null,
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
    productPage: {
        open: false,
    },
    loading: false,
    pagination: {},
    category: '',
    sticky: false,
};

export default state;
