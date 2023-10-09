const API_WOMPI = "https://production.wompi.co/v1";
const TOKEN_WOMPI = "pub_prod_774MTyTYpiQxfqnVU98waol9Bc1gq0tI";
export default {
    namespaced: true,
    state: {
        transactions: null,
        acceptance_token: "",
        permalink: "",
        idTransactions: ""
    },
    getters: {},
    mutations: {
        SET_PERMALINK(state, val) {
            state.permalink = val
        },
        SET_TRANSACTION(state, val) {
            state.transactions = val
        },
        SET_ACCEPTANCE_TOKEN(state, val) {
            state.acceptance_token = val
        },
        SET_IDTRANSACTIONS(state, val) {
            state.idTransactions = val
        }
    },
    getters: {
        getTransaction(state) {
            return state.transactions;

        },
        getIdTransactions(state) {
            return state.idTransactions;
        },
        getPermalink(state) {
            return state.permalink;
        },
    },

    actions: {

        async getTokensTransactios({ commit }) {
            try {
                const response = await fetch(API_WOMPI + '/merchants/' + TOKEN_WOMPI, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error('No se pudo obtener la lista de usuarios');
                }

                const data = await response.json();
                const res = data.data.presigned_acceptance;
                commit('SET_ACCEPTANCE_TOKEN', res.acceptance_token);
                commit('SET_PERMALINK', res.permalink);
                return res;
            } catch (error) {
                console.error(error);
            }
        },

        async createTransactios({ commit }, body) {
            try {
                const response = await fetch(API_WOMPI + '/transactions', {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN_WOMPI}` }
                });

                if (!response.ok) {
                    console.log(response)
                }

                const data = await response.json();
                const res = data.data;

                commit('SET_TRANSACTION', res)
                commit('SET_IDTRANSACTIONS', res.id);

            } catch (error) {
                console.error(error);
            }
        },

        async getTransactios({ commit }, idTransactions) {
            try {
                const response = await fetch(API_WOMPI + '/transactions/' + idTransactions, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error('No se pudo obtener la lista de usuarios');
                }

                const data = await response.json();
                const res = data.data;

                return res.status
            } catch (error) {
                console.error(error);
            }
        },
    },
}
