<template>
    <b-card no-body>
        <b-card-body class="d-flex justify-content-between align-items-center">
            <div class="truncate">
                <h2 class="mb-25 font-weight-bolder">
                    {{ banco }}
                </h2>
                <span v-html="description"></span>
            </div>
            <b-avatar :variant="`light-${color}`" size="45">
                <img :src="image" alt="" srcset="">
            </b-avatar>

        </b-card-body>
        <slot></slot>
    </b-card>
</template>

<script>

export default {
    props: {
        image: {
            type: String,
            required: true,
        },
        banco: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        color: {
            type: String,
            default: 'primary',
        },
        price: {
            type: String,
            default: ""
        }
    },
}
</script>
