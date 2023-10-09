import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
    data() {
        this.api.push({
            api: 'appPortales/fetchPortales',
            data: {}
        })
    },
    computed: {
        appPortal() {
            return this.$store.state.appPortales;
        },
        localidades_ciencuadra() {
            return this.$store.state.appPortales.localidades_ciencuadra;
        },
    },
    methods: {
        linkPortal(portal, url) {
            let link = null;
            for (let item of url) {
                if (portal.id === item.portal_id.id)
                    link = item.url;
            }
            if (link) {
                Object.assign(portal, { link });
                return true;
            } else {
                return false
            }
        },
        statePortal(state, portal, codes) {
            let sync = null,
                codigo = null;

            for (let index in state) {
                if (state[index].id_portal === portal.id)
                    sync = state[index];
            }

            if (sync) {
                for (let index in codes) {
                    if (codes[index].id_portal === sync.id_portal)
                        codigo = codes[index];
                }
            }

            if (sync) {
                Object.assign(portal, { sync, codigo });
                return true;
            } else {
                return false
            }
        },
        notification(sync) {
            this.$toast({
                component: ToastificationContent,
                props: {
                    title:
                        sync == 'create' ? 'Inmueble Sincronizado' :
                            sync == 'update' ? 'Inmueble Actualizado' :
                                'Inmueble Despublicado'
                    ,
                    icon: "CheckCircleIcon",
                    text:
                        sync == 'create' ? 'Tu Inmueble ha sido publicado exitosamente' :
                            sync == 'update' ? 'Tu Inmueble ha sido actualizado exitosamente' :
                                'Tu Inmueble ha sido despublicado exitosamente'
                    ,
                    variant: "success",
                },
            });
        },

        async dataPortal(sync, value) {
            this.$store.commit('appPortales/STATE_OVERLAY', true);
            let { inmueble, portal, name, slug, localidad } = value;
            let message = ' Tu Inmueble ha sido publicado exitosamente en este portal, puedes verlo en 1 Hora habilitado.';
            switch (slug) {
                case process.env.MIX_FINCARRAIZ:
                    Object.assign(value, {
                        config:
                            sync == 'create' ?
                                {
                                    methods: 'get',
                                    url: `api/auth/portales/fincarraiz/${inmueble.id}`,
                                } :
                                sync == 'update' ?
                                    {
                                        methods: 'get',
                                        url: `api/auth/portales/fincarraiz/${inmueble.id}`,
                                    } :
                                    {
                                        methods: 'get',
                                        url: `api/auth/fincarraiz/despublicar/${inmueble.id}`,
                                    }
                    });
                    break;
                //  El Pais
                case process.env.MIX_MERCADOLIBRE:
                    Object.assign(value, {
                        config:
                            sync == 'create' ?
                                {
                                    methods: 'get',
                                    url: `api/auth/portales/mercadolibre/sincronizar/${inmueble.id}`,
                                } :
                                sync == 'update' ?
                                    {
                                        methods: 'get',
                                        url: `api/auth/portales/mercadolibre/update/${inmueble.id}`,
                                    } :
                                    {
                                        methods: 'get',
                                        url: `api/auth/portales/mercadolibre/despublicar/${inmueble.id}`,
                                    }
                    });
                    break;
                case process.env.MIX_CLASIFICADO_PAIS:
                    Object.assign(value, {
                        config:
                            sync == 'create' ?
                                {
                                    methods: 'get',
                                    url: `api/auth/service/pais/sincronizar/${inmueble.id}`,
                                } :
                                sync == 'update' ?
                                    {
                                        methods: 'get',
                                        url: `api/auth/service/pais/update/${inmueble.id}`,
                                    } :
                                    {
                                        methods: 'get',
                                        url: `api/auth/service/pais/desactivar/${inmueble.id}`,
                                    }
                    });
                    break;
                // Metro Cuadrado
                case process.env.MIX_METROCUADRADO:
                    Object.assign(value, {
                        config:
                            sync == 'create' ?
                                {
                                    methods: 'get',
                                    url: `api/auth/service/metro_cuadrado/${inmueble.id}`,
                                } :
                                sync == 'update' ?
                                    {
                                        methods: 'get',
                                        url: `api/auth/service/metro_cuadrado/update/${inmueble.id}`,
                                    } :
                                    {
                                        methods: 'get',
                                        url: `api/auth/service/metro_cuadrado/despublicar/${inmueble.id}`,
                                    }
                    });
                    break;
                // Ciencuadras
                case process.env.MIX_CIENCUADRA:
                    Object.assign(value, {
                        config:
                            sync == 'create' ?
                                {
                                    method: 'post',
                                    url: `api/auth/service/cienciuadra`,
                                    data: { inmueble: inmueble.id, localidad },
                                } :
                                sync == 'update' ?
                                    {
                                        method: 'post',
                                        url: `api/auth/service/cienciuadra/update`,
                                        data: { inmueble: inmueble.id, localidad },
                                    } :
                                    {
                                        method: 'get',
                                        url: `api/auth/service/cienciuadra/desactivar/${inmueble.id}`,
                                        data: { inmueble: inmueble.id, localidad },
                                    }
                    });
                    break;
                case process.env.MIX_PROPPIT:
                    message = ' Tu Inmueble ha sido publicado exitosamente en este portal, puedes verlo en 24 Horas habilitado.'
                    Object.assign(value, {
                        config:
                            sync == 'create' ?
                                {
                                    methods: 'get',
                                    url: `api/auth/prippit/publicar/${inmueble.id}`,
                                } :
                                sync == 'update' ?
                                    {
                                        methods: 'get',
                                        url: `api/auth/prippit/publicar/${inmueble.id}`,
                                    } :
                                    {
                                        methods: 'get',
                                        url: `api/auth/prippit/publicar/${inmueble.id}`,
                                    }
                    });
                    break;
            }

            let { config, status } = value;

            // if(sync == 'delete')
            // this.$parent.closeModal();
            await this.$store.dispatch('appPortales/syncPortal', config)
                .then(({ state, data }) => {
                    let options = {
                        confirmButtonText: "Cerrar",
                        buttonsStyling: false,
                    };
                    if (state) {

                        if (this.$options.name == 'StatePortales' && sync == 'delete')
                            this.$parent.closeModal();

                        Object.assign(options, {
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-success",
                            }
                        },
                            sync == 'create' ?
                                {
                                    title: "Inmueble Sincronizado",
                                    text: message,
                                } :
                                sync == 'update' ?
                                    {
                                        title: "Inmueble Actualizado",
                                        text: ' Tu Inmueble ha sido actualizado exitosamente en este portal, puedes verlo en 24 Horas con la información actualizada.',
                                    } :
                                    {
                                        title: "Inmueble Despublicado",
                                        text: 'Tu Inmueble ha sido despublicado exitosamente de este portal',
                                    }
                        );
                        let { portale_state_inmueble, portales_codigo_response, portales_urls } = data;
                        Object.assign(inmueble, { portale_state_inmueble, portales_codigo_response, portales_urls });
                    } else {
                        Object.assign(options, {
                            title: "Algo ha ocurrido",
                            text: "Estimado usuario. Por favor validar la informacion suministrada en el inmueble. Si el problema persiste contactar al area de soporte.",
                            icon: "error",
                            customClass: {
                                confirmButton: "btn btn-danger",
                            }
                        });
                    }

                    this.$swal(options);
                });
            this.$store.commit('appPortales/STATE_OVERLAY', false);
        },
        async getLocalidadesCiencuadra(city) {
            await this.$store.dispatch("appPortales/getLocalidadesCiencuadra", city);
        },


        async syncPortal(sync, value, name) {
            let { ciudad_id } = value.inmueble;
            let options = {
                title:
                    sync == 'create' ? 'Sincronizar Inmueble' :
                        sync == 'update' ? 'Actualizar Inmueble' :
                            'Despublicar Inmueble'
                ,
                text:
                    sync == 'create' ? '¿Desea sincronizar el inmueble en este portal?' :
                        sync == 'update' ? '¿Desea actualizar el inmueble en este portal?' :
                            '¿Desea despublicar el inmueble de este portal?'
                ,
                icon:
                    sync == 'create' ? 'info' :
                        sync == 'update' ? 'question' :
                            'warning'
                ,
                icon: sync ? 'info' : 'warning',
                showCancelButton: true,
                customClass: {
                    confirmButton: `btn btn-${sync == 'create' ? 'info' :
                        sync == 'update' ? 'success' :
                            'warning'
                        }`,
                    cancelButton: 'btn btn-danger ml-1',
                },
                confirmButtonText:
                    sync == 'create' ? 'Sincronizar' :
                        sync == 'update' ? 'Actualizar' :
                            'Despublicar'
                ,
                cancelButtonText: 'Cancelar',
                buttonsStyling: false,
            };

            if (value.slug == process.env.MIX_CIENCUADRA && sync == 'create') {
                await this.getLocalidadesCiencuadra(ciudad_id.id);
                Object.assign(options, {
                    input: 'select',
                    inputOptions: this.localidades_ciencuadra,
                    inputPlaceholder: 'Selecciona una localidad',
                    inputValidator: (localidad) => {
                        return new Promise((resolve) => {
                            if (localidad) {
                                Object.assign(value, { localidad });
                                resolve()
                            } else {
                                resolve('Debes de elegir una localidad')
                            }
                        })
                    }
                });
            }
            this.$swal(options).then(state => {
                if (state.isConfirmed)
                    this.dataPortal(sync, value, name);
            });


        },

    }
}
