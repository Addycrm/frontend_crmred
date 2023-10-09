<template>
  <div id="TodoForm">
    <ValidationObserver ref="FormObserver">
      <ValidationProvider v-slot="{errors}" name="Titulo de tarea" rules="required">
        <b-form-group label="Titulo de tarea" class="required">
          <b-form-input
            id="task-title"
            v-model="task.title"
            autofocus
            trim
            placeholder="Escrbe e titulo de la tarea"
            :state="errors.length > 0 ? false : null"
          />
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider v-slot="{errors}" name="Fecha" rules="required">
      	<b-form-group label="Fecha" class="required" :state="!(errors.length > 0)">
          <input type="hidden" v-model="task.dueDate">
	        <flat-pickr
	          v-model="task.dueDate"
	          name="fechaInicio"
	          class="form-control"
	          :config="{enableTime: true, time_24hr: false, locale, plugins , dateFormat: 'Y-m-d h:i K' }"
	        />
      	</b-form-group>
      </ValidationProvider>
      <ValidationProvider v-slot="{errors}" name="Etiquetas" rules="required">
        <b-form-group label="Etiquetas" class="required" :state="!(errors.length > 0)">
          <v-select
            v-model="selectTag"
            :options="etiquetas"
            
          />
        </b-form-group>
      </ValidationProvider>
      <b-form-group label="Descripción Actividad">
        <div
          id="quill-toolbar"
          class="d-flex justify-content-center"
        >
          <button class="ql-bold" />
          <button class="ql-italic" />
          <button class="ql-underline" />
          <button class="ql-align" />
          <button class="ql-link" />
        </div>
        <quill-editor id="quil-content" v-model="task.description" :options="editorOption"/>
      </b-form-group>
      <b-form-group label="Asignar Asesor">
        <v-select
          v-model="task.assignee"          
          :options="storeConfig.agentes"
          :reduce="type => type.id"
          label="primer_nombre"
          class="assignee-selector"
        >
        </v-select>
      </b-form-group>
      <b-form-group label="Inmueble">
        <table v-if="task.inmueble" class="table table-striped mb-1">
          <tbody>
            <tr>
              <th scope="row">ID:</th>
              <td>{{ task.inmueble.id }}</td>
            </tr>
            <tr>
              <th scope="row">Propiedad:</th>
              <td>{{ task.inmueble.titulo_inmueble }}</td>
            </tr>
          </tbody>
        </table>
        <b-row>
          <b-col v-show="!task.inmueble" cols="auto" class="flex-grow-1">
            <b-form-input name="inmueble" placeholder="Elija un inmueble" trim readonly ></b-form-input>
          </b-col>
          <b-col cols="auto">
            <b-button variant="success" :pill="!task.inmueble" :class="{'btn-icon': !task.inmueble}" @click="openModal({component: 'TableInmueble', target: 'inmueble'})">
            	{{ !task.inmueble ? "+" : "Cambiar inmueble" }}
            </b-button>
          </b-col>
        </b-row>
      </b-form-group>
    </ValidationObserver>
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

import {ValidationProvider, ValidationObserver, setInteractionMode, extend} from "vee-validate";
import * as rules from "vee-validate/dist/rules";

import VModal from "@/views/componente/vModal";
import TableInmueble from "@/views/apps/inmuebles/inmueble-list/tableInmueble";
import moment from "moment";


export default {
	name: 'TodoForm',
  components: {
    flatPickr,
    quillEditor,
    ValidationObserver,
    ValidationProvider,
    vSelect,
    VModal,
    TableInmueble,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  watch:{
    "selectTag"(){
      this.task.tags=[]
      this.task.tags.push(this.selectTag)
    },
  },

  data() {
    setInteractionMode("eager");
    Object.keys(rules).forEach((rule) => {
      extend(rule, rules[rule]);
    });
    return {
      locale: Spanish,
      selectTag:null,
      plugins: [
        new confirmDatePlugin({
          confirmText: "Agregar",
          showAlways: true,
          theme: "dark",
        }),
      ],
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
      return this.$store.state.appConfiguracion.tags.etiquetas
    },
  },
  mounted() {
    if(this.task.tags){
      this.selectTag=this.task.tags[0]
    }
  },
  methods: {
    makeToast(text) {
      this.$bvToast.toast(text, {
        title: "Fechas no coinciden",
        variant: 'danger',
        solid: true,
      })
    },
    openModal({ state = true, component, target, id }) {
      Object.assign(this.modal, { state, component, target, id });
    },
    sendActive(e) {
      this.sendState = e;
    },
    getValue({ target, id }) {
      let value = this.$refs["tableList"].sendValue();
      Object.assign(this.task, {inmueble:value});
      this.modal.state = false;
    },
    fechaFormating(value) {
      if (value) {
        let date = moment(value).format('YYYY-MM-DD HH:mm:ss');
        return date;
      }
    },
    validateData() {
      var dateNow = moment().format('YYYY-MM-DD HH:mm:ss');
      // let dateNow = new Date()
      if(this.fechaFormating(this.task.dueDate)>=dateNow){
          return {
            state:true
          }
        }else{
          return {
            state:false,
            error: `No se puede crear la tarea para dias anteriores a la fecha actual (${dateNow})`
          }
        }
      },
    onSubmit(){
    	return new Promise(resolve => {
	    	this.$refs['FormObserver'].validate()
	    	.then(state => {
	    		if(state){
		    		let task = {};
		    		for(let prop in this.task){
		    			if(this.task[prop] != null){
                switch(prop){
                  case 'tags':
                    Object.assign(task, {[prop]:this.task[prop]})
                    break;
                  case 'dueDate':
                    const date = this.fechaFormating(this.task[prop])
                    Object.assign(task, {[prop]:date})
                    break;
                  default:
                    Object.assign(task, {[prop]: this.task[prop].id ? this.task[prop].id : this.task[prop]})
                }
              }           
            }
	    			resolve(task);
	    		}
	    	});
    	})
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
