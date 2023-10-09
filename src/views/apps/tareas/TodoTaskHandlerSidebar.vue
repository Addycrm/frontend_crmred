<template>
  <div>
    <b-sidebar
      @show="setTask()"
      id="sidebar-task-handler"
      sidebar-class="sidebar-lg"
      :visible="isTaskHandlerSidebarActive"
      bg-variant="white"
      shadow
      backdrop
      no-header
      right
      @change="setTask($event)"
    >
      <template #default="{ hide }">
        <!-- Header --->
        <div class="d-flex align-items-center content-sidebar-header px-2 py-1">
          <div
            v-if="taskLocal.id"
            class="icons btn-svg btn-check"
            :class="{'text-success': taskLocal.isCompleted}"
            @click="isCompleted"
          >
            <svg v-if="taskLocal.isCompleted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>
          </div>
          <h5 class="mb-0 ml-1 mr-auto">{{taskLocal.id ? 'Editar Tarea' : 'Agregar Tarea'}}</h5>
          <div
            class="icons btn-svg mr-1"
            :class="{ 'text-warning': taskLocal.isImportant }"
            @click="() => taskLocal.id ? isImportant() : taskLocal.isImportant = !taskLocal.isImportant"
          >
            <svg v-if="taskLocal.isImportant" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"/></svg>
          </div>
          <div v-if="taskLocal.id && !taskLocal.isDeleted" class="icons btn-svg text-danger btn-trash mr-1" @click="removeTask">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
          </div>
          <div>
            <feather-icon
              class="ml-1 cursor-pointer"
              icon="XIcon"
              size="16"
              @click="hide"
            />
          </div>
        </div>

        <!-- Body -->
        <ValidationObserver v-slot="{ handleSubmit }">
          <!-- Form -->
          <b-form class="p-2" @submit.prevent="handleSubmit(onSubmit)">
            <!-- Title -->
            <ValidationProvider v-slot="{errors}" name="Titulo de tarea" rules="required">
              <b-form-group label="Titulo de tarea" class="required">
                <b-form-input
                  id="task-title"
                  v-model="taskLocal.title"
                  autofocus
                  trim
                  placeholder="Escrbe e titulo de la tarea"
                  :state="errors.length > 0 ? false : null"
                />
              </b-form-group>
            </ValidationProvider>

            <!-- Referido -->

            <!-- due Date -->
            <b-form-group label="Fecha" class="required">
              <flat-pickr
                v-model="taskLocal.dueDate"
                name="fechaInicio"
                class="form-control"
                :config="{enableTime: true, time_24hr: false, locale, plugins}"
              />
              <ValidationProvider v-slot="{errors}" name="Fecha" rules="required">
                <input type="hidden" v-model="taskLocal.dueDate">
              </ValidationProvider>
            </b-form-group>
            

            <!--Tag -->
            <ValidationProvider v-slot="{errors}" name="Etiquetas" rules="required">
              <b-form-group label="Etiquetas" class="required" :state="!(errors.length > 0)">
                <v-select
                  v-model="taskLocal.tags"
                  :options="etiquetas"
                  :closeOnSelect="false"
                  multiple
                />
              </b-form-group>
            </ValidationProvider>

            <!-- Description -->
            <b-form-group label="Descripción Actividad">
              <div
                id="quill-toolbar"
                class="d-flex justify-content-center"
              >
                <!-- Add a bold button -->
                <button class="ql-bold" />
                <button class="ql-italic" />
                <button class="ql-underline" />
                <button class="ql-align" />
                <button class="ql-link" />
              </div>
              <quill-editor id="quil-content"v-model="taskLocal.description" :options="editorOption"/>
            </b-form-group>

            <b-form-group label="Asignar Asesor">
              <v-select
                v-model="taskLocal.assignee"          
                :options="storeConfig.agentes"
                label="primer_nombre"
                class="assignee-selector"
              >
              </v-select>
            </b-form-group>
            <b-form-group label="Inmueble">
              <table v-if="taskLocal.inmueble" class="table table-striped mb-1">
                <tbody>
                  <tr>
                    <th scope="row">ID:</th>
                    <td>{{ taskLocal.inmueble.id }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Propiedad:</th>
                    <td>{{ taskLocal.inmueble.titulo_inmueble }}</td>
                  </tr>
                </tbody>
              </table>
              <b-row>
                <b-col v-show="!taskLocal.inmueble" cols="auto" class="flex-grow-1">
                  <b-form-input
                    name="inmueble"
                    placeholder="Elija un inmueble"
                    trim
                    readonly
                  ></b-form-input>
                </b-col>
                <b-col cols="auto">
                  <b-button
                    variant="success"
                    @click="
                      openModal({
                        component: 'TableInmueble',
                        target: 'inmueble',
                      })
                    "
                    >{{ !taskLocal.inmueble ? "+" : "Cambiar inmueble" }}</b-button
                  >
                </b-col>
              </b-row>
            </b-form-group>

            <!-- Form Actions -->
            <div class="d-flex mt-2">
              <b-button
                variant="primary"
                class="mr-2"
                type="submit"
              >
                {{ taskLocal.id ? "Actualizar" : "Agregar " }}
              </b-button>

            </div>
          </b-form>
        </ValidationObserver>
      </template>
    </b-sidebar>
    <transition name="fade">
      <v-modal v-if="modal.state" @close="modal.state = false" :titulo="'Seleccionar ' + modal.target" size="lg" footer >
        <components :is="modal.component" elegir ref="tableList" @sendActive="sendActive"/>
        <template #footer>
          <b-button variant="success" @click="getValue(modal)" :disabled="sendState">
            Seleccionar
          </b-button>
        </template>
      </v-modal>
    </transition>
  </div>
</template>

<script>

import vSelect from "vue-select";
import { quillEditor } from "vue-quill-editor";
import flatPickr from "vue-flatpickr-component";
import confirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";
import { Spanish } from "flatpickr/dist/l10n/es.js";

import formValidation from "@core/comp-functions/forms/form-validation";
import { toRefs } from "@vue/composition-api";
import useTaskHandler from "./useTaskHandler";

import {ValidationProvider, ValidationObserver, setInteractionMode, extend} from "vee-validate";
import * as rules from "vee-validate/dist/rules";

import VModal from "@/views/componente/vModal";
import TableInmueble from "@/views/apps/inmuebles/inmueble-list/tableInmueble";

export default {
  components: {
    flatPickr,
    quillEditor,
    ValidationObserver,
    ValidationProvider,
    vSelect,
    VModal,
    TableInmueble,
  },
  model: {
    prop: "isTaskHandlerSidebarActive",
    event: "update:is-task-handler-sidebar-active",
  },
  props: {
    isTaskHandlerSidebarActive: {
      type: Boolean,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
    clearTaskData: {
      type: Function,
      required: true,
    },
  },
  data() {
    setInteractionMode("eager");
    Object.keys(rules).forEach((rule) => {
      extend(rule, rules[rule]);
    });
    return {
      locale: Spanish,
      plugins: [
        new confirmDatePlugin({
          confirmText: "Agregar",
          showAlways: true,
          theme: "dark",
        }),
      ],
      taskLocal: {
        id: null,
        isCompleted: null,
        isImportant: null,
        isDeleted: null,
        title: null,
        dueDate: null,
        tags: null,
        description: null,
        assignee: null,
        inmueble: null,
      },
      sendState: true,
      modal: {
        state: false,
        component: null,
        target: null,
        id: null,
      },
      editorOption: {
        modules: {
          toolbar: "#quill-toolbar",
        },
        placeholder: "Escribe una nota",
      }
    };
  },
  computed: {
    storeConfig(){
      return this.$store.state.appConfiguracion.options
    },
    etiquetas() {
      return this.$store.state.appTask.etiquetas;
    },
  },
  mounted(){
  },

  methods: {
    setTask(value){
      this.$emit('update:is-task-handler-sidebar-active', value);
      for(let prop in this.taskLocal){
        this.task.id ?
        this.taskLocal[prop] = this.task[prop] :
        this.taskLocal[prop] = null;
      }
    },
    onSubmit(){
      let {taskLocal, $emit} = this;
      if (taskLocal.id)
        $emit('updateTask', taskLocal);
      else
        $emit('addTask', taskLocal);
    },
    openModal({ state = true, component, target, id }) {
      Object.assign(this.modal, { state, component, target, id });
    },
    sendActive(e) {
      this.sendState = e;
    },
    getValue({ target, id }) {
      let value = this.$refs["tableList"].sendValue();
      Object.assign(this.taskLocal, {inmueble:value});
      this.modal.state = false;
    },
    removeTask(){
      this.$emit('removeTask', this.taskLocal);
    },
    isCompleted(){
      this.taskLocal.isCompleted = !this.taskLocal.isCompleted;
    },
    isImportant(){
      this.taskLocal.isImportant = !this.taskLocal.isImportant;
    },
    getUsuarios() {
      this.$store.dispatch("appUser/fetchUsers").then(() => {});      
    },

    getInmuebles() {
      this.$store.dispatch("apiInmueblePrivate/getInmueblesList").then(() => {});
    },

  },
};
</script>
<style>
.flatpickr-confirm.darkTheme {
  background: var(--success);
  color: #fff;
  padding: 5px 15px !important;
  cursor: pointer;
}
.flatpickr-confirm.darkTheme svg {
  margin-left: 10px;
}
.flatpickr-confirm.darkTheme svg * {
  fill: currentColor;
}
#sidebar-task-handler .icons {cursor: pointer; color: #777;}
#sidebar-task-handler .icons.btn-svg svg {width: 1.25em;height: 1.25em;font-size: 18px; fill:currentColor;transition: all ease 0.4s;}
#sidebar-task-handler .icons.btn-svg.btn-check svg {font-size: 20px;}
#sidebar-task-handler .icons.btn-svg.btn-trash svg {font-size: 15px;}
</style>
