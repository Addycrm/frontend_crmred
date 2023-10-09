<template>
    <div>
        <b-row>
            <b-col lg="3" sm="6" v-for="(ban, index) in bancks" :key="index">
                <statistic-card-horizontal :image="ban.image" color="success" :banco="ban.name"
                    :description="ban.description">

                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary"
                        @click="info($event.targuet, ban.component, ban.id)">Pagar ${{ price_banck }} COP</b-button>
                </statistic-card-horizontal>
            </b-col>
            <formNequi :price="propsSelect" :ref="bancos.NEQUI.component"></formNequi>
            <formBancolombia :ref="bancos.BANCOLOMBIA.component"></formBancolombia>
        </b-row>
        <div>

        </div>
    </div>
</template>
<script>
import StatisticCardHorizontal from "@/views/componente/StatisticCardHorizontal.vue";

import formNequi from "@/views/apps/perfil/perfil-edit/formBancos/formNequi.vue";
import formBancolombia from "@/views/apps/perfil/perfil-edit/formBancos/formBancolombia.vue";

import BANCOS from "../bancos.js";
import Ripple from 'vue-ripple-directive'

export default {
    directives: {
        Ripple,
    },
    components: {
        StatisticCardHorizontal,
        formNequi,
        formBancolombia
    },
    props: {
        propsSelect: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            bancos: JSON.parse(JSON.stringify(BANCOS))
        }
    },
    created() {
        this.getBancks()
        this.getPlanForId()
    },
    computed: {
        bancks() {
            return this.$store.state.appBancks.bancks;
        },

        price_banck() {
            return this.$store.getters['appBancks/getPrice'];
        }
    },
    methods: {
        info(button, component, code) {
            return this.$refs[component].info(button, code);
        },

        async getPlanForId() {
            await this.$store.dispatch("appBancks/getPlanForId", this.propsSelect).then(() => { }).catch(() => { });
        },

        async getBancks() {
            await this.$store.dispatch("appBancks/getBancks")
                .then(() => {
                }).catch(err => {
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                            icon: "AlertCircleIcon",
                            title: 'Algo ha ocurrido',
                            text: err.response.data.message[prop][0],
                            variant: "danger",
                        },
                    }, {
                        timeout: 4000
                    });

                });
        }

    }
}
</script>
<style></style>
