<template lang="">
    <b-form-radio-group class="templateBg" @change="setBgImg">
        <section class="bgContainer">
                <p class="bgContainer__title">
                    {{ title }}
                </p>
                <article class="bgContainer__optionCon">
                    <b-form-radio v-for="bg in imgBgs" :key="bg.id" :value="bg.id" class="card-input">
                            <figure v-if="bg.name === 'Casa'" class="thumbnails" id="casaSvg" >
                                <span v-html="bg.url" ref="svgContainer" ></span>
                            </figure>
                            <figure v-if="bg.name !== 'Casa'" class="thumbnails" >
                                <img :src="bg.url" :alt="bg.name">
                            </figure>
                            <div :id="convertNameToId(bg.name)" class="title" >
                                    <h2>{{bg.name}}</h2>
                                    <span class="check">
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        >
                                        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                        <path
                                            d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"
                                        />
                                        </svg>
                                    </span>
                            </div>
                    </b-form-radio>
                </article>
        </section>
        <!-- <b-button class="btn-save" variant="success"size="md">Guardar fondo</b-button> -->
    </b-form-radio-group>
</template>
<script>
export default {
    name: "BgAgent",
    props: {
        option: {
            type: Number,
            required: false
        },
        imgBgs: {
            type: Array,
            required: false
        },
    },
    data(){
      return{
        // imgBgs: []
      }  
    },
    emits: ["setBg"],
    watch: {
        // option(){
        //     console.log(this.option);
        //     const bgs = this.perfilesItems.find(bg => bg.id == this.option)
        //     console.log(bgs.perfiles_background);
        //     this.imgBgs = bgs.perfiles_background  
        // } 
    },
    computed:{
        title(){
            if (this.option === 1) {
                return "Selecciona el fondo que deseas para la plantilla 1"
            } else if(this.option === 3){
                return "Selecciona el fondo que deseas para la plantilla 2"
            }
        },
        // imgBgs(){
        //     const bgs = this.perfilesItems.filter(bg => bg.id == this.option)
        //     console.log(bgs);
        //     return bgs.perfiles_background  
        // }
    },
    methods: {
        convertNameToId(name){
            return name.replace(" ", "")
        },
        setBgImg(id){
            const bgSelected = this.imgBgs.find(bg => bg.id == id)
            this.$emit("setBg", bgSelected)
        },
    }
}
</script>
<style lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .templateBg{
        width: 100%;
    }
    .bgContainer{
        padding: 12px;
        &__title{
            margin-bottom: 12px;
            font-size: 16px;
            font-weight: 500;
        }
        &__optionCon{
            display: flex;
            gap: 20px;
            width: 100%;
            padding-bottom: 10px;
            overflow: auto;           
        }
    }

    .card-input.custom-control {
        position: relative;
        flex: 0 0 50%;
        max-width: 50%;
        height: 160px;
        padding: 12px;
        border-radius: 10px;
        box-shadow: 3px 3px 10px #00000026;
        overflow: hidden;
    }
    .card-input.custom-control .custom-control-label {
        width: 100%;
    }
    .card-input.custom-control .custom-control-label .thumbnails {
        position: absolute;
        top: -2px;
        left: -2px;
        width: 230px;
        height: 102px;
        padding-top: 10px;
        padding-left: 20px;
        background-color: #f8f8f8;
    }
    #casaSvg {
        position: absolute;
        top: -2px;
        left: -2px;
        width: 58%;
        background-color: #f8f8f8;
    }
    #circuloTechSvg {
        position: absolute;
        top: -3px;
        left: -3px;
        width: 69%;
        padding-top: 0px;
        padding-left: 85px;
        background-color: #f8f8f8;
    }
    .card-input.custom-control .custom-control-label .thumbnails img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: all ease 1s;
    }
    .card-input.custom-control .custom-control-label .title, #cTechId {
        position: absolute;
        bottom: 20px;
    }
    .card-input.custom-control .custom-control-label .title h2, #cTechId h2 {
        font-size: 18px;
        font-weight: 500;
    }
    .card-input.custom-control .custom-control-label .check {
        position: absolute;
        top: -3px;
        left: 96px;
        display: block;
        width: 2rem;
        height: 2rem;
        border-radius: 3rem;
        border: 1px solid #c0c0c0;
        color: transparent;
        transition: all ease 0.4s;
    }
    #CirculoTech .check {
        left: 120px;
    }
    #Casa .check {
        left: 60px;
    }
    .card-input.custom-control .custom-control-label .check svg {
        padding: 0.4rem;
        fill: currentColor;
    }
    .card-input.custom-control input:checked + .custom-control-label .check {
        background: var(--success);
        border-color: mintcream;
        color: #fff;
    }

    .btn-save{
        padding: 4px;
        float: right;
    }

    @media screen and (min-width: 768px) {
        .bgContainer{
        &__optionCon{
            grid-template-columns: 1fr 1fr;            
        }
    }
    }

</style>