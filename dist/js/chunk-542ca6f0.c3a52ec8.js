(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-542ca6f0"],{"19d7":function(t,e,a){"use strict";a("8c76")},"8c76":function(t,e,a){},"905f":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-card",{staticClass:"blog-edit-wrapper",attrs:{title:"Editar Entrada de Blog"}},[a("b-media",{attrs:{"no-body":"","vertical-align":"center"}},[a("b-media-aside",{staticClass:"mr-75"},[a("b-avatar",{attrs:{size:"38",src:t.blog.avatar}})],1),a("b-media-body",[a("h6",{staticClass:"mb-25"},[t._v(" "+t._s(t.blog.userFullName)+" ")]),a("b-card-text",[t._v(t._s(t.blog.createdTime))])],1)],1),a("b-form",{staticClass:"mt-2"},[a("b-row",[a("b-col",{attrs:{md:"12"}},[a("b-form-group",{staticClass:"mb-2",attrs:{label:"Titulo","label-for":"blog-edit-title"}},[a("b-form-input",{attrs:{id:"blog-edit-title"},model:{value:t.generarSlug,callback:function(e){t.generarSlug=e},expression:"generarSlug"}})],1)],1),a("b-col",{attrs:{md:"12"}},[a("b-form-group",{staticClass:"mb-2",attrs:{label:"Descripcion","label-for":"blog-edit-title"}},[a("b-form-input",{attrs:{id:"blog-edit-title"},model:{value:t.blog.descripcion,callback:function(e){t.$set(t.blog,"descripcion",e)},expression:"blog.descripcion"}})],1)],1),a("b-col",{attrs:{md:"12"}},[a("b-form-group",{staticClass:"mb-2",attrs:{label:"Slug","label-for":"blog-edit-slug"}},[a("b-form-input",{attrs:{id:"blog-edit-slug"},model:{value:t.blog.slug,callback:function(e){t.$set(t.blog,"slug",e)},expression:"blog.slug"}})],1)],1),a("b-col",{attrs:{cols:"12"}},[a("b-form-group",{staticClass:"mb-2",attrs:{label:"Content","label-for":"blog-content"}},[a("quill-editor",{attrs:{id:"blog-content",options:t.snowOption},model:{value:t.blog.contenido,callback:function(e){t.$set(t.blog,"contenido",e)},expression:"blog.contenido"}})],1)],1),a("b-col",{staticClass:"mb-2",attrs:{cols:"12"}},[a("div",{staticClass:"border rounded p-2"},[a("h4",{staticClass:"mb-1"},[t._v(" Imagen ")]),a("b-media",{staticClass:"flex-column flex-md-row",attrs:{"no-body":"","vertical-align":"center"}},[a("b-media-aside",[t.blog.image?a("b-img",{ref:"refPreviewEl",staticClass:"rounded mr-2 mb-1 mb-md-0",attrs:{src:t.blog.image,height:"110",width:"170"}}):t._e()],1),a("b-media-body",[a("small",{staticClass:"text-muted"},[t._v("Se recomineda una imagen de 800x600, max 10mb.")]),a("b-card-text",{staticClass:"my-50"},[a("b-link",{attrs:{id:"blog-image-text"}},[t._v(" "+t._s(t.blogFile?t.blogFile.name:"banner.jpg")+" ")])],1),a("div",{staticClass:"d-inline-block"},[a("b-form-file",{ref:"refInputEl",attrs:{accept:".jpg, .png, .gif",placeholder:"Buscar Archivo"},on:{input:t.inputImageRenderer},model:{value:t.blogFile,callback:function(e){t.blogFile=e},expression:"blogFile"}})],1)],1)],1)],1)]),a("b-col",{staticClass:"mt-50",attrs:{cols:"12"}},[a("b-button",{directives:[{name:"ripple",rawName:"v-ripple.400",value:"rgba(255, 255, 255, 0.15)",expression:"'rgba(255, 255, 255, 0.15)'",modifiers:{400:!0}}],staticClass:"mr-1",attrs:{variant:"primary"},on:{click:function(e){return t.sendData()}}},[t._v(" Guardar ")]),a("b-button",{directives:[{name:"ripple",rawName:"v-ripple.400",value:"rgba(186, 191, 199, 0.15)",expression:"'rgba(186, 191, 199, 0.15)'",modifiers:{400:!0}}],attrs:{variant:"outline-secondary"}},[t._v(" Cancelar ")])],1)],1)],1)],1)},l=[],o=(a("ac1f"),a("5319"),a("205f")),s=a("34b6"),r=a("e8a3"),n=a("d6e4"),c=a("7c32"),b=a("7fa6"),d=a("11de"),u=a("aa59"),g=a("4918"),p=a("a15b"),m=a("b28b"),f=a("1947"),h=a("8226"),v=a("4797"),C=a("c43f"),w=a("4a7a"),B=a.n(w),F=a("953d"),x=a("e009"),_=a("c39f"),k=a("ed09"),E={components:{BCard:o["a"],BMedia:s["a"],BAvatar:r["a"],BCardText:n["a"],BMediaAside:c["a"],BMediaBody:b["a"],BForm:d["a"],BLink:u["a"],BImg:g["a"],BRow:p["a"],BCol:m["a"],BButton:f["a"],BFormGroup:h["a"],BFormInput:v["a"],BFormFile:C["a"],vSelect:B.a,quillEditor:F["quillEditor"]},directives:{Ripple:x["a"]},data:function(){return{blog:{avatar:"",userFullName:"",createdTime:"",titulo:"",categorias:"",slug:"",estado_registro:"",contenido:"",image:""},id:this.$route.params.id,blogEdit:{},blogFile:null,categoryOption:["Fashion","Food","Gaming","Quote","Video"],statusOption:["Published","Pending","Draft"],snowOption:{theme:"snow"}}},computed:{generarSlug:{get:function(){return this.blog.slug=this.blog.titulo,this.blog.slug=this.blog.slug.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g," ").toLowerCase(),this.blog.slug=this.blog.slug.replace(/^\s+|\s+$/gm,""),this.blog.slug=this.blog.slug.replace(/\s+/g,"-"),this.blog.titulo},set:function(t){this.blog.titulo=t}}},created:function(){this.getBlog()},setup:function(){var t=Object(k["ref"])(null),e=Object(k["ref"])(null),a=Object(_["a"])(t,(function(t){e.value.src=t})),i=a.inputImageRenderer;return{refInputEl:t,refPreviewEl:e,inputImageRenderer:i}},methods:{sendData:function(){var t=this,e=new FormData;e.append("id",this.id),e.append("titulo",this.blog.titulo),e.append("descripcion",this.blog.descripcion),e.append("categorias",this.blog.categorias),e.append("slug",this.blog.slug),e.append("status",this.blog.status),e.append("contenido",this.blog.excerpt),e.append("files[]",this.blogFile),this.$store.dispatch("banners/updblog",e).then((function(e){t.$router.push({name:"blogs-list"})})).catch((function(t){}))},getBlog:function(){var t=this,e=new FormData;e.append("id",this.id),this.$store.dispatch("banners/getblog",e).then((function(e){t.blog=e.data.data.blog})).catch((function(t){}))}}},$=E,y=(a("19d7"),a("2877")),I=Object(y["a"])($,i,l,!1,null,null,null);e["default"]=I.exports},c39f:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var i=function(t,e){var a=function(){var a=t.value.files[0],i=new FileReader;i.addEventListener("load",(function(){e(i.result)}),!1),a&&i.readAsDataURL(a)};return{inputImageRenderer:a}}}}]);
//# sourceMappingURL=chunk-542ca6f0.c3a52ec8.js.map