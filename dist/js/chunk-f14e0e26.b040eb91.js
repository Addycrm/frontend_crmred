(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f14e0e26"],{"07f6":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-overlay",{attrs:{show:e.overlay}},[a("div",{staticClass:"auth-wrapper auth-v2"},[a("b-row",{staticClass:"auth-inner m-0"},[a("router-link",{staticClass:"brand-logo",attrs:{to:{name:"inicio-home"}}},[a("b-img",{attrs:{fluid:"",src:e.appLogoImage,alt:"logo"}})],1),a("b-col",{staticClass:"d-none d-lg-flex align-items-center p-5",attrs:{lg:"8"}},[a("div",{staticClass:"w-100 d-lg-flex align-items-center justify-content-center px-5"},[a("b-img",{attrs:{fluid:"",src:e.imgUrl,alt:"Login V2"}})],1)]),a("b-col",{staticClass:"d-flex align-items-center auth-bg px-2 p-lg-5",attrs:{lg:"4"}},[a("b-col",{staticClass:"px-xl-2 mx-auto",attrs:{sm:"8",md:"6",lg:"12"}},[a("b-card-title",{staticClass:"mb-1 font-weight-bold",attrs:{"title-tag":"h2"}},[e._v(" Bienvenido a "+e._s(e.appName)+"! 👋 ")]),a("b-card-text",{staticClass:"mb-2"},[e._v(" Inicie sesión en su cuenta y comience la aventura ")]),a("validation-observer",{ref:"loginForm",scopedSlots:e._u([{key:"default",fn:function(t){t.invalid;return[a("b-form",{staticClass:"auth-login-form mt-2",on:{submit:function(t){return t.preventDefault(),e.login(t)}}},[a("b-form-group",{attrs:{label:"Email","label-for":"login-email"}},[a("validation-provider",{attrs:{name:"Email",vid:"email",rules:"required|email"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.errors;return[a("b-form-input",{attrs:{id:"login-email",state:!(i.length>0)&&null,name:"login-email",placeholder:"crmred@ejemplo.com"},model:{value:e.userEmail,callback:function(t){e.userEmail=t},expression:"userEmail"}}),a("small",{staticClass:"text-danger"},[e._v(e._s(i[0]))])]}}],null,!0)})],1),a("b-form-group",[a("div",{staticClass:"d-flex justify-content-between"},[a("label",{attrs:{for:"login-password"}},[e._v("Password")]),a("b-link",{attrs:{to:{name:"auth-forgot-password"}}},[a("small",[e._v("Olvidaste tu contraseña?")])])],1),a("validation-provider",{attrs:{name:"Password",vid:"password",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.errors;return[a("b-input-group",{staticClass:"input-group-merge",class:i.length>0?"is-invalid":null},[a("b-form-input",{staticClass:"form-control-merge",attrs:{id:"login-password",state:!(i.length>0)&&null,type:e.passwordFieldType,name:"login-password",placeholder:"Contraseña"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),a("b-input-group-append",{attrs:{"is-text":""}},[a("feather-icon",{staticClass:"cursor-pointer",attrs:{icon:e.passwordToggleIcon},on:{click:e.togglePasswordVisibility}})],1)],1),a("small",{staticClass:"text-danger"},[e._v(e._s(i[0]))])]}}],null,!0)})],1),a("b-form-group",[a("b-form-checkbox",{attrs:{id:"remember-me",name:"checkbox-1"},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[e._v(" Recordarme ")])],1),a("b-button",{attrs:{type:"submit",variant:"primary",block:"",disabled:e.overlay}},[e._v(" Iniciar sesion ")])],1)]}}])}),a("b-card-text",{staticClass:"text-center mt-2"},[a("span",[e._v("¿No tienes cuenta? ")]),a("b-link",{attrs:{to:{name:"auth-register"}}},[a("span",[e._v("Registrarme")])])],1),a("div",{staticClass:"divider my-2"},[a("div",{staticClass:"divider-text"},[e._v(" o ")])]),a("div",{staticClass:"divider my-2"},[a("div",{staticClass:"divider-text"},[e._v("Iniciar sesión con")])]),a("div",{staticClass:"auth-footer-btn d-flex justify-content-center"},[a("login-google")],1),a("div",{staticClass:"mt-2"},[a("center",[a("soporte-whatsapp")],1)],1)],1)],1)],1)],1)])},n=[],s=a("c7eb"),r=a("1da1"),l=(a("ac1f"),a("5319"),a("7bb1")),o=a("088b"),c=a("2616"),d=a("a15b"),u=a("b28b"),f=a("aa59"),m=a("8226"),p=a("4797"),h=a("ccc0"),_=a("5e12"),b=a("c3e6"),g=a("d6e4"),v=a("4968"),w=a("4918"),x=a("11de"),y=a("1947"),O=a("5fda"),j=a("8f03"),T=a("b91d"),C=a("4360"),k=a("8b71"),B=a("223c"),I=(a("d3b7"),{methods:{setUserData:function(){var e=this;return new Promise((function(t,a){e.$store.dispatch("authModule/getUserdata").then(function(){var a=Object(r["a"])(Object(s["a"])().mark((function a(i){var n;return Object(s["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:n=i.userData,e.$store.commit("userData/UPDATE_USER_DATA",n),e.$ability.update(n.ability),t(n);case 4:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()).catch((function(e){a(e)}))}))}}}),E=a("157f"),A=a("b7b7"),$=a("2bb3"),q=a("1dff"),D={directives:{"b-tooltip":c["a"]},components:{BRow:d["a"],BCol:u["a"],BLink:f["a"],BFormGroup:m["a"],BFormInput:p["a"],BInputGroupAppend:h["a"],BInputGroup:_["a"],BFormCheckbox:b["a"],BCardText:g["a"],BCardTitle:v["a"],BImg:w["a"],BForm:x["a"],BButton:y["a"],BAlert:O["a"],VuexyLogo:o["a"],ValidationProvider:l["b"],ValidationObserver:l["a"],loginGoogle:A["a"],"soporte-whatsapp":E["a"]},mixins:[T["a"],I],setup:function(){var e=q["c"].app,t=e.appName,a=e.appLogoImage;return{appLogoImage:a,appName:t}},data:function(){return{status:"",password:null,userEmail:null,sideImg:a("5aa98"),required:j["c"],email:j["a"],overlay:!1}},computed:{passwordToggleIcon:function(){return"password"===this.passwordFieldType?"EyeIcon":"EyeOffIcon"},imgUrl:function(){return"dark"===C["a"].state.appConfig.layout.skin?(this.sideImg=a("ff0f"),this.sideImg):this.sideImg}},methods:{login:function(){var e=this;return Object(r["a"])(Object(s["a"])().mark((function t(){return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.overlay=!0,t.next=3,e.$http.post($["a"].URL_API+"/api/login",{email:e.userEmail,password:e.password}).then(function(){var t=Object(r["a"])(Object(s["a"])().mark((function t(a){var i;return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=a.data.token,Object.assign(localStorage,{accessToken:i.access_token,refreshToken:i.refresh_token}),t.next=4,e.setUserData().then(function(){var t=Object(r["a"])(Object(s["a"])().mark((function t(a){return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$router.replace(Object(k["a"])(a.role.slug)).then((function(){e.overlay=!1,e.$toast({component:B["a"],props:{title:"Bienvenido",icon:"CheckCircleIcon",text:a.username,variant:"success"}})}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){console.error(t),e.$toast({component:B["a"],props:{title:"Algo salio mal",icon:"AlertCircleIcon",text:"Si el problema persiste recarga la pagina o comunica con soporte",variant:"danger"}})}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch(function(){var t=Object(r["a"])(Object(s["a"])().mark((function t(a){var i;return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.error(a),i=a.response.data,t.next=4,e.$swal({title:"Alerta de verificación",text:i.errorMessage,icon:404===i.status?"info":"warning",showDenyButton:404===i.status,showConfirmButton:404!==i.status,customClass:{denyButton:"btn btn-info",confirmButton:"btn btn-warning"},confirmButtonText:"Cerrar",denyButtonText:"Registrarme",buttonsStyling:!1}).then((function(t){t.isDenied&&e.$router.replace({path:"/register"})}));case 4:e.overlay=!1;case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 3:case"end":return t.stop()}}),t)})))()}}},P=D,S=(a("ad37"),a("bde7"),a("2877")),U=Object(S["a"])(P,i,n,!1,null,"1ac1da6a",null);t["default"]=U.exports},2593:function(e){e.exports=JSON.parse('{"code":"en","messages":{"alpha":"The {_field_} field may only contain alphabetic characters","alpha_num":"The {_field_} field may only contain alpha-numeric characters","alpha_dash":"The {_field_} field may contain alpha-numeric characters as well as dashes and underscores","alpha_spaces":"The {_field_} field may only contain alphabetic characters as well as spaces","between":"The {_field_} field must be between {min} and {max}","confirmed":"The {_field_} field confirmation does not match","digits":"The {_field_} field must be numeric and exactly contain {length} digits","dimensions":"The {_field_} field must be {width} pixels by {height} pixels","email":"The {_field_} field must be a valid email","excluded":"The {_field_} field is not a valid value","ext":"The {_field_} field is not a valid file","image":"The {_field_} field must be an image","integer":"The {_field_} field must be an integer","length":"The {_field_} field must be {length} long","max_value":"The {_field_} field must be {max} or less","max":"The {_field_} field may not be greater than {length} characters","mimes":"The {_field_} field must have a valid file type","min_value":"The {_field_} field must be {min} or more","min":"The {_field_} field must be at least {length} characters","numeric":"The {_field_} field may only contain numeric characters","oneOf":"The {_field_} field is not a valid value","regex":"The {_field_} field format is invalid","required_if":"The {_field_} field is required","required":"The {_field_} field is required","size":"The {_field_} field size must be less than {size}KB","double":"The {_field_} field must be a valid decimal"}}')},"5aa98":function(e,t,a){e.exports=a.p+"img/login-v2.99da7e4e.svg"},"8f03":function(e,t,a){"use strict";a.d(t,"c",(function(){return u})),a.d(t,"a",(function(){return f})),a.d(t,"b",(function(){return m}));var i=a("7bb1"),n=a("4c93"),s=a("d4d7"),r=a("2593"),l=(a("ac1f"),a("00b4"),function(e){return e>=0}),o=function(e){var t=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/,a=t.test(e);return a},c=function(e){var t=/^(?:3[47][0-9]{13})$/,a=t.test(e);return a},d=function(e){if(void 0===e||null===e||0===e.length)return!0;var t=/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;return t.test(e)},u=Object(i["c"])("required",n["required"]),f=Object(i["c"])("email",n["email"]),m=(Object(i["c"])("min",n["min"]),Object(i["c"])("confirmed",n["confirmed"]),Object(i["c"])("regex",n["regex"]),Object(i["c"])("between",n["between"]),Object(i["c"])("alpha",n["alpha"]),Object(i["c"])("integer",n["integer"]),Object(i["c"])("digits",n["digits"]),Object(i["c"])("alpha-dash",n["alpha_dash"]),Object(i["c"])("alpha-num",n["alpha_num"]),Object(i["c"])("length",n["length"]),Object(i["c"])("positive",{validate:l,message:"Please enter positive number!"}),Object(i["c"])("credit-card",{validate:c,message:"It is not valid credit card!"}),Object(i["c"])("password",{validate:o,message:"Your {_field_} must contain at least one uppercase, one lowercase, one special character and one digit"}));Object(i["c"])("url",{validate:d,message:"URL is invalid"});Object(i["d"])({en:{messages:r.messages,names:{email:"Email",password:"Password"},fields:{password:{min:"{_field_} is too short, you want to get hacked?"}}},ar:{messages:s.messages,names:{email:"البريد الإلكتروني",password:"كلمة السر"},fields:{password:{min:"كلمة السر قصيرة جداً سيتم اختراقك"}}}})},ad37:function(e,t,a){"use strict";a("c642")},b934:function(e,t,a){},bde7:function(e,t,a){"use strict";a("b934")},c642:function(e,t,a){},d4d7:function(e){e.exports=JSON.parse('{"code":"ar","messages":{"alpha":"{_field_} يجب ان يحتوي على حروف فقط","alpha_num":"{_field_} قد يحتوي فقط على حروف وارقام","alpha_dash":"{_field_} قد يحتوي على حروف او الرموز - و _","alpha_spaces":"{_field_} قد يحتوي فقط على حروف ومسافات","between":"قيمة {_field_} يجب ان تكون ما بين {min} و {max}","confirmed":"{_field_} لا يماثل التأكيد","digits":"{_field_} يجب ان تحتوي فقط على ارقام والا يزيد عددها عن {length} رقم","dimensions":"{_field_} يجب ان تكون بمقاس {width} بكسل في {height} بكسل","email":"{_field_} يجب ان يكون بريدا اليكتروني صحيح","excluded":"الحقل {_field_} غير صحيح","ext":"نوع ملف {_field_} غير صحيح","image":"{_field_} يجب ان تكون صورة","integer":"الحقل {_field_} يجب ان يكون عدداً صحيحاً","length":"حقل {_field_} يجب الا يزيد عن {length}","max_value":"قيمة الحقل {_field_} يجب ان تكون اصغر من {min} او تساويها","max":"الحقل {_field_} يجب ان يحتوي على {length} حروف على الأكثر","mimes":"نوع ملف {_field_} غير صحيح","min_value":"قيمة الحقل {_field_} يجب ان تكون اكبر من {min} او تساويها","min":"الحقل {_field_} يجب ان يحتوي على {length} حروف على الأقل","numeric":"{_field_} يمكن ان يحتوي فقط على ارقام","oneOf":"الحقل {_field_} يجب ان يكون قيمة صحيحة","regex":"الحقل {_field_} غير صحيح","required":"{_field_} مطلوب","required_if":"حقل {_field_} مطلوب","size":"{_field_} يجب ان يكون اقل من {size} كيلوبايت","double":"يجب أن يكون الحقل {_field_} عددًا عشريًا صالحًا"}}')},ff0f:function(e,t,a){e.exports=a.p+"img/login-v2-dark.684bd68d.svg"}}]);
//# sourceMappingURL=chunk-f14e0e26.b040eb91.js.map