<template>
  <div class="sidebar-left" :class="{ show }">
    <div class="sidebar">
      <div class="sidebar-content todo-sidebar">
        <div class="todo-app-menu">
          <div class="add-task" id="tour-card">
            <b-button variant="primary" block @click="$emit('sideBar')">
              Agregar Tarea
            </b-button>
          </div>
          <div class="sidebar-menu-list pb-2">
            <b-list-group class="list-group-filters">
              <b-list-group-item
                v-for="filter in taskFilters"
                :key="filter.title + $route.path"
                :to="filter.route"
                :active="isDynamicRouteActive(filter.route)"
                @click="$emit('close-left-sidebar')"
              >
                <feather-icon :icon="filter.icon" size="18" class="mr-75" />
                <span class="align-text-bottom line-height-1">{{
                  filter.title
                }}</span>
              </b-list-group-item>
            </b-list-group>
            <div class="my-2 px-2">
              <h6 class="section-label mb-1">Etiquetas</h6>
              <b-button-group class="d-flex">
                <b-button @click="clearFilter" variant="secondary" size="sm">
                  Limpiar
                </b-button>
                <b-button v-b-modal.modal-etiquetas variant="success" size="sm">
                  Agregar
                </b-button>
              </b-button-group>
            </div>
            <b-list-group class="list-group-labels">
              <b-list-group-item v-for="tag in taskTags" :key="tag.id">
                <b-form-checkbox
                  :value="tag.value"
                  v-model="tags"
                  @change="valueTags"
                  :class="`text-${variantState(tag.value)}`"
                  plain
                >
                  <span
                    class="bullet bullet-sm mr-1"
                    :class="`bullet-${variantState(tag.value)}`"
                  />
                  <span>{{ tag.label }}</span>
                </b-form-checkbox>
              </b-list-group-item>
            </b-list-group>
          </div>
          <b-modal
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            ok-title="Registrar"
            cancel-title="Cancelar"
            id="modal-etiquetas"
            title="Registro de Etiquetas"
          >
            <b-form ref="form" @submit.stop.prevent="handleSubmit">
              <b-form-group
                id="input-group-1"
                label="Titulo Etiqueta:"
                label-for="input-1"
                description=""
              >
                <b-form-input
                  id="input-1"
                  v-model="form.titulo"
                  type="text"
                  placeholder="Escribe el nombre de la etiqueta"
                  required
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isDynamicRouteActive } from "@core/utils/utils";
//import AppTour from "@core/components/app-tour/AppTour.vue";

export default {
  data() {
    return {
      form: {
        titulo: "",
        id_user: "",
      },
      tags: [],
    };
  },
  props: {
    taskTags: {
      type: Array,
      default: () => [],
    },
    tag: Array,
    show: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "tag",
    event: "change",
  },
  methods: {
    clearFilter() {
      this.tags = [];
      this.$emit("clear");
    },
    valueTags() {
      this.$emit("change", this.tags);
    },
    variantState(tag) {
      switch (tag) {
        case "alto":
          return "danger";
          break;
        case "medio":
          return "warning";
          break;
        case "bajo":
          return "success";
          break;
        case "actualizado":
          return "info";
          break;
        case "equipo":
          return "primary";
          break;
        default:
          return "secondary";
      }
    },
    // tour steps
    resetModal() {
      this.form.titulo = "";
    },

    handleOk(bvModalEvt) {
      this.$store
        .dispatch("appTareas/addEtiquetasRegister", { label: this.form.titulo })
        .then((res) => {
          this.$store.commit("appConfiguracion/SET_TAG", res.etiquetas);

          // this.$store.dispatch("appTareas/fetchEtiquetas").then(() => {});
        });

      this.handleSubmit();
    },

    handleSubmit() {
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },

  setup() {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
    };

    const taskFilters = [
      { title: "Mis tareas", icon: "MailIcon", route: { name: "apps-todo" } },
      {
        title: "Importantes",
        icon: "StarIcon",
        route: { name: "apps-todo-filter", params: { filter: "important" } },
      },
      {
        title: "Completadas",
        icon: "CheckIcon",
        route: { name: "apps-todo-filter", params: { filter: "completed" } },
      },
      {
        title: "Eliminadas",
        icon: "TrashIcon",
        route: { name: "apps-todo-filter", params: { filter: "deleted" } },
      },
    ];

    return {
      perfectScrollbarSettings,
      taskFilters,
      isDynamicRouteActive,
    };
  },
};
</script>
<style>
.sidebar-menu-list {
  overflow-y: auto;
  padding-bottom: 1.5rem;
}
.todo-application
  .content-area-wrapper
  .sidebar
  .todo-sidebar
  .todo-app-menu
  .list-group
  .list-group-item
  .form-check {
  padding: 0;
}
.todo-application
  .content-area-wrapper
  .sidebar
  .todo-sidebar
  .todo-app-menu
  .list-group
  .list-group-item
  .form-check
  label {
  color: inherit;
  padding: 0.5rem;
  padding-right: 2rem;
  margin: -0.3rem -0.5rem;
  border-radius: 4px;
  display: block;
  cursor: pointer;
  position: relative;
  transition: all ease 0.2s;
}
.todo-application
  .content-area-wrapper
  .sidebar
  .todo-sidebar
  .todo-app-menu
  .list-group
  .list-group-item
  .form-check
  label
  span {
  color: #5e5873;
}
.todo-application
  .content-area-wrapper
  .sidebar
  .todo-sidebar
  .todo-app-menu
  .list-group
  .list-group-item
  .form-check
  input {
  display: none;
}
.todo-application
  .content-area-wrapper
  .sidebar
  .todo-sidebar
  .todo-app-menu
  .list-group
  .list-group-item
  .form-check
  input:checked
  + label {
  box-shadow: inset 0 0 0 1px currentColor;
}
.todo-application
  .content-area-wrapper
  .sidebar
  .todo-sidebar
  .todo-app-menu
  .list-group
  .list-group-item
  .form-check
  label::after {
  content: "⨯";
  font-size: 1.5em;
  line-height: 1em;
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: all ease 0.2s;
  color: currentColor;
}
.todo-application
  .content-area-wrapper
  .sidebar
  .todo-sidebar
  .todo-app-menu
  .list-group
  .list-group-item
  .form-check
  input:checked
  + label::after {
  opacity: 1;
}
</style>
<style lang="scss">
@import "@core/scss/vue/libs/tour.scss";
</style>
