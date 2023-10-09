<template>
  <div id="Todo">
    <div class="todo-app-list">
      
      <!-- App Searchbar Header -->
      <div class="app-fixed-search d-flex align-items-center">
        
        <!-- Toggler --->
        <div @click="show = !show" class="sidebar-toggle ml-1">
          <feather-icon icon="MenuIcon" size="21" class="cursor-pointer"/>
        </div>
        
        <!-- Searchbar -->
        <div class="d-flex align-content-center justify-content-between w-100">
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="SearchIcon" class="text-muted" />
            </b-input-group-prepend>
            <b-form-input v-model="filter.search" @input="filterTask" placeholder="Buscar tarea"/>
          </b-input-group>
        </div>

        <!-- Dropdown -->
        <div class="dropdown">
          <b-dropdown variant="link" no-caret toggle-class="p-0 mr-1" right>
            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body"/>
            </template>
            <b-dropdown-item @click="sortTask({prop: 'title'})">
              De la A-Z
            </b-dropdown-item>
            <b-dropdown-item @click="sortTask({prop: 'title', reverse: true})">
              De la Z-A
            </b-dropdown-item>
            <b-dropdown-item @click="sortTask({prop: 'dueDate', reverse: true})">
              Fecha proxima programada
            </b-dropdown-item>
            <b-dropdown-item @click="sortTask({prop: 'dueDate'})">
              Fecha antigua programada
            </b-dropdown-item>
            <b-dropdown-item @click="sortTask({prop: 'created_at', reverse: true})">
              Fecha de creación más reciente
            </b-dropdown-item>
            <b-dropdown-item @click="sortTask({prop: 'created_at'})">
              Fecha de creación más antigua
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <!-- CRM List -->
      <div class="todo-task-list-wrapper list-group">
        <ul v-if="task.tareas_result.length > 0" class="todo-task-list media-list">
          <li v-for="task in task.tareas_result" :key="task.id" class="todo-item d-flex flex-wrap align-items-center">
            <feather-icon icon="MoreVerticalIcon" class="draggable-task-handle mr-1"/>
            <div class="todo-title-wrapper flex-grow-1 align-items-center">
              <div v-if="task.isDeleted" class="icons btn-svg text-info btn-trash ml-1" v-b-tooltip.hover.topright="'Restaurar'" @click="taskStateIcons(false, 'isDeleted', task, 'restaurar')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 256c0 123.4-100.5 223.9-223.9 223.9c-48.86 0-95.19-15.58-134.2-44.86c-14.14-10.59-17-30.66-6.391-44.81c10.61-14.09 30.69-16.97 44.8-6.375c27.84 20.91 61 31.94 95.89 31.94C344.3 415.8 416 344.1 416 256s-71.67-159.8-159.8-159.8C205.9 96.22 158.6 120.3 128.6 160H192c17.67 0 32 14.31 32 32S209.7 224 192 224H48c-17.67 0-32-14.31-32-32V48c0-17.69 14.33-32 32-32s32 14.31 32 32v70.23C122.1 64.58 186.1 32.11 256.1 32.11C379.5 32.11 480 132.6 480 256z"/></svg>
              </div>
              <div class="todo-title-area flex-grow-1">
                <div class="title-wrapper flex-grow-1">
                  <b-form-checkbox v-if="!task.isDeleted" class="pl-0 input-none" :checked="task.isCompleted" plain @change="taskStateIcons($event, 'isCompleted', task, 'completar')">
                    <div class="icons btn-svg btn-check text-success" v-b-tooltip.hover.topright="task.isCompleted ? 'Completar' : 'Completado'">
                      <svg v-if="task.isCompleted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>
                    </div>
                  </b-form-checkbox>
                  <b-form-checkbox v-if="!task.isDeleted" class="pl-0 input-none ml-1" :checked="task.isImportant" plain @change="taskStateIcons($event, 'isImportant', task,'agregar favoritos')">
                    <div class="icons btn-svg text-warning" v-b-tooltip.hover.topright="'Importante'">
                      <svg v-if="task.isImportant" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/></svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"/></svg>
                    </div>
                  </b-form-checkbox>
                  <span class="todo-title flex-grow-1 ml-2 cursor-pointer py-1 my-n1" @click="taskClick(task)">{{ task.title }}</span>
                </div>
              </div>
              <div class="todo-item-action">
                <div class="badge-wrapper mr-1">
                  <b-badge v-for="(tag, index) in task.tags" :key="tag.id + index * index" pill :variant="`light-${variantState(tag.value)}`" class="text-capitalize">
                    {{ tag.label }}
                  </b-badge>
                </div>
                <small class="text-nowrap text-muted mr-1">{{formatDate(task.dueDate, { month: "short", day: "numeric", year: 'numeric', timeZone: 'UTC' })}}</small>
                <b-avatar
                  v-if="task.assignee"
                  size="32"
                  :src="task.assignee.avatar"
                  :variant="`light-primary`"
                  :text="avatarText(task.assignee.primer_nombre)"
                />
                <b-avatar v-else size="32" variant="light-secondary">
                  <feather-icon icon="UserIcon" size="16" />
                </b-avatar>
              </div>
              
              <div v-if="!task.isDeleted" class="icons btn-svg text-danger btn-trash ml-1" v-b-tooltip.hover.topright="'Eliminar'" @click="taskStateIcons(true, 'isDeleted', task, 'eliminar')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
              </div>
            </div>
            <div class="todo-date-create-wrapper">
              Creada: {{formatDate(task.created_at, { month: "long", day: "numeric", year: 'numeric', hourCycle: 'h12', hour: 'numeric', minute: 'numeric', second: 'numeric',})}}
            </div>
            <b-overlay class="overlay pointer-events-none" :show="task.overlay"/>
          </li>
        </ul>
        <div v-else class="no-results show">
          <div class="alert alert-primary p-2 mb-0">
            No hay tareas registradas
          </div>
        </div>
      </div>
    </div>
    <portal to="content-renderer-sidebar-left">
      <TodoLeftSidebar 
        v-model="filter.tags" 
        :show="show"
        :taskTags="tags.etiquetas" 
        @sideBar="taskClick"
        @change="filterTask" 
        @clear="clearFilter" 
      />
    </portal>
    <transition name="slide-to-left">
      <v-modal v-if="sideBar" @close="sideBar = false" :titulo="!TodoForm.task.id ? 'Crear Tarea' : 'Editar Tarea'" sideBar sideBarOverlay size="xxs" footer>
        <template #optiosnHeader>
          <div class="d-flex flex-grow-1">
            <b-button 
              @click="taskState('isImportant', TodoForm.task)"
              size="sm" :variant="TodoForm.task.isImportant ? 'warning' : 'outline-warning'" pill class="ml-1 mr-auto order-1 btn-icon d-flex justify-content-center align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '1em'}" fill="currentColor" viewBox="0 0 576 512"><path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/></svg>
            </b-button>
            <template v-if="TodoForm.task.id">
              <b-button 
                @click="taskState('isCompleted', TodoForm.task)"
                size="sm" :variant="TodoForm.task.isCompleted ? 'success' : 'outline-success'" pill class="ml-1 order-0 btn-icon d-flex justify-content-center align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '1em'}" fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>
              </b-button>
              <b-button 
                @click="removeTask(TodoForm.task)"
                size="sm" v-if="!TodoForm.task.isDeleted" variant="danger" pill class="ml-auto order-1 btn-icon d-flex justify-content-center align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '1em'}" fill="currentColor"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
              </b-button>
            </template>
          </div>
        </template>
        <TodoForm v-bind="TodoForm" ref="TodoForm"/>
        <template #footer>
          <b-button variant="success" @click="onSubmit">
            {{!TodoForm.task.id ? 'Crear Tarea' : 'Editar Tarea'}}
          </b-button>
        </template>
      </v-modal>
    </transition>
  </div>

</template>

<script>
import { formatDate, avatarText } from "@core/utils/filter";

import TodoLeftSidebar from "./TodoLeftSidebar.vue";
import TodoTaskHandlerSidebar from "./TodoTaskHandlerSidebar.vue";
import TodoForm from './TodoForm';

import VModal from "@/views/componente/vModal";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import mixinApis from '@/views/componente/mixinApis'
import mixinTask from '@/views/apps/tareas/mixinTask'

export default {

  name: 'Todo',
  mixins:[mixinApis, mixinTask],
  components:{
    TodoLeftSidebar,
    TodoTaskHandlerSidebar,
    VModal,
    TodoForm
  },
  data () {
    return {
      show: false,
      formatDate,
      avatarText,
      sideBar: false,
      TodoForm: {
        task: {
          id: null,
          order: null,
          isCompleted: false,
          isImportant: false,
          isDeleted: false,
          title: null,
          dueDate: null,
          tags: null,
          description: null,
          assignee: null,
          inmueble: null,
        },
      },
      filter: {
        search: '',
        tags: [],
      },
      apiOptions: [
        {
          api: 'appConfiguracion/getTaskTag',
          data: {}
        },
        {
          api: 'appTask/getTask',
          data: {}
        },
      ],
      optionsAlert:{}
    }
  },
  computed:{
    tags() {
      return this.$store.state.appConfiguracion.tags;
    },
  },
  mounted(){
    this.filterTask();
    this.optionsAlert= this.$swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
        },
        buttonsStyling: false
    })
  },
  watch:{
    $route(){
      this.filterTask();
    },
    'task.tareas'(){
      this.filterTask();
    },
    sideBar(a){
      if(!a)
        this.closeSideBar();
    }
  },
  methods: {
    taskClick(task = {}){
      let key = Object.keys(this.TodoForm.task);
      for(let i in key){
        if(task[key[i]]){
          switch(key[i]){
            case 'assignee':
              this.TodoForm.task[key[i]] = task[key[i]].id;
              break;
            default:
              this.TodoForm.task[key[i]] = task[key[i]];
          }
        }

        if(i == (key.length - 1))
          this.sideBar = true;
      }
    },
    closeSideBar(){
      for(let prop in this.TodoForm.task){
        switch(prop){
          case 'isCompleted':
          case 'isImportant':
          case 'isDeleted':
            this.TodoForm.task[prop] = false;
            break;
          default:
            this.TodoForm.task[prop] = null;
        }
      }

    },
    taskState(state, task){
      Object.assign(task, {[state]: !task[state]});
    },
    sortTask({prop, reverse}){
      this.task.tareas_result.sort((a, b) => {
        if(!reverse)
          return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
        else
          return a[prop] < b[prop] ? 1 : a[prop] > b[prop] ? -1 : 0;
      });
    },
    onSubmit(){
      const value = this.$refs['TodoForm'].validateData()
      if(value.state){
        this.$refs['TodoForm'].onSubmit()
          .then(res => {
            if(res.id)
              this.updateTask(res, {});
            else
              this.createTask(res);
          });
      }else{
        this.$refs['TodoForm'].makeToast(value.error)
      }
      
    },
    taskStateIcons(states, prop, task,title){
        for(let prop in this.TodoForm.task)
          if(task[prop] != null)
            Object.assign(task, {[prop]: task[prop].id ? task[prop].id : task[prop]})
        this.optionsAlert.fire({
        title: "CAMBIAR ESTADO",
        text: `Estas seguro de ${title} la tarea?`,
        icon: 'question',
        showCloseButton: true,
        confirmButtonText: 'Aceptar',
        reverseButtons: true
        }).then((result) => {
          if(result.isConfirmed){
            this.updateTask(task, {states, prop});
            Object.assign(task, {overlay: true});
          }
        })
    },
    createTask(data){
      this.$store.dispatch('appTask/createTask', data)
      .then(state => {
        if(state){

          this.$toast({
            component: ToastificationContent,
            position: "top-center",
            props: {
              title: 'Tarea creada',
              icon: "CheckCircleIcon",
              variant: "success",
              text: 'Tu tarea fue creada exitosamente',
            },
          });
          this.filterTask();
          this.sideBar = false;
        }else{

          this.$toast({
            component: ToastificationContent,
            position: "top-center",
            props: {
              title: 'Algo salio mal',
              icon: "AlertCircleIcon",
              variant: "danger",
              text: 'Si el problema persiste actualiza la pagina o comunicate con soporte',
            },
          });
        }
      });
    },
    updateTask(task, {states = false, prop}){
      task[prop] = states;
      this.$store.dispatch('appTask/updateTask', task)
      .then(state => {
        if(state){

          this.$toast({
            component: ToastificationContent,
            position: "top-center",
            props: {
              title: 'Tarea actualizada',
              icon: "CheckCircleIcon",
              variant: "success",
              text: 'Tu tarea fue actualizada exitosamente',
            },
          });
          this.filterTask();
          this.sideBar = false;
        }else{

          this.$toast({
            component: ToastificationContent,
            position: "top-center",
            props: {
              title: 'Algo salio mal',
              icon: "AlertCircleIcon",
              variant: "danger",
              text: 'Si el problema persiste actualiza la pagina o comunicate con soporte',
            },
          });
        }      
      });
    },
    alertDelete(title){
      this.optionsAlert.fire({
        title: "CAMBIAR ESTADO",
        text: `Estas seguro de ${title} la tarea?`,
        icon: 'question',
        showCloseButton: true,
        confirmButtonText: 'Aceptar',
        reverseButtons: true
        }).then((result) => {
          return (result.isConfirmed) ?true:false
        })
    },
    removeTask(task){
      this.optionsAlert.fire({
        title: "CAMBIAR ESTADO",
        text: `Estas seguro de eliminar la tarea?`,
        icon: 'question',
        showCloseButton: true,
        confirmButtonText: 'Aceptar',
        reverseButtons: true
        }).then((result) => {
          if(result.isConfirmed){
            this.$store.dispatch('appTask/removeTask', { id: task.id })
            .then(state => {
              if(state){
      
                this.$toast({
                  component: ToastificationContent,
                  position: "top-center",
                  props: {
                    title: 'Tarea eliminada',
                    icon: "CheckCircleIcon",
                    variant: "success",
                    text: 'Tu tarea fue enviadada a la papelera exitosamente',
                  },
                });
                this.filterTask();
                this.sideBar = false;
              }else{
      
                this.$toast({
                  component: ToastificationContent,
                  position: "top-center",
                  props: {
                    title: 'Algo salio mal',
                    icon: "AlertCircleIcon",
                    variant: "danger",
                    text: 'Si el problema persiste actualiza la pagina o comunicate con soporte',
                  },
                });
              }
            });
          }
        })
    },
    
    clearFilter(){
      Object.assign(this.filter, {
        search: '',
        tags: [],
      });
      this.filterTask();
    },
    
    variantState(tag){
      switch(tag){
        case 'alto':
          return 'danger';
          break;
        case 'medio':
          return 'warning';
          break;
        case 'bajo':
          return 'success';
          break;
        case 'actualizado':
          return 'info';
          break;
        default:
          return 'primary'
      }
    },
    filterTask(){
      let {search, tags} = this.filter;
      let result = this.task.tareas;
      
      if(search)
        result = result.filter(item => item.title.indexOf(search) != -1 ? true : false);

      if(tags.length > 0){
        result = result.filter(item => {
          let array = [];

          for(let {value} of item.tags){
            if(tags.indexOf(value) != -1)
              array.push(value);
          }

          return array.length > 0;
        });
      }

      let filter = this.$route.params.filter;
      switch(filter){
        case 'important':
          result = result.filter(item => item.isImportant && !item.isDeleted);
          break;
        case 'completed':
          result = result.filter(item => item.isCompleted && !item.isDeleted);
          break;
        case 'deleted':
          result = result.filter(item => item.isDeleted);
          break;
        default:
          result = result.filter(item => !item.isDeleted && !item.isCompleted);
      }

      this.$store.commit("appTask/SET_TAREAS_RESULT", result);
    },
  }
}
</script>
<style>
  #Todo {position: relative; height: 100%; background: #fff;}
  #Todo .app-fixed-search {position: sticky;top: 0;z-index: 9;}
  #Todo .todo-task-list-wrapper {overflow-y: auto;}
  #Todo .todo-task-list-wrapper .icons {cursor: pointer; color: #777;}
  #Todo .todo-task-list-wrapper .icons.btn-svg svg {width: 1.25em;height: 1em;font-size: 16px; fill:currentColor;transition: all ease 0.4s;display: block;}
  .input-none input {display: none;}
  .input-none label {display: block;}
  .todo-application .content-area-wrapper .content-right .todo-task-list-wrapper .todo-task-list li{cursor: auto!important;}
  #Todo .todo-task-list-wrapper .overlay{position: absolute!important;inset: 0; pointer-events: none;}
  #Todo .todo-task-list-wrapper .overlay .b-overlay {pointer-events: auto;}
  .todo-date-create-wrapper {width: 100%;font-size: 10px;opacity: 0.6;margin-top: 7px;}
  @media(min-width: 1140px){
    .sidebar-toggle{
      display: none;
    }
  }
</style>
<style lang="scss">
@import "~@core/scss/base/pages/app-todo.scss";
</style>
