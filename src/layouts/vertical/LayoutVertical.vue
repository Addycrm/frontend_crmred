<template>
  <div>
    <b-overlay :show="!state" no-wrap fixed :z-index="9999">
      <template #overlay>
        <div class="d-flex align-items-center">
          <b-spinner  style="width: 3rem; height: 3rem;" type="grow" variant="primary"></b-spinner>
        </div>
      </template>
    </b-overlay>
    <transition name="fade">
      <layout-vertical v-if="state">
        <router-view />
        <!-- <b-overlay :show="overlay" no-center>
          <template #overlay>
            <div class="d-flex d-flex p-4 justify-content-center">
              <b-spinner  style="width: 3rem; height: 3rem;" type="grow" variant="primary"></b-spinner>
            </div>
          </template>
        </b-overlay> -->
        <app-customizer v-if="showCustomizer" slot="customizer"/>
      </layout-vertical>
    </transition>
  </div>
</template>

<script>
  import {ROLES_VISITANTE } from "@/libs/config/config.js";
  import LayoutVertical from '@core/layouts/layout-vertical/LayoutVertical.vue'
  import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
  import { computed } from "@vue/composition-api";
  import { $themeConfig } from '@themeConfig'
  import mixinApis from '@/views/componente/mixinApis'

  export default {
    mixins: [mixinApis],
    components: {
      AppCustomizer,
      LayoutVertical,
    },
    setup(){
      return{
        state: false,
      }
    },
    data() {
      this.api.push({
        api: 'appConfiguracion/getOptionsSelect',
        data: {},
        then: () => {this.state = true}
      });
      
      return {
        showCustomizer: $themeConfig.layout.customizer,
      }
    },
    computed: {
      overlay(){
        return this.$store.state.appConfiguracion.overlay;
      }
    },
  }
</script>
<style>
  :not(.vs--disabled) > .vs__dropdown-toggle{background: #fff;}
  .main-menu.menu-light .navigation li a {position: relative; }
  .main-menu.menu-light .navigation li a [class*="light"]{ font-weight: 700!important; font-size: 12px!important;}
  .main-menu.menu-light .navigation li a .badge {position: absolute;font-size: 10px;padding: 0.3em 0.6em;line-height: 1;right: 0.3rem;top: 0.3rem;font-weight: 400;margin: 0!important;}
</style>