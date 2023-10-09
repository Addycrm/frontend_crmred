<template>
  <div id="Plantillas">
    <b-row>
      <b-col>
        <b-form-radio-group v-model="value" @change="setRadio($event)" id="template" name="template" stacked>
          <b-row class="m-n1 pb-2">
            <div class="p-1 cols-sm-12 cols-md-4 center_card" v-for="(item, index) in templates" :key="item.id">
              <b-form-radio class="card-input" :value="{mercadeo: item.id, template: item.template}">
                <div class="thumbnails">
                  <img :src="item.url" class="img-fluid" />
                </div>
                <div class="title">
                  <h2>
                    {{item.name}}
                  </h2>
                  <span class="check">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>
                  </span>
                </div>
              </b-form-radio>
            </div>
            <!-- <transition name="fade">
            </transition> -->
          </b-row>
        </b-form-radio-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show_select: false,
        show: true,
        show_loading: false,
        send_now: true,
        loading: false,
        title: "",
        body: "",
        send_date: "",
        isBusy: false,
        isBusyMessage: false,
        item: "now",
        search: "",
        selected: [],
        data: [],
        dir: "ltr",
        value: null
      };
    },
    props: ['mercadeo_id', 'type'],
    model: {
      prop: 'mercadeo_id',
      event: 'send'
    },
    watch:{
      type(){
        this.value = {
          mercadeo: this.templates[0].id,
          template: this.templates[0].template
        }
        this.setRadio(this.value);
      },
    },
    computed: {
      MercadeoAdmin(){
        return this.$store.state.appMercadeoAdmin;
      },
      templates() {
        let radios = this.MercadeoAdmin.mercadeo_admin;
        return radios.filter(item => item.mercadeo_type.id == this.type);
      },
    },
    methods:{
      setRadio(value){
        const {mercadeo, template} = value;
        this.$emit('send', {mercadeo, template});
      },
    },
  };
</script>

<style>
  .card-input.custom-control {width: 100%;padding: 0!important;margin: 0!important;box-shadow: 3px 3px 10px #00000026;border-radius: 10px;overflow: hidden;}
  .card-input.custom-control input {display: none;}
  .card-input.custom-control .custom-control-label {display: flex;flex-direction: column;}
  .card-input.custom-control .custom-control-label::before, .card-input.custom-control .custom-control-label::after {display: none;}
  .card-input.custom-control .custom-control-label .thumbnails {position: relative;z-index: 1;overflow: hidden;padding-top: 70%;}
  .card-input.custom-control .custom-control-label .thumbnails img {position: absolute;top: 0;left: 0;  width: 100%; height: 100%; object-fit: cover; object-position: top center; transition: all ease 0.6s;}
  .card-input.custom-control .custom-control-label:hover .thumbnails img {object-position: bottom center;}
  .card-input.custom-control .custom-control-label .title {padding: 1rem 1.5rem;position: relative;border-top: 1px solid #c0c0c0;}
  .card-input.custom-control .custom-control-label .title h2 {font-size: 18px;margin: 0;margin-right: 2rem;padding-right: 1rem;min-height: 2rem;display: flex;flex-direction: column;justify-content: center;}
  .card-input.custom-control .custom-control-label .check {display: block;position: absolute;width: 2rem;height: 2rem;border-radius: 3rem;border: 1px solid #c0c0c0;right: 1.5rem;top: 1rem;color: transparent;transition: all ease 0.4s;}
  .card-input.custom-control .custom-control-label .check svg {padding: 0.4rem;fill: currentColor;}
  .card-input.custom-control input:checked+.custom-control-label .check {background: var(--success);border-color: mintcream;color: #fff;}
  #template .card-input.custom-control .custom-control-label::before {content: '';display: block;position: absolute;inset: 0;box-shadow: inset 0 0 0 3px var(--success)!important;width: auto;height: auto;z-index: 2;background: transparent;border: none;border-radius: 10px;opacity: 0;transition: all ease 0.4s;pointer-events: none;}
  #template .card-input.custom-control input:checked+.custom-control-label::before {opacity: 1;}
  
  @media(max-width:470px){
    .center_card{
      margin: auto;
    }
  }
</style>