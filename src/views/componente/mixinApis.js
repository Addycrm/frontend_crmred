export default {
    setup() {
        return {
            api: []
        }
    },
    mounted() {
        this.initApis(this.api);
    },
    methods: {
        async initApis(apis) {
            for (let item of apis) {
                const { api, data, start, then, end,params } = item;
                if (start) start();
                await this.$store.dispatch(api, item.data)
                    .then(() => { if (then) then() });
                if (end) end();
            }
        },
    }
}
