import http from './http';

export default {
    name: 'utils',
    mixins: [http],
    data() {
        return {
            api: {
                login: 'auth/login',
                frontend: {
                },
                backend: {
                    getAllData: '/admin/ec/products',
                    editData: '/admin/ec/product/', /** update data, delete data */
                    file: '/admin/storage',
                },
            },
        };
    },
    methods: {
        Login(data) {
            return this.post(this.api.login, data);
        },
        getBackendAllData() {
            return this.get(`${this.api.uuid}${this.api.backend.getAllData}`, true);
        },
        getBackendDataDetail(id) {
            return this.get(`${this.api.uuid}${this.api.backend.editData}${id}`, true);
        },
        createData(data) {
            return this.post(`${this.api.uuid}${this.api.backend.getAllData}`, data);
        },
        updateData(id, data) {
            return this.patch(`${this.api.uuid}${this.api.backend.editData}${id}`, data, true);
        },
        deleteData(id) {
            return this.del(`${this.api.uuid}${this.api.backend.editData}${id}`);
        },
    },
};
