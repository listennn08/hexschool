import { docCookies } from '../cookies';

export default {
    get(url, auth = false) {
        if (auth) {
            return this
                .$http
                .get(url, {
                    headers: {
                        Authorization: docCookies.getItem('token'),
                    },
                });
        }
        return this
            .$http
            .get(url);
    },

    post(url, data, auth = false) {
        if (auth) {
            return this
                .$http
                .post(url, data, {
                    headers: {
                        Authorization: docCookies.getItem('token'),
                    },
                });
        }
        return this
            .$http
            .post(url, data);
    },

    path(url, data, auth = false) {
        if (auth) {
            return this
                .patch(url, data, {
                    headers: {
                        Authorization: docCookies.getItem('token'),
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
};
