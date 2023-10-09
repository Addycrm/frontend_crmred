<template>
    <div class="container__loading">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="70" height="60" class="icon__house">
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
        </svg>
        <p class="icon__title">Cargando...</p>
        <div class="loader" style=""></div>
    </div>
</template>

<style scoped>
.container__loading{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.icon__house{
    fill: var(--primary);
}
.icon__title{
    margin: 0;
    color: var(--primary);
    font-weight: bold;
}
.loader {
    border-radius:40px;
    width: calc(5 * (15px + 8px) - 8px);
    height: 30px;
    padding:8px;
    margin: 5px auto;
    border: 1px solid;
    color: var(--primary);
    background:repeating-linear-gradient(90deg,var(--primary) 0 15px,var(--primary) 0 calc(15px + 8px)) left / calc((5 + 1) * (15px + 8px)) 100% no-repeat content-box;
    animation: load 1.5s steps(calc(14 + 1)) infinite;
}

@keyframes load {
    0% {
        background-size: 0% 100%
    }
}

</style>