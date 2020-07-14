import { get } from '../cookies';

export default {
    name: 'http',
    methods: {
        get(url, auth = false) {
            if (auth) {
                return this
                    .$http
                    .get(url, {
                        headers: {
                            Authorization: getItem('token'),
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
                            Authorization: getItem('token'),
                        },
                    });
            }
            return this
                .$http
                .post(url, data);
        },
        patch(url, data = {}, auth = false) {
            if (auth) {
                return this
                    .patch(url, data, {
                        headers: {
                            Authorization: getItem('token'),
                        },
                    });
            }
            return this
                .patch(url, data);
        },
        del(url, auth = false) {
            if (auth) {
                return this
                    .patch(url, {
                        headers: {
                            Authorization: docCookies.getItem('token'),
                        },
                    });
            }
            return this
                .delete(url);
        },
    },
};
