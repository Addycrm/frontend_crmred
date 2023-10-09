<template>
  <div id="RolesPermisos">
    <b-container>
      <b-overlay :show="overlay">
        <b-card v-for="(item, index) in goodTable" :key="index">
          <template #header>
            <h2 class="mb-0 mr-2">
              {{item.titulo}}
            </h2>
            <div class="d-flex align-items-center mr-auto" v-if="item.btn">
              <b-button class="text-nowrap d-flex align-items-center" size="md" :variant="item.btn.variant" @click="openModal(item.btn.modal)">
                <span class="align-middle">{{item.btn.texto}}</span>
              </b-button>
            </div>
          </template>
          <VueGoodTable
          styleClass="vgt-table striped"
          v-bind="item.tabla"
          :search-options="{
            enabled: true,
            placeholder: 'Buscar...'
          }"
          >
          <template
          slot="table-row"
          slot-scope="props"
          >
            <!-- <p v-if="props.column.field === 'roles'">
              {{ getRol() }}
            </p> -->
              <span v-if="props.column.field === 'foto_persona'">
                <b-avatar size="70px" variant="light">
                  <template v-if="props.row['foto_persona']">
                    <cld-image
                      v-if="props.row['foto_persona'].indexOf('cloudinary') != -1"
                      :public-id="props.row['foto_persona'] | urlImages"
                      class="img-fluid mx-auto d-block"
                    >
                      <cld-transformation fetch-format="png" />
                      <cld-transformation gravity="face" height="70" width="70" zoom="0.4" crop="thumb" />
                      <cld-transformation radius="300" />
                    </cld-image>
                    <img
                      v-else-if="props.row['foto_persona'].indexOf('googleusercontent') != -1"
                      :src="props.row['foto_persona']"
                      class="img-fluid mx-auto d-block"
                    />
                  </template>
                  <cld-image v-else :public-id="props.row['genero'] == 2 ? 'default/photo-default-male_elbsty' : 'default/photo-default-female_aqhcir'" class="img-fluid mx-auto d-block">
                    <cld-transformation fetch-format="png" />
                    <cld-transformation gravity="face" height="70" width="70" zoom="0.4" crop="thumb" />
                    <cld-transformation radius="300" />
                  </cld-image>
                </b-avatar>
              </span>
              <span v-else-if="props.column.field === 'primer_nombre'">
                <div v-b-tooltip.hover class="title-tab" :title="props.row['primer_nombre']">
                  {{props.row['primer_nombre']}}
                </div>
              </span>
              <span v-else-if="props.column.field === 'roles'">
                <!-- <div v-b-tooltip.hover class="title-tab" :title="props.row['roles'].nombre">
                  {{props.row['roles'].nombre}}
                </div> -->
              </span>
              <span v-else-if="props.column.field === 'actions'" class="d-flex flex-wrap">
                <b-badge :style="{margin: '5px'}" variant="light-primary" v-for="item in props.row['actions']" :key="item.id">
                  {{item.title}}
                </b-badge>
              </span>
              <span v-else-if="props.column.field === 'genero'" class="d-flex flex-wrap">
                <b-badge
                  v-if="props.formattedRow[props.column.field]"
                  :variant="
                    props.row.genero.id == 2 ? 'light-info' : 'light-danger'
                  "
                >
                  {{ props.row.genero.name }}
                </b-badge>
              </span>
              <span v-else-if="props.column.field === 'settings'" class="d-flex">
                <template v-for="(btn, index) in item.config.btn">
                  <b-button
                    v-b-tooltip.hover.left
                    pill
                    :title="btn.texto"
                    :variant="btn.variant"
                    @click="openModal(btn.modal, props.row)" :key="index"
                    class="btn-icon d-flex justify-content-center align-items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '14px'}" fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"/></svg>
                  </b-button>
                </template>
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </VueGoodTable>
        </b-card>
      </b-overlay>
    </b-container>
    <transition name="fade">
      <v-modal v-if="modal.state" @close="modal.state = false" :titulo="modal.titulo" :size="modal.size" :footer="modal.footer">
        <component :is="modal.is" v-bind="modal.prop" ref="modal"/>
        <template #footer>
          <b-overlay :show="overlay">
            <b-button @click="onSubmit" variant="success" :disabled="overlay">
              {{modal.prop.row ? 'Guardar' : 'Crear'}}
            </b-button>
          </b-overlay>
        </template>
      </v-modal>
    </transition>
  </div>
</template>

<script>
  import mixinApis from '@/views/componente/mixinApis'
  import VModal from "@/views/componente/vModal"
  import { VueGoodTable } from 'vue-good-table'
  import FormUser from '@/views/apps/user/users-list/FormUser'
  export default {
    name: 'UserList',
    mixins:[mixinApis],
    components: {
      VModal,
      VueGoodTable,
      FormUser
    },
    data () {
      return {
        overlay: false,
        modal: {
          state: false,
        },
        apiOptions: [
          {
            api: 'appUser/getUsers',
            data: {}
          },
          {
            api: 'appUser/getRolesUsers',
            data: {}
          },
        ]
      }
    },
    computed: {
      appUsers(){
        return this.$store.state.appUser
      },
      // getRol() {
      //   return this.goodTable.tabla.row.roles
      // },
      goodTable(){
        return [
          {
            titulo: 'Agentes',
            btn: {
              texto: 'Crear Agente',
              variant: 'info',
              modal: {
                titulo: 'Crear Agente',
                is: 'FormUser',
              }
            },
            config: {
              prop: '',
              btn: [{
                variant: 'success',
                texto: 'Editar Agente',
                modal: {
                  titulo: 'Editar Agente',
                  is: 'FormUser',
                }
              }],
            },
            tabla: {
              columns: [
                {tdClass:'align-middle', field: "id", label: "ID", width:'6em'},
                {tdClass:'align-middle', field: "foto_persona", label: "Foto", width:'80px'},
                {tdClass:'align-middle', field: "primer_nombre", label: "Agente", width: '18em'},
                {tdClass:'align-middle', field: "email", label: "Email"},
                {tdClass:'align-middle', field: "genero", label: "Género"},
                {tdClass:'align-middle', field: "roles", label: "Rol"},
                {tdClass:'align-middle', field: "settings", label: "Ajustes", width: '8em'},
              ],
              rows: this.appUsers.users,
            }
          }
        ]
      }
    },
    mounted(){
      this.initApis(this.apiOptions);
    },
    methods: {
      async onSubmit(){
        this.overlay = true;
        await this.$refs['modal'].onSubmit()
        .then(state => {
          this.modal.state = !state;
        });
        this.overlay = false;
      },
      openModal(modal, row){
        if(modal.footer == undefined)
          Object.assign(modal,{footer: true});

        if(!modal.prop)
          Object.assign(modal,{prop:{}});

        if(row)
          Object.assign(modal.prop, {row});

        Object.assign(this.modal, {
          state: true
        }, modal);
      },
    }
  }
</script>
