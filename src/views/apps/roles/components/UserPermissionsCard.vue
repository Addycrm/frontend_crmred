<template>
  <b-card no-body>
    <div>
      <b-card
        class="border mb-0"
        v-for="perm in permission_role"
        v-bind:key="perm.id"
        @click="getData(perm)"
      >
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          v-b-toggle="'collapse-' + perm.id"
          size="sm"
          variant="outline-primary"
        >
          {{ perm.subject }}
        </b-button>

        <b-collapse :id="'collapse-' + perm.id" class="mt-2">
          <b-card class="border mb-0">
            <div class="demo-inline-spacing">
              <b-form-checkbox
                v-for="data in perm.actions"
                v-bind:key="data.id"
                v-bind:value="data.id"
                v-model="value"
                disabled
              >
                {{ data.action }}
              </b-form-checkbox>
            </div>
          </b-card>
        </b-collapse>
      </b-card>
    </div>
    <!-- <b-card-body>
      <b-card-title>Permissions</b-card-title>
      <b-card-sub-title
        >Permission according to roles</b-card-sub-title
      > </b-card-body
    >{{ roles }}

    <app-collapse hover>
      <span>
        <app-collapse-item :title="perm.subject" @click="getData(perm)">
          <div class="demo-inline-spacing">
            <b-form-checkbox
              v-for="data in perm.actions"
              v-bind:key="data.id"
              :value="data"
              v-model="getData"
            >
              {{ data.action }}
            </b-form-checkbox>
          </div>
        </app-collapse-item>
      </span>
    </app-collapse> -->
  </b-card>
</template>

<script>
import {
  BCard,
  BTable,
  BCardBody,
  BCardTitle,
  BCardSubTitle,
  BButton,
  BCardText,
  BFormCheckbox,
  VBToggle,
  BCollapse,
} from "bootstrap-vue";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BCard,
    BTable,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    BButton,
    BFormCheckbox,
    AppCollapse,
    BCardText,
    BCollapse,
    AppCollapseItem,
  },

  directives: {
    "b-toggle": VBToggle,
    Ripple,
  },

  data() {
    return {
      permission_role: [],
      currentRole: "",
      currentPerms: [],
      value: null,
    };
  },

  props: {
    roles: {
      type: Object,
      required: true,
    },
  },

  created() {
    this.getPermissions(this.roles.id);
  },

  methods: {
    getPermissions(code) {
      this.$store
        .dispatch("appRole/getModules", code)
        .then((response) => {
          this.permission_role = response.permissions;
        })
        .catch((data) => {
        });
    },

    comparer(otherArray) {
      return function (current) {
        return (
          otherArray.filter(function (other) {
            return (
              other.value == current.value && other.display == current.display
            );
          }).length == 0
        );
      };
    },

    getData(event) {
      let subject = this.roles.permissions.find(
        (element) => element.id == event.id
      );

      let data = [];

      for (let i = 0; i < subject.actions.length; i++) {
        data.push(subject.actions[i].id);
      }

      this.value = data;
    },
  },
};
</script>