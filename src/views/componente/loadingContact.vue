<template>
    <div class="body">
        <svg class="icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z" />
        </svg>
        <p class="text_laoding">Cargando...</p>
        <div class="loading">
            <div class="loading-icon">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
}
.loading-icon {
    display: flex;
}

.circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--primary);
    margin: 0 5px;
    animation: bounce 1s infinite ease-in-out;
}

.body {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-direction: column;
    gap: 8px;
}

.icon_svg {
    width: 70px;
    height: 50px;
    animation: fadeOut 4s infinite linear forwards;
    fill: var(--primary);

}

.text_laoding {
    animation: fadeOut 4s infinite linear forwards;
    margin: 0;
    color: var(--primary);
    font-weight: bold;

}

@keyframes bounce {

    0%,
    80%,
    100% {
        transform: scale(0);

    }

    40% {
        transform: scale(1);
    }
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }

}</style>