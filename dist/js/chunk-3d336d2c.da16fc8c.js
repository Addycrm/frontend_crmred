(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d336d2c"],{"1b3e":function(e,t,n){"use strict";n("e8f6")},2607:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("layout-horizontal",[n("router-view"),e.showCustomizer?n("app-customizer",{attrs:{slot:"customizer"},slot:"customizer"}):e._e()],1)},i=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"horizontal-layout",class:[e.layoutClasses],staticStyle:{height:"inherit"},attrs:{"data-col":e.isNavMenuHidden?"1-column":null}},[n("b-navbar",{staticClass:"header-navbar navbar-shadow align-items-center navbar-brand-center navbar-fixed",class:{"fixed-top":"xl"!==e.$store.getters["app/currentBreakPoint"]},style:{backgroundColor:"static"===e.navbarType&&e.scrolledTo&&"light"===e.skin?"white":null,boxShadow:"static"===e.navbarType&&e.scrolledTo?"rgba(0, 0, 0, 0.05) 0px 4px 20px 0px":null},attrs:{toggleable:!1}},[e._t("navbar",[n("app-navbar-horizontal-layout-brand"),n("app-navbar-horizontal-layout",{attrs:{"toggle-vertical-menu-active":e.toggleVerticalMenuActive}})],{toggleVerticalMenuActive:e.toggleVerticalMenuActive})],2),n("div",{staticClass:"horizontal-menu-wrapper"},[e.isNavMenuHidden?e._e():n("div",{staticClass:"header-navbar navbar-expand-sm navbar navbar-horizontal navbar-light navbar-shadow menu-border d-none d-xl-block",class:[e.navbarMenuTypeClass]},[n("horizontal-nav-menu")],1),n("vertical-nav-menu",{staticClass:"d-block d-xl-none",attrs:{"is-vertical-menu-active":e.isVerticalMenuActive,"toggle-vertical-menu-active":e.toggleVerticalMenuActive},scopedSlots:e._u([{key:"header",fn:function(t){return[e._t("vertical-menu-header",null,null,t)]}}],null,!0)})],1),n("div",{staticClass:"sidenav-overlay",class:e.overlayClasses,on:{click:function(t){e.isVerticalMenuActive=!1}}}),n("transition",{attrs:{name:e.routerTransition,mode:"out-in"}},[n(e.layoutContentRenderer,{key:"layout-content-renderer-left"===e.layoutContentRenderer?e.$route.meta.navActiveLink||e.$route.name:null,tag:"component",scopedSlots:e._u([e._l(e.$scopedSlots,(function(t,n){return{key:n,fn:function(t){return[e._t(n,null,null,t)]}}}))],null,!0)})],1),n("footer",{staticClass:"footer footer-light",class:[e.footerTypeClass]},[e._t("footer",[n("app-footer")])],2),e._t("customizer")],2)},r=[],l=n("3033"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"navbar-container d-flex content align-items-center"},[n("ul",{staticClass:"nav navbar-nav d-xl-none"},[n("li",{staticClass:"nav-item"},[n("b-link",{staticClass:"nav-link",on:{click:e.toggleVerticalMenuActive}},[n("feather-icon",{attrs:{icon:"MenuIcon",size:"21"}})],1)],1)]),n("div",{staticClass:"bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex"},[n("bookmarks")],1),n("b-navbar-nav",{staticClass:"nav align-items-center ml-auto"},[n("locale"),n("dark-Toggler",{staticClass:"d-none d-lg-block"}),n("search-bar"),n("cart-dropdown"),n("notification-dropdown"),n("user-dropdown")],1)],1)},c=[],u=n("aa59"),p=n("042b"),d=n("6957"),m=n("e2f5"),v=n("9f5c"),h=n("809a"),f=n("8a2e"),b=n("5c02"),g=n("eef9"),C={components:{BLink:u["a"],BNavbarNav:p["a"],Bookmarks:d["a"],Locale:m["a"],DarkToggler:v["a"],SearchBar:h["a"],CartDropdown:f["a"],NotificationDropdown:b["a"],UserDropdown:g["a"]},props:{toggleVerticalMenuActive:{type:Function,default:function(){}}}},w=C,y=n("2877"),k=Object(y["a"])(w,s,c,!1,null,null,null),x=k.exports,I=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"navbar-header d-xl-block d-none"},[n("ul",{staticClass:"nav navbar-nav"},[n("li",{staticClass:"nav-item"},[n("b-link",{staticClass:"navbar-brand",attrs:{to:"/"}},[n("span",{staticClass:"brand-logo"},[n("b-img",{attrs:{src:e.appLogoImage,alt:"logo"}})],1),n("h2",{staticClass:"brand-text mb-0"},[e._v(" "+e._s(e.appName)+" ")])])],1)])])},O=[],A=n("4918"),M=n("1dff"),_={components:{BLink:u["a"],BImg:A["a"]},setup:function(){var e=M["c"].app,t=e.appName,n=e.appLogoImage;return{appName:t,appLogoImage:n}}},L=_,j=Object(y["a"])(L,I,O,!1,null,null,null),z=j.exports,T=n("62cb"),N=n("b8f2"),H=n("d0b9"),V=n("ed09"),B=function(){var e=Object(V["ref"])(null),t=function(){e.value=window.scrollY};return window.addEventListener("scroll",t),Object(V["onUnmounted"])((function(){window.removeEventListener("scroll",t)})),{scrolledTo:e}},P=n("1ae3"),E=n("e08f"),D=n("0d19"),G=n("4360");function S(e,t,n){var o=Object(V["computed"])((function(){return G["a"].getters["app/currentBreakPoint"]})),i=Object(V["computed"])((function(){var i=[];return"xl"===o.value?i.push("horizontal-menu"):(i.push("vertical-overlay-menu"),i.push(n.value?"menu-open":"menu-hide")),i.push("navbar-".concat(e.value)),"sticky"===t.value&&i.push("footer-fixed"),"static"===t.value&&i.push("footer-static"),"hidden"===t.value&&i.push("footer-hidden"),i})),a=Object(V["computed"])((function(){return"sticky"===e.value?"fixed-top":"static"===e.value?"":"hidden"===e.value?"d-none":"floating-nav"})),r=Object(V["computed"])((function(){return"static"===t.value?"footer-static":"hidden"===t.value?"d-none":""}));return{layoutClasses:i,navbarMenuTypeClass:a,footerTypeClass:r}}var F=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"navbar-container main-menu-content"},[n("horizontal-nav-menu-items",{attrs:{items:e.navMenuItems}})],1)},$=[],R=n("2909"),q=(n("99af"),[{header:"Dashboards",icon:"HomeIcon",children:[{title:"eCommerce",route:"inicio-home",icon:"ShoppingCartIcon"},{title:"Analytics",route:"dashboard-analytics",icon:"ActivityIcon"}]}]),U=[{header:"Apps",icon:"PackageIcon",children:[{title:"Invoice",icon:"FileTextIcon",children:[{title:"List",route:"apps-invoice-list"},{title:"Preview",route:{name:"apps-invoice-preview",params:{id:4987}}},{title:"Edit",route:{name:"apps-invoice-edit",params:{id:4987}}},{title:"Add",route:{name:"apps-invoice-add"}}]},{title:"User hola",icon:"UserIcon",children:[{title:"List",route:"apps-users-list"},{title:"View",route:{name:"apps-users-view",params:{id:21}}},{title:"Edit",route:{name:"apps-users-edit",params:{id:21}}}]}]}],W=[{header:"Pages",icon:"FileTextIcon",children:[{title:"Authentication",icon:"LockIcon",children:[{title:"Login v1",route:"auth-login-v1",target:"_blank"},{title:"Login v2",route:"auth-login-v2",target:"_blank"},{title:"Register v1",route:"auth-register-v1",target:"_blank"},{title:"Register v2",route:"auth-register-v2",target:"_blank"},{title:"Forgot Password v1",route:"auth-forgot-password-v1",target:"_blank"},{title:"Forgot Password v2",route:"auth-forgot-password-v2",target:"_blank"},{title:"Reset Password v1",route:"auth-reset-password-v1",target:"_blank"},{title:"Reset Password v2",route:"auth-reset-password-v2",target:"_blank"}]},{title:"Account Settings",route:"pages-account-setting",icon:"SettingsIcon"},{title:"Perfil",route:"pages-profile",icon:"UserIcon"},{title:"Faq",route:"pages-faq",icon:"HelpCircleIcon"},{title:"Knowledge Base",route:"pages-knowledge-base",icon:"AlertCircleIcon"},{title:"Pricing",route:"pages-pricing",icon:"DollarSignIcon"},{title:"Blog",icon:"ClipboardIcon",children:[{title:"List",route:"pages-blog-list"},{title:"Detail",route:{name:"pages-blog-detail",params:{id:1}}},{title:"Edit",route:{name:"pages-blog-edit",params:{id:1}}}]},{title:"Mail Templates",icon:"MailIcon",children:[{title:"Welcome",href:"https://pixinvent.com/demo/vuexy-mail-template/mail-welcome.html"},{title:"Reset Password",href:"https://pixinvent.com/demo/vuexy-mail-template/mail-reset-password.html"},{title:"Verify Email",href:"https://pixinvent.com/demo/vuexy-mail-template/mail-verify-email.html"},{title:"Deactivate Account",href:"https://pixinvent.com/demo/vuexy-mail-template/mail-deactivate-account.html"},{title:"Invoice",href:"https://pixinvent.com/demo/vuexy-mail-template/mail-invoice.html"},{title:"Promotional",href:"https://pixinvent.com/demo/vuexy-mail-template/mail-promotional.html"}]},{title:"Miscellaneous",icon:"FileIcon",children:[{title:"Coming Soon",route:"misc-coming-soon",target:"_blank"},{title:"Not Authorized",route:"misc-not-authorized",target:"_blank"},{title:"Under Maintenance",route:"misc-under-maintenance",target:"_blank"},{title:"Error",route:"misc-error",target:"_blank"}]}]}],J=[{header:"Charts & Maps",icon:"PieChartIcon",children:[{title:"Charts",icon:"PieChartIcon",children:[{title:"Apex Chart",route:"charts-apex-chart"},{title:"Chartjs",route:"charts-chartjs"},{title:"Echart",route:"charts-echart"}]},{title:"Leaflet",route:"maps-leaflet",icon:"MapIcon"}]}],Y=[{header:"Interfas de usuario",icon:"LayersIcon",children:[{title:"Typography",route:"ui-typography",icon:"TypeIcon"},{title:"Colors",route:"ui-colors",icon:"DropletIcon"},{title:"Feather",route:"ui-feather",icon:"EyeIcon"},{title:"Cards",icon:"CreditCardIcon",children:[{title:"Basic",route:"card-basic"},{title:"Advance",route:"card-advance"},{title:"Statistic",route:"card-statistic"},{title:"Analytic",route:"card-analytic"},{title:"Card Action",route:"card-action"}]},{title:"Components",icon:"ArchiveIcon",children:[{title:"Alert",route:"components-alert"},{title:"Aspect",route:"components-aspect"},{title:"Avatar",route:"components-avatar"},{title:"Badge",route:"components-badge"},{title:"Breadcrumb",route:"components-breadcrumb"},{title:"Button",route:"components-button"},{title:"Button Group",route:"components-button-group"},{title:"Button Toolbar",route:"components-button-toolbar"},{title:"Calendar",route:"components-calendar"},{title:"Carousel",route:"components-carousel"},{title:"Collapse",route:"components-collapse"},{title:"Dropdown",route:"components-dropdown"},{title:"Embed",route:"components-embed"},{title:"Image",route:"components-image"},{title:"List Group",route:"components-list-group"},{title:"Media Objects",route:"components-media"},{title:"Modal",route:"components-modal"},{title:"Nav",route:"components-nav"},{title:"Overlay",route:"components-overlay"},{title:"Pagination",route:"components-pagination"},{title:"Pagination Nav",route:"components-pagination-nav"},{title:"Pill",route:"components-pill"},{title:"Pill Badge",route:"components-pill-badge"},{title:"Popover",route:"components-popover"},{title:"Progress",route:"components-progress"},{title:"Sidebar",route:"components-sidebar"},{title:"spinner",route:"components-spinner"},{title:"Tab",route:"components-tab"},{title:"Time",route:"components-time"},{title:"Timeline",route:"components-timeline"},{title:"Toasts",route:"components-toasts"},{title:"Tooltip",route:"components-tooltip"}]},{title:"Extensions",icon:"PlusCircleIcon",children:[{title:"Sweet Alert",route:"extensions-sweet-alert"},{title:"Toastification",route:"extensions-toastification"},{title:"Slider",route:"extensions-slider"},{title:"Drag & Drop",route:"extensions-drag-and-drop"},{title:"Tour",route:"extensions-tour"},{title:"Clipboard",route:"extensions-clipboard"},{title:"Context Menu",route:"extensions-context-menu"},{title:"Swiper",route:"extensions-swiper"},{title:"I18n",route:"extensions-i18n"}]},{title:"Page Layouts",icon:"LayoutIcon",children:[{title:"Layout Boxed",route:"page-layout-boxed-layout"},{title:"Without Menu",route:"page-layout-without-menu"},{title:"Layout Empty",route:"page-layout-layout-empty"},{title:"Layout Blank",route:"page-layout-layout-blank"}]}]}],K=[{header:"Forms & Tables",icon:"EditIcon",children:[{title:"Forms Elements",icon:"CopyIcon",children:[{title:"Input",route:"forms-element-input"},{title:"Input Group",route:"forms-element-input-group"},{title:"Input Mask",route:"forms-element-input-mask"},{title:"Textarea",route:"forms-element-textarea"},{title:"Auto Suggest",route:"extensions-auto-suggest"},{title:"Checkbox",route:"forms-element-checkbox"},{title:"Radio",route:"forms-element-radio"},{title:"Switch",route:"forms-element-switch"},{title:"Select",route:"forms-element-select"},{title:"Vue Select",route:"extensions-vue-select"},{title:"Spinbutton",route:"forms-element-spinbutton"},{title:"File Input",route:"forms-element-file-input"},{title:"Quill Editor",route:"extensions-quill-editor"},{title:"Form Datepicker",route:"forms-element-datepicker"},{title:"Form Timepicker",route:"forms-element-timepicker"},{title:"Date Time Picker",route:"extensions-date-time-picker"},{title:"Form Rating",route:"forms-element-rating"},{title:"Form Tag",route:"forms-element-tag"}]},{title:"Form Layout",route:"form-layout",icon:"CopyIcon"},{title:"Form Wizard",route:"form-wizard",icon:"PackageIcon"},{title:"Form Validation",route:"form-validation",icon:"CheckCircleIcon"},{title:"Form Repeater",route:"form-repeater",icon:"CopyIcon"},{title:"BS Table",route:"table-bs-table",icon:"ServerIcon"},{title:"Good Table",route:"table-good-table",icon:"GridIcon"}]}],Q=[{header:"Others",icon:"MoreHorizontalIcon",children:[{title:"Access Control",route:"access-control",icon:"ShieldIcon",action:"read",resource:"roles"},{title:"Menu Levels",icon:"MenuIcon",children:[{title:"Menu Level 2.1",route:null},{title:"Menu Level 2.2",children:[{title:"Menu Level 3.1",route:null},{title:"Menu Level 3.2",route:null}]}]},{title:"Disabled Menu",route:null,icon:"EyeOffIcon",disabled:!0},{title:"Raise Support",href:"https://pixinvent.ticksy.com/",icon:"LifeBuoyIcon"},{title:"Documentation",href:"https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation",icon:"FileTextIcon"}]}],X=[].concat(Object(R["a"])(q),Object(R["a"])(U),Object(R["a"])(Y),Object(R["a"])(K),Object(R["a"])(W),Object(R["a"])(J),Object(R["a"])(Q)),Z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",{staticClass:"nav navbar-nav",attrs:{id:"main-menu-navigation"}},e._l(e.items,(function(t){return n(e.resolveNavComponent(t),{key:t.header||t.title,tag:"component",attrs:{item:t}})})),1)},ee=[],te=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.canViewHorizontalNavMenuHeaderLink(e.item)?n("li",{staticClass:"nav-item",class:{"sidebar-group-active active":e.isActive}},[n("b-link",{staticClass:"nav-link",attrs:{to:{name:e.item.route}}},[n("feather-icon",{attrs:{size:"14",icon:e.item.icon}}),n("span",[e._v(e._s(e.t(e.item.title)))])],1)],1):e._e()},ne=[],oe=n("42cb"),ie=n("185c"),ae=n("5959");function re(e){var t=Object(V["ref"])(!1),n=function(){t.value=Object(ae["b"])(e)};return{isActive:t,updateIsActive:n}}var le={watch:{$route:{immediate:!0,handler:function(){this.updateIsActive()}}}},se={components:{BLink:u["a"]},mixins:[le],props:{item:{type:Object,required:!0}},setup:function(e){var t=re(e.item),n=t.isActive,o=t.updateIsActive,i=Object(oe["a"])(),a=i.t,r=Object(ie["a"])(),l=r.canViewHorizontalNavMenuHeaderLink;return{isActive:n,updateIsActive:o,canViewHorizontalNavMenuHeaderLink:l,t:a}}},ce=se,ue=Object(y["a"])(ce,te,ne,!1,null,null,null),pe=ue.exports,de=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.canViewHorizontalNavMenuHeaderGroup(e.item)?n("li",{staticClass:"dropdown nav-item",class:{"sidebar-group-active active open":e.isActive,show:e.isOpen},on:{mouseenter:function(){return e.updateGroupOpen(!0)},mouseleave:function(){return e.updateGroupOpen(!1)}}},[n("b-link",{staticClass:"nav-link dropdown-toggle d-flex align-items-center"},[n("feather-icon",{attrs:{size:"14",icon:e.item.icon}}),n("span",[e._v(e._s(e.t(e.item.header)))])],1),n("ul",{staticClass:"dropdown-menu"},e._l(e.item.children,(function(t){return n(e.resolveHorizontalNavMenuItemComponent(t),{key:t.title,tag:"component",attrs:{item:t}})})),1)],1):e._e()},me=[];function ve(e){var t=Object(V["ref"])(!1),n=function(e){t.value=e},o=Object(V["ref"])(!1),i=function(){o.value=Object(ae["a"])(e.children)};return{isOpen:t,isActive:o,updateGroupOpen:n,updateIsActive:i}}var he={watch:{$route:{immediate:!0,handler:function(){this.updateIsActive()}}}},fe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.canViewVerticalNavMenuGroup(e.item)?n("li",{staticClass:"dropdown dropdown-submenu",class:{show:e.isOpen,disabled:e.item.disabled,"sidebar-group-active active open":e.isActive,openLeft:e.openChildDropdownOnLeft},on:{mouseenter:function(){return e.updateGroupOpen(!0)},mouseleave:function(){return e.updateGroupOpen(!1)}}},[n("b-link",{staticClass:"dropdown-item",class:{"dropdown-toggle":e.item.children},attrs:{href:"#"},on:{click:function(){return e.updateGroupOpen(!e.isOpen)}}},[n("feather-icon",{attrs:{icon:e.item.icon||"CircleIcon"}}),n("span",{staticClass:"menu-title"},[e._v(e._s(e.t(e.item.title)))])],1),n("ul",{ref:"refChildDropdown",staticClass:"dropdown-menu"},e._l(e.item.children,(function(t){return n(e.resolveNavItemComponent(t),{key:t.header||t.title,ref:"groupChild",refInFor:!0,tag:"component",attrs:{item:t}})})),1)],1):e._e()},be=[],ge=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.canViewHorizontalNavMenuLink(e.item)?n("li",{class:{active:e.isActive,disabled:e.item.disabled}},[n("b-link",e._b({staticClass:"dropdown-item"},"b-link",e.linkProps,!1),[n("feather-icon",{attrs:{icon:e.item.icon||"CircleIcon",size:"24"}}),n("span",{staticClass:"menu-title"},[e._v(e._s(e.t(e.item.title)))])],1)],1):e._e()},Ce=[];function we(e){var t=Object(V["ref"])(!1),n=Object(ae["c"])(e),o=function(){t.value=Object(ae["b"])(e)};return{isActive:t,linkProps:n,updateIsActive:o}}var ye={watch:{$route:{immediate:!0,handler:function(){this.updateIsActive()}}}},ke={components:{BLink:u["a"]},mixins:[ye],props:{item:{type:Object,required:!0}},setup:function(e){var t=we(e.item),n=t.isActive,o=t.linkProps,i=t.updateIsActive,a=Object(oe["a"])(),r=a.t,l=Object(ie["a"])(),s=l.canViewHorizontalNavMenuLink;return{isActive:n,linkProps:o,updateIsActive:i,canViewHorizontalNavMenuLink:s,t:r}}},xe=ke,Ie=Object(y["a"])(xe,ge,Ce,!1,null,null,null),Oe=Ie.exports;function Ae(e){var t=Object(V["ref"])(null),n=Object(V["ref"])(!1),o=Object(V["ref"])(!1),i=function(e){o.value=e,e?Object(V["nextTick"])((function(){var e=t.value.offsetWidth,o=window.innerWidth-16,i=t.value.getBoundingClientRect(),a=i.left,r=a+e-o;n.value=r>0;var l=t.value.getBoundingClientRect().top,s=t.value.getBoundingClientRect().height;if(window.innerHeight-l-s-28<1){var c=window.innerHeight-l-70;t.value.style.maxHeight="".concat(c,"px"),t.value.style.overflowY="auto",t.value.style.overflowX="hidden"}})):n.value=!1},a=Object(V["ref"])(!1),r=function(){a.value=Object(ae["a"])(e.children)};return{isOpen:o,isActive:a,updateGroupOpen:i,updateIsActive:r,refChildDropdown:t,openChildDropdownOnLeft:n}}var Me={watch:{$route:{immediate:!0,handler:function(){this.updateIsActive()}}}},_e={name:"HorizontalNavMenuGroup",components:{HorizontalNavMenuLink:Oe,BLink:u["a"]},mixins:[Me],props:{item:{type:Object,required:!0}},setup:function(e){var t=Ae(e.item),n=t.refChildDropdown,o=t.isActive,i=t.isOpen,a=t.updateGroupOpen,r=t.updateIsActive,l=t.openChildDropdownOnLeft,s=Object(oe["a"])(),c=s.t,u=Object(ie["a"])(),p=u.canViewVerticalNavMenuGroup;return{refChildDropdown:n,openChildDropdownOnLeft:l,resolveNavItemComponent:ae["d"],isOpen:i,isActive:o,updateGroupOpen:a,updateIsActive:r,canViewVerticalNavMenuGroup:p,t:c}}},Le=_e,je=Object(y["a"])(Le,fe,be,!1,null,null,null),ze=je.exports,Te={components:{BLink:u["a"],HorizontalNavMenuGroup:ze,HorizontalNavMenuLink:Oe},mixins:[he],props:{item:{type:Object,required:!0}},setup:function(e){var t=ve(e.item),n=t.isActive,o=t.updateIsActive,i=t.isOpen,a=t.updateGroupOpen,r=Object(oe["a"])(),l=r.t,s=Object(ie["a"])(),c=s.canViewHorizontalNavMenuHeaderGroup;return{isOpen:i,isActive:n,updateGroupOpen:a,updateIsActive:o,resolveHorizontalNavMenuItemComponent:ae["d"],canViewHorizontalNavMenuHeaderGroup:c,t:l}}},Ne=Te,He=Object(y["a"])(Ne,de,me,!1,null,null,null),Ve=He.exports,Be={components:{HorizontalNavMenuHeaderLink:pe,HorizontalNavMenuHeaderGroup:Ve},props:{items:{type:Array,required:!0}},setup:function(){var e=function(e){return e.children?"horizontal-nav-menu-header-group":"horizontal-nav-menu-header-link"};return{resolveNavComponent:e}}},Pe=Be,Ee=Object(y["a"])(Pe,Z,ee,!1,null,null,null),De=Ee.exports,Ge={components:{HorizontalNavMenuItems:De},setup:function(){return{navMenuItems:X}}},Se=Ge,Fe=(n("1b3e"),Object(y["a"])(Se,F,$,!1,null,null,null)),$e=Fe.exports,Re=n("2c28"),qe=n("32b8"),Ue={watch:{$route:function(){this.$store.state.app.windowWidth<M["a"].xl&&(this.isVerticalMenuActive=!1)}}},We={components:{AppBreadcrumb:l["a"],AppNavbarHorizontalLayout:x,AppNavbarHorizontalLayoutBrand:z,AppFooter:T["a"],HorizontalNavMenu:$e,BNavbar:H["a"],LayoutContentRendererDefault:P["a"],LayoutContentRendererLeft:E["a"],LayoutContentRendererLeftDetached:D["a"],VerticalNavMenu:Re["a"]},mixins:[Ue],computed:{layoutContentRenderer:function(){var e=this.$route.meta.contentRenderer;return"sidebar-left"===e?"layout-content-renderer-left":"sidebar-left-detached"===e?"layout-content-renderer-left-detached":"layout-content-renderer-default"}},setup:function(){var e=Object(N["a"])(),t=e.skin,n=e.navbarType,o=e.footerType,i=e.routerTransition,a=e.isNavMenuHidden,r=Object(qe["a"])(n,o),l=r.isVerticalMenuActive,s=r.toggleVerticalMenuActive,c=r.overlayClasses,u=r.resizeHandler;u(),window.addEventListener("resize",u),Object(V["onUnmounted"])((function(){window.removeEventListener("resize",u)}));var p=S(n,o,l),d=p.navbarMenuTypeClass,m=p.layoutClasses,v=p.footerTypeClass,h=B(),f=h.scrolledTo;return{skin:t,layoutClasses:m,navbarType:n,navbarMenuTypeClass:d,isNavMenuHidden:a,routerTransition:i,footerTypeClass:v,scrolledTo:f,isVerticalMenuActive:l,toggleVerticalMenuActive:s,overlayClasses:c}}},Je=We,Ye=(n("80a5"),Object(y["a"])(Je,a,r,!1,null,null,null)),Ke=Ye.exports,Qe=n("4778"),Xe={components:{LayoutHorizontal:Ke,AppCustomizer:Qe["a"]},data:function(){return{showCustomizer:M["c"].layout.customizer}}},Ze=Xe,et=Object(y["a"])(Ze,o,i,!1,null,null,null);t["default"]=et.exports},"80a5":function(e,t,n){"use strict";n("f249")},e8f6:function(e,t,n){},f249:function(e,t,n){}}]);
//# sourceMappingURL=chunk-3d336d2c.da16fc8c.js.map