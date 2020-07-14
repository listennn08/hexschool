import * as docCookies from '../cookies';

export default {
    name: 'http',
    data() {
        return {
            api: {
                uuid: docCookies.getItem('uuid'),
            },
        };
    },
    methods: {
        get(url, auth = false) {
            if (auth) {
                return this
                    .$http
                    .get(url, {
                        headers: {
                            Authorization: `Bearer ${docCookies.getItem('token')}`,
                        },
                    });
            }
            return this
                .$http
                .get(url);
        },
        post(url, data = {}, auth = false) {
            if (auth) {
                return this
                    .$http
                    .post(url, data, {
                        headers: {
                            Authorization: `Bearer ${docCookies.getItem('token')}`,
                        },
                    });
            }
            return this
                .$http
                .post(url, data);
        },
        patch(url, data = {}, auth = false) {
            console.log(`${url}\n`, data, auth);
            if (auth) {
                return this
                    .patch(url, data, {
                        headers: {
                            Authorization: `Bearer ${docCookies.getItem('token')}`,
                        },
                    });
            }
            return this
                .patch(url, data);
        },
        del(url, auth = false) {
            if (auth) {
                return this
                    .delete(url, {
                        headers: {
                            Authorization: `Bearer ${docCookies.getItem('token')}`,
                        },
                    });
            }
            return this
                .delete(url);
        },
    },
};
