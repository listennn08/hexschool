import http from './http';

export default {
    name: 'utils',
    mixins: [http],
    data() {
        return {
            api: {
                uuid: 'dd62b88f-6f23-42a4-8551-b1cb4552bb3e',
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
        getBackendAllData() { this.get(`${this.api.uuid}${this.api.backend.getAllData}`, true); },
        createData(data) { this.post(`${this.api.uuid}${this.api.backend.getAllData}`, data); },
        updateData(id, data) { this.post(`${this.api.uuid}${this.api.backend.editData}${id}`, data); },
        deleteData(id) { this.del(`${this.api.uuid}${this.api.backend.editData}${id}`); },
    },
};
