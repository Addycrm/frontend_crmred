<template>
    <b-modal :id="infoModal.id" :ref="infoModal.id" hide-footer size="lg"  ok-title=""
        cancel-title="Cancelar" centered no-close-on-backdrop>
        <b-img width="80" src="https://res.cloudinary.com/reality-inmo/image/upload/v1689621066/8297354_dqxm9v.png"></b-img>
        <p> Por favor <strong>confirma la transacción en tu celular</strong> cuando te llegue la
            <strong>notificación</strong>
        </p>
        <p>Si no te ha llegado, <strong>verifica que tengas Nequi instalado</strong> en tu celular y que ya estes registrado
        </p>
        <h4>{{ minutes }}:{{ seconds }}</h4>

    </b-modal>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            minutes: 10,
            seconds: 0,
            timer: null,
            infoModal: {
                id: "modal-with-timer",
            },
        };
    },

    mounted() {
        this.startTimer()
    },

    methods: {

        startTimer() {
            this.timer = setInterval(() => {
                if (this.seconds > 0) {
                    this.seconds--;
                } else {
                    if (this.minutes > 0) {
                        this.minutes--;
                        this.seconds = 59;
                    } else {
                        this.hideModal();
                    }
                }
            }, 1000);
        },
        showModal() {
            this.$refs[this.infoModal.id].show()
        },
        hideModal() {
            this.$refs[this.infoModal.id].hide()
        },
        resetTimer() {
            clearInterval(this.timer);
            this.minutes = 1;
            this.seconds = 0;
        },
        closeModal() {
            clearInterval(this.timer);
            this.show = false;
            // Aquí puedes realizar cualquier acción adicional al cerrar el modal.
        }
    }
};
</script>
