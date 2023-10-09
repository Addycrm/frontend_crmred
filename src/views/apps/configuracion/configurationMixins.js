export default {

  computed: {
    userdata() {
      return this.$store.state.userData.userData;
    },

    configur() {
      return this.$store.state.appConfiguracion.configuracion;
    },

    dominio() {
      return this.$store.state.appConfiguracion.dominio;
    },

    paises() {
      return this.$store.state.appLocalidades.paises;
    },
    estados() {
      return this.$store.state.appLocalidades.estados;
    },

    ciudad() {
      return this.$store.state.appLocalidades.ciudades;
    },

    generarSlug: {
      get() {
        this.configuracion.slug = this.configuracion.nombre;
        this.configuracion.slug = this.configuracion.slug
          .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ")
          .toLowerCase();
        this.configuracion.slug = this.configuracion.slug.replace(
          /^\s+|\s+$/gm,
          ""
        );
        this.configuracion.slug = this.configuracion.slug.replace(/\s+/g, "-");
        this.configuracion.slug = this.configuracion.slug.replace("&/g", "y");

        return this.configuracion.nombre;
      },
      set(newValue) {
        this.configuracion.nombre = newValue;
      },
    },
    slug: function () {
      this.configuracion.slug = this.sanitizeTitle(this.configuracion.nombre);
      return this.configuracion.slug;
    },
  },

  data() {
    return {
      // dominio:'crmaddy.online',
      tabIndex: 1,
      loading: "",
      imageData: "",
      imageDataPortada: "",
      file: "",
      payLoad: null,
      correos: [],
      numeros: [],
      snowOption: {
        modules: {
          toolbar: "#quill-toolbar",
        },
        placeholder:
          "En este apartado, escribe toda la descripción necesaria para tus clientes.",
        // readOnly: true,
      },
      descripcion: null,
      social: {},
      nextTodoId: 2,
      nextTodoIdNumero: 2,

      socialInputs: [
        {
          icon: "LinkedinIcon",
          dataField: "linkedin",
          label: "linkedin",
        },
        {
          icon: "FacebookIcon",
          dataField: "facebook",
          label: "facebook",
        },
        {
          icon: "InstagramIcon",
          dataField: "instagram",
          label: "instagram",
        },
      ],
      itemsCorreo: [
        {
          id: 1,
          selected: "male",
          selected1: "designer",
          prevHeight: 0,
          correo: "",
        },
      ],
      itemsNumero: [
        {
          id: 1,
          selected: "male",
          selected1: "designer",
          prevHeight: 0,
          numero: "",
        },
      ],

      componentKey: 0,
      configuracion: {
        id: null,
        logo: null,
        email: null,
        genero: null,
        nombre: null,
        slug: null,
        slogan: null,
        nit: null,
        pagina_web: null,
        razon_social: "",
        direccion: "",
        latitud: null,
        longitud: null,
        email: null,
        celular: null,
        descripcion: "",
        id_pais: null,
        id_ciudad: null,
        id_estado: null,
        linkedin: "",
        facebook: "",
        instagram: "",
        color_primario: "",
        color_secundario: "",
        font_color: "",
        complete: "",
        mision: "",
        vision: "",
      },

      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      markers: [],
      places: [],
      results: null,
    };
  },

  mounted() {
    this.geolocate();
    this.initTrHeight();
  },

  created() {
    window.addEventListener("resize", this.initTrHeight);
    this.getPaises();
    this.getEmpresa();
  },

  destroyed() {
    window.removeEventListener("resize", this.initTrHeight);
  },

  methods: {
    sanitizeTitle: function (title) {
      if (title != null) {
        var slug = "";
        // Change to lower case
        var titleLower = title.toLowerCase();
        // Letter "e"
        slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, "e");
        // Letter "a"
        slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, "a");
        // Letter "o"
        slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, "o");
        // Letter "u"
        slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, "u");
        // Letter "d"
        slug = slug.replace(/đ/gi, "d");
        // Trim the last whitespace
        slug = slug.replace(/\s*$/g, "");
        // Change whitespace to "-"
        slug = slug.replace(/\s+/g, "-");

        /*   # % & * { } \ : < > ? / +  */

        slug = slug.replace("&", "y");
      } else {
        slug = "";
      }

      return slug;
    },

    initTrHeight() {
      this.trSetHeight(null);
      this.$nextTick(() => { });
    },

    getEmpresa() {
      this.$store
        .dispatch("appConfiguracion/getEmpresa")
        .then((response) => {
          if (response == null) {
          } else {
            localStorage.setItem("empresa", JSON.stringify(response));
            this.configuracion = {
              id: response.id,
              logo: response.logo == "null" ? "" : response.logo,
              email: response.email == "null" ? "" : response.email,
              celular: response.celular == "null" ? "" : response.celular,

              genero: response.genero == "null" ? "" : response.genero,
              nombre: response.nombre == "null" ? "" : response.nombre,
              nit: response.nit == "null" ? "" : response.nit,
              dv: response.dv == "null" ? "" : response.dv,

              telefono: response.telefono == "null" ? "" : response.telefono,
              descripcion:
                response.descripcion == "null" ? "" : response.descripcion,
              direccion: response.direccion == "null" ? "" : response.direccion,
              pagina_web:
                response.pagina_web == "null" ? "" : response.pagina_web,
              razon_social:
                response.razon_social == "null" ? "" : response.razon_social,
              id_pais: response.id_pais == "null" ? "" : response.id_pais,
              id_estado: response.id_estado == "null" ? "" : response.id_estado,
              id_ciudad: response.id_ciudad == "null" ? "" : response.id_ciudad,
              facebook: response.facebook == "null" ? "" : response.facebook,
              instagram: response.instagram == "null" ? "" : response.instagram,
              linkedin: response.linkedin == "null" ? "" : response.linkedin,
              color_primario:
                response.color_primario == "null"
                  ? ""
                  : response.color_primario,
              color_secundario:
                response.color_secundario == "null"
                  ? ""
                  : response.color_secundario,
              font_color:
                response.font_color == "null" ? "" : response.font_color,
              mision: response.mision == "null" ? "" : response.mision,
              vision: response.vision == "null" ? "" : response.vision,
              latitud: response.latitud,
              longitud: response.longitud,
              complete: response.complete,
              slug: response.slug,
            };


            if (response.complete == "1") {
              this.$store
                .dispatch("appConfig/setNavMenuhidden", false)
                .then(() => (this.loading = false));
            }

            (this.correos = response.empresa_emails),
              (this.numeros = response.empresa_numbers),
              this.getImagenes();
            this.getEstados();
            this.getCiudades();
          }
        })
        .catch((error) => {
        });
    },

    getDominio() {
      this.$store
        .dispatch("appConfiguracion/getEmpresa")
        .then((response) => {
          if (response == null) {
          } else {
            this.dominio = response.dominio;
          }
        })
        .catch((error) => {
        });
    },

    getPaises() {
      this.$store
        .dispatch("appLocalidades/getPaises")
        .then(() => { })
        .catch((error) => {
        });
    },

    getEstados() {
      this.$store
        .dispatch("appLocalidades/getStates", {
          codigo: this.configuracion.id_pais.id,
        })
        .then(() => { })
        .catch((error) => {
        });
    },

    getCiudades() {
      this.$store
        .dispatch("appLocalidades/getCiudades", {
          codigo: this.configuracion.id_estado.id,
        })
        .then(() => { })
        .catch((error) => {
        });
    },

    setPlace(place) {
      this.configuracion.direccion = place.formatted_address;
      this.configuracion.latitud = place.geometry.location.lat();
      this.configuracion.longitud = place.geometry.location.lng();
      this.currentPlace = place;
    },

    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },

    geolocate: function () {
      if (this.configuracion.id != null) {
        const marker = {
          lat: parseFloat(this.configuracion.latitud),
          lng: parseFloat(this.configuracion.longitud),
        };
        this.markers.push({ position: marker, title: this.inmueble.direccion });
        this.center = marker;
      } else {
        this.center = {
          lat: 3.42158,
          lng: -76.5205,
        };
      }
    },

    getImagenes() {
      if (this.configuracion.logo.substr(0, 4) == "http") {
        this.imageData = this.configuracion.logo;
      } else if (this.configuracion.logo.substr(0, 4) == "data") {
        this.imageData = this.configuracion.logo;
      } else {
        this.imageData = "/storage/" + this.configuracion.logo;
      }
    },

    sendData() {
      this.enviarData();
    },

    enviarData() {
      if (this.itemsNumero.lenght > 0) {
        this.itemsNumero.forEach((element) => {
          this.configuracion.numeros.push({ numero: element.numero });
        });
      }

      if (this.itemsCorreo.lenght > 0) {
        this.itemsCorreo.forEach((element) => {
          this.configuracion.correos.push({ correo: element.correo });
        });
      }
      let formData = new FormData();

      if (this.configuracion.logo != "") {
        formData.append("logo", this.configuracion.logo);
      }
      formData.append("id", this.configuracion.id);

      formData.append("agente", this.userdata.id);
      formData.append("id_pais", JSON.stringify(this.configuracion.id_pais));
      formData.append(
        "id_estado",
        JSON.stringify(this.configuracion.id_estado)
      );
      formData.append(
        "id_ciudad",
        JSON.stringify(this.configuracion.id_ciudad)
      );
      formData.append("nombre", this.configuracion.nombre);
      formData.append("nit", this.configuracion.nit);
      formData.append("dv", this.configuracion.dv);
      formData.append("telefono", this.configuracion.telefono);
      formData.append("email", this.configuracion.email);
      formData.append("celular", this.configuracion.celular);
      formData.append("pagina_web", this.configuracion.pagina_web);
      formData.append("descripcion", this.configuracion.descripcion);
      formData.append("facebook", this.configuracion.facebook);
      formData.append("instagram", this.configuracion.instagram);
      formData.append("linkedin", this.configuracion.linkedin);
      formData.append("latitud", this.configuracion.latitud);
      formData.append("longitud", this.configuracion.longitud);
      formData.append("direccion", this.configuracion.direccion);
      formData.append("color_primario", this.configuracion.color_primario);
      formData.append("color_secundario", this.configuracion.color_secundario);
      formData.append("font_color", this.configuracion.font_color);
      formData.append("mision", this.configuracion.mision);
      formData.append("vision", this.configuracion.vision);
      formData.append("slug", this.configuracion.slug);

      this.$store
        .dispatch("appConfiguracion/addEmpresa", formData)
        .then((response) => {
          localStorage.setItem(
            "empresa",
            JSON.stringify(response.data.data.empresa)
          );

          (this.itemsCorreo = [
            {
              id: 1,
              selected: "male",
              selected1: "designer",
              prevHeight: 0,
              correo: "",
            },
          ]),
            (this.itemsNumero = [
              {
                id: 1,
                selected: "male",
                selected1: "designer",
                prevHeight: 0,
                numero: "",
              },
            ]),
            this.$swal({
              title: response.data.message,
              text: "Haga clic en el botón!",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });

          this.componentKey += 1;
          this.getEmpresa();

          if (this.tabIndex == 3) {
            this.tabIndex = 0;
          } else {
            this.tabIndex = this.tabIndex + 1;
          }
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: error.data.errorMessage,
              icon: "EditIcon",
              variant: "danger",
            },
          });
        });
    },

    previewImage: function (event) {
      var input = event.target;
      this.configuracion.logo = input.files[0];
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    socio(data) {
      let user = JSON.parse(localStorage.getItem("configuracion"));
      this.configuracion.id = user.id_user;
      if (data === "agentes") {
        this.configuracion.tipo_cliente = "agentes";
      } else {
        this.configuracion.tipo_cliente = "socio_referidor";
      }
    },
    validationTipoCliente() {
      this.enviarData();
    },
    toggleIndeterminate() {
      this.indeterminate = !this.indeterminate;
    },
  },
};