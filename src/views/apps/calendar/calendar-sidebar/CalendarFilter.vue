<template>
  <b-row id="CalendarFilter" class="mx-n2 flex-column">
    <b-col cols="auto" class="p-2">
      <h5 class="app-label section-label mb-1">
        <span class="align-middle">Agentes</span>
      </h5>
      <b-form-checkbox :checked="filter.assignee.all" @change="allToggle('assignee', $event)" :indeterminate="filter.assignee.state" class="mb-1 custom-control-info">
        {{filter.assignee.all ? 'Deseleccionar todo' : 'Seleccionar todo'}}
      </b-form-checkbox>
      <b-form-group>
        <b-form-checkbox-group
          :checked="filter.assignee.value"
          name="assignee"
          stacked
          @change="$store.commit('appCalendar/SET_VALUE_FILTER', {props: 'assignee', prop: 'value', value: $event})"
        >
          <b-form-checkbox
            v-for="item in assignee"
            :key="item.id"
            :value="item.id"
            class="mb-1 custom-control-primary"
          >
            {{ item.primer_nombre }}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
    </b-col>
    <b-col cols="auto" class="p-2">
      <h5 class="app-label section-label mb-1">
        <span class="align-middle">Tipos de citas</span>
      </h5>
      <b-form-checkbox :checked="filter.t_cita.all" name="" @change="allToggle('t_cita', $event)" :indeterminate="filter.t_cita.state" class="mb-1 custom-control-info">
        {{filter.t_cita.all ? 'Deseleccionar todo' : 'Seleccionar todo'}}
      </b-form-checkbox>
      <b-form-group>
        <b-form-checkbox-group
          :checked="filter.t_cita.value"
          name="t_cita"
          stacked
          @change="$store.commit('appCalendar/SET_VALUE_FILTER', {props: 't_cita', prop: 'value', value: $event})"
        >
          <b-form-checkbox
            v-for="item in t_cita"
            :key="item.id"
            :value="item.id"
            class="mb-1"
            :class="`custom-control-${item.color}`"
          >
            {{ item.label }}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'CalendarFilter',
  props: {
    t_cita:{
      type: Array,
      default: () => []
    },
    assignee:{
      type: Array,
      default: () => []
    },

  },
  computed:{
    filter(){
      return this.$store.state.appCalendar.calendars.filter
    }
  },
  mounted(){
    this.watchFilters();
  },
  methods:{
    commitSetValueFilter(props, prop, value){
      this.$store.commit('appCalendar/SET_VALUE_FILTER', {props, prop, value});
    },
    watchFilters(){
      for(let props in this.filter){
        this.$watch(() => this.filter[props].value,
        (a) => {
          this.$store.commit('appCalendar/SET_FILTER');
          if (a.length === 0) {
            this.commitSetValueFilter(props, 'state', false);
            this.commitSetValueFilter(props, 'all', false);
          } else if (a.length === this[props].length) {
            this.commitSetValueFilter(props, 'state', false);
            this.commitSetValueFilter(props, 'all', true);
          } else {
            this.commitSetValueFilter(props, 'state', true);
            this.commitSetValueFilter(props, 'all', false);
          }
        })
      }
    },
    allToggle(props, checked){
      this.$store.commit('appCalendar/SET_VALUE_FILTER', {
        props,
        prop: 'value',
        value: checked ? this[props].map(item => item.id) : []
      });
    }
  }
}
</script>
<style>
  #CalendarFilter {
    height: 1px;
    flex-grow: 1;
    flex-wrap: nowrap;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>