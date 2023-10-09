<template>
    <div>
        <b-nav-item-dropdown right toggle-class="d-flex align-items-center dropdown-user-link" class="dropdown-user">
            <template #button-content>
                <div style="gap:1rem;" v-if="selectPlan" class="d-flex align-items-center">
                    <div v-if="selectPlan.id == 1" class="d-flex align-items-center">
                        <img width="100"
                            src="https://res.cloudinary.com/reality-inmo/image/upload/v1689801971/blanco_iobcnv.png" />

                    </div>
                    <div>
                        <span class=" font-weight-bolder">Membresia</span>
                        <span class="d-flex align-items-center">
                            <span v-html="selectPlan.iconSvg">
                            </span>
                            <span style="font-size: 12px;">
                                {{ selectPlan.code }}
                            </span>
                        </span>
                    </div>
                </div>
            </template>
            <b-dropdown-item @click="showPlans()">
                Ver más planes
            </b-dropdown-item>
        </b-nav-item-dropdown>
    </div>
</template>

<script>
export default {
    name: "stateMembership",
    data() {
        return {
            selectPlan: null,
            dicMembership: [
                {
                    id: 1,
                    code: 'ELITE',
                    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chess-queen" width="30" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffb743" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M16 16l2 -11l-4 4l-2 -5l-2 5l-4 -4l2 11" />
                        <path d="M8 16l-1.447 .724a1 1 0 0 0 -.553 .894v2.382h12v-2.382a1 1 0 0 0 -.553 -.894l-1.447 -.724h-8z" />
                        <path d="M12 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        <path d="M6 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        <path d="M18 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    </svg>`
                },
                {
                    id: 2,
                    code: 'ESTANDAR',
                    iconSvg: `
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-b" width="30" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffb743" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M10 16h2a2 2 0 1 0 0 -4h-2h2a2 2 0 1 0 0 -4h-2v8z" />
                    <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                    </svg>
                    `

                },
                {
                    id: 3,
                    code: 'GRATIS',
                    iconSvg: `
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-g" width="30" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffb743" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M14 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1" />
                    <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                    </svg>
                    `

                },

                {
                    id: 4,
                    code: 'PROFESIONAL',
                    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chess-queen" width="30" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffb743" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M16 16l2 -11l-4 4l-2 -5l-2 5l-4 -4l2 11" />
                        <path d="M8 16l-1.447 .724a1 1 0 0 0 -.553 .894v2.382h12v-2.382a1 1 0 0 0 -.553 -.894l-1.447 -.724h-8z" />
                        <path d="M12 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        <path d="M6 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        <path d="M18 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    </svg>`

                }
            ]
        }
    },
    computed: {
        userData() {
            return this.$store.state.userData.userData;
        }
    },
    mounted() {
        this.selectPlan = this.dicMembership.find((item) => {
            return item.code === this.userData.payment_plans.code
        })
    },
    methods: {
        showPlans() {
            this.$router.push({ name: "plan-membership" });
        }
    }
}
</script>

<style scoped>
.cls-1 {
    fill: #ffffff;
}

.cls-2 {
    fill: #ffffff;
}

.cls-3 {
    fill: #ffffff;
}

.logoKW {
    width: 40px;
    height: 20px;
}

@media (min-width:600px) {
    .logoKW {
        width: 60px;
        height: 30px;
    }
}</style>
