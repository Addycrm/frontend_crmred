<template>
  <b-container fluid>
    <b-card>
      <div id="bar">
        <b-button variant="primary" v-on:click="ajax">Guardar diseño</b-button>
      </div>
    </b-card>
    <b-card style="height: 1000px">
      <EmailEditor
        style="height: 100%"
        :appearance="appearance"
        min-height="1000px"
        :project-id="projectId"
        :locale="locale"
        ref="emailEditor"
        v-on:load="editorLoaded"
      />
    </b-card>
  </b-container>
</template>

<script>
import { BButton, BContainer, BCard } from "bootstrap-vue";
import { EmailEditor } from "vue-email-editor";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

let user = JSON.parse(localStorage.getItem("userData"));

export default {
  name: "app",
  components: {
    EmailEditor,
    BButton,
    BContainer,
    BCard,
  },

  data() {
    return {
      minHeight: "",
      locale: "es",
      projectId: 0,
      tools: {
        image: {
          enabled: false,
        },
      },
      options: {},
      appearance: {
        theme: "dark",
        panels: {
          tools: {
            dock: "right",
          },
        },
      },
    };
  },

  directives: {
    Ripple,
  },

  methods: {
    editorLoaded() {
      // Pass your template JSON here
      //this.$refs.emailEditor.editor.loadDesign({});
    },

    ajax() {
      this.$swal({
        title: "Ingresa el nombre de tu diseño",
        input: "text",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Registrar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm(login) {
          if (!login) {
          }
        },
      }).then((result) => {
        if (result.value) {
          this.exportHtml(result.value);
        }
      });
    },

    exportHtml(titulo) {
      this.$refs.emailEditor.editor.exportHtml((data) => {
        var json = data.design;
        var html = data.html;

        this.$store
          .dispatch("appMercadeo/addMercadeo", {
            html_json: json,
            html: html,
            tipo: "html",
            titulo: titulo,
            user_id: user.id,
          })
          .then((response) => {
            this.$toast({
              component: ToastificationContent,
              position: "top-center",
              props: {
                title: "Muy bien!!",
                icon: "CoffeeIcon",
                variant: "success",
                text: ``,
              },
            });

            this.$router.push({ name: "list-email" });
          })
          .catch((error) => {
          });
      });
    },
  },
};
</script>

<style scoped>
.unlayer-editor {
  flex: 1;
  display: flex;
}
</style>
