export default {
  data() {
    return {
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      fields: [
        { key: "logo", label: "logo" },
        { key: "nombre", label: "Nombre" },
        { key: "email", label: "Email" },
        { key: "nit", label: "nit", width: "6em" },
        { key: "celular", label: "Celular" },
        { key: "direccion", label: "direccion" },
      ],
      items: [],
    };
  },
  computed: {
    appInmobiliaria() {
      let data = this.$store.state.appInmobiliaria.users;
      this.totalRows = data.length;
      return data;
    },

    sortOptions() {
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
  },
  created() {
    this.getEstados();
  },

  methods: {
    getEstados() {
      this.$store
        .dispatch("appInmobiliaria/getInmobiliaria")
        .then((response) => {
        })
        .catch((error) => {
        });
    },

    openModal(modal, row) {
      if (!modal.prop) Object.assign(modal, { prop: {} });

      if (modal.footer == undefined) Object.assign(modal, { footer: true });

      if (row) {
        Object.assign(modal.prop, { row });

        if (modal.prop.inputs)
          for (let prop in modal.prop.inputs)
            Object.assign(modal.prop.inputs[prop], {
              value: row[prop] && row[prop].id ? row[prop].id : row[prop],
            });
      } else {
        for (let prop in this.modalForm) this.modalForm[prop].value = null;
      }
      Object.assign(
        this.modal,
        {
          state: true,
        },
        modal
      );
    },

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
