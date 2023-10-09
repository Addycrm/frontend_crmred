import { axiosIns } from '@/libs/axios'

export default {
    namespaced: true,
    state: {
        allAgents:null,
        selectallAgents:null,
        optionsPlans:[],
        tabla: {
            data: [],
            total: 1
        },
        contact_portal: {
            data: [],
            total: 1
        },
        propietarios: [],
        inmueblesAgent:{},
        selectAgent:null
    },
    getters: {},
    mutations: {
        SET_AGENTS: (state, value) => {
            for (let prop in value)
                Object.assign(state.tabla, { [prop]: value[prop] });
        },
        SET_AGENTS: (state, value) => {
            for (let prop in value)
                Object.assign(state.tabla, { [prop]: value[prop] });
        },
        UPDATE_AGENTS_ALL: (state, value) => {
            for (let item of state.tabla.data)
                if (item.id == value.id)
                    Object.assign(item, value);
        },
        UPDATE_AGENTS: (state, value) => {
            for (let item of state.tabla.data)
                if (item.id == value.id)
                    Object.assign(item, value);
        },
        ADD_AGENTS: (state, value) => {
            state.tabla.data.unshift(value);
        },
        SELECT_AGENT:(state,value)=>{
            state.selectAgent = value;
        },
        UPDATE_INMUEBLE: (state, value) => {
            if(state.inmueblesAgent.data!=null){
                for (let item of state.inmueblesAgent.data.data){
                    if (item.id === value.id){
                        Object.assign(item, value);
                    }
                }
            }
        },
        SELECT_AGENTS_ALL:(state,data)=>{
            state.selectallAgents=data
        },
        PLANS_AGENTS_ALL:(state,data)=>{
            state.optionsPlans=[]
            data.map((item) =>{
                state.optionsPlans.push({
                    value:{
                        code:item.code,
                        id:item.id
                    },
                    text:`PLAN ${item.name.toUpperCase()}`
                })
            })
        }

    },
    actions: {

        // async createAgentMembership(ctx,data){
        //     return new Promise((resolve,reject) =>{
        //         try{
        //             let res = await axiosIns({
        //                 url: `api/auth/create-user-membership`,
        //                 method: 'post',
        //                 data:
        //             })
        //             resolve({succes:true})
        //         }catch(err){
        //             resolve({succes:false})
        //         }
        //         })
        // },

        async changePlansAgent(ctx,data){
            return new Promise(async(resolve,reject) =>{
            try{
                let res = await axiosIns({
                    url: `api/auth/all/change-plan`,
                    method: 'post',
                    data:data
                })
                resolve({succes:true})
            }catch(err){
                resolve({succes:false})
            }
            })
        },
        async getOptionsPlans({state,commit}){
            try{
                let res =  await axiosIns.get('api/auth/all/plans-all');
                commit('PLANS_AGENTS_ALL',res.data.data)

            }catch(error){
                console.error(error)
            }
        },
        async getInmueblesAgent({state},id){
            try{
                let res= await axiosIns({
                    url:`api/auth/elite/get-properties/${id}`,
                    method:'get'
                })
                state.inmueblesAgent=res
            }catch(error){
                console.error(error)
            }
        },
        getInmueblesAgentFilter(ctx, { params,id }) {
            return new Promise((resolve, reject) => {
              axiosIns({
                url: `api/auth/elite/get-properties/${id}`,
                method: 'get',
                params
              }).then(res => {
                ctx.state.inmueblesAgent=res;
                resolve(true);
              }).catch(err => {
                console.error(err)
                resolve(false);
              });
            });
          },
        getAgents(ctx, { data, params }) {
            return new Promise(resolve => {
                axiosIns({
                    url: 'api/auth/kwcolombia',
                    method: 'post',
                    params,
                    data
                }).then(res => {
                    ctx.commit("SET_AGENTS", res.data.data);
                    resolve(true);
                })
                    .catch(err => {
                        resolve(false);
                    });
            });
        },

        async getAllAgents(ctx, { data, params }) {
            // try {
            //     let res = await axiosIns({
            //         url: 'api/auth/all/agent',
            //         method: 'post',
            //         params:params,
            //     }
            //     )
            //     state.allAgents =res.data.data
            // } catch (error) {
            //     console.error(error)
            // }

            axiosIns({
                    url: 'api/auth/all/agent',
                    method: 'post',
                    params,
                    data
                }).then(res => {
                    ctx.state.allAgents= res.data.data;
                })
                    .catch(err => {
                });
        },
        
    },
}
