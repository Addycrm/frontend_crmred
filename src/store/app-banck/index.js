import { axiosIns } from '@/libs/axios'
export default {
    namespaced: true,
    state: {
        bancks: "",
        price: 0
    },
    getters: {
        getPrice(state) {
            const price = new Intl.NumberFormat('es-CO').format(parseInt(state.price));
            return price;
        }
    },
    mutations: {
        SET_BANCK(state, val) {
            state.bancks = val
        },
        SET_PRICE(state, val) {
            state.price = val;
        }
    },
    actions: {
        getBancks(ctx, data) {
            return new Promise(resolve => {
                axiosIns({
                    url: 'api/wompi/bancks',
                    method: 'get',
                }).then(res => {
                    ctx.commit("SET_BANCK", res.data.data);
                    resolve(true);
                }).catch(err => {
                    console.error(err)
                    resolve(false);
                })
            })
        },

        getPlanForId(ctx, id) {
            return new Promise(resolve => {
                axiosIns({
                    url: 'api/wompi/plan/' + id,
                    method: 'get',
                }).then(res => {
                    ctx.commit("SET_PRICE", res.data.data.price);
                }).catch(err => {
                    console.error(err)
                    resolve(false);
                })
            })
        },

        createTransactions(ctx, data) {
            return new Promise(resolve => {
                axiosIns({
                    url: 'api/wompi/transactions',
                    method: 'post',
                    data
                }).then(res => {

                    resolve(res.data.data);
                }).catch(err => {
                    console.error(err)
                    resolve(false);
                })
            })
        }

    },
}
