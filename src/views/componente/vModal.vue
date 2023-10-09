<template>
	<div class="vModal" :class="{ sideBar, sideBarOverlay }" :style="sideBar ? {maxWidth: `${maxWidth[size]}px`, left: 'auto', width: '100%'} : {overflowY: 'auto'}">
		<div class="sideBarOverlay"></div>
			<div class="vModelOverlay" ref="overlay">
				<div class="vModalContainer" :style="!sideBar ? {maxWidth: `${maxWidth[size]}px`} : {}">
					<div class="vModalHeader">
						<span class="text">{{titulo}}</span>
						<div class="icons d-flex align-items-center justify-content-end flex-grow-1">
							<slot name="optiosnHeader"></slot>
							<a class="vModalClose" @click.prevent="closeModal" href="#" v-if="closeActive">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
									<path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
							</a>
						</div>
					</div>
					<div class="vModelContent">
						<slot></slot>
					</div>
					<div class="vModalFooter" v-if="footer">
						<slot name="footer"></slot>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
export default {

  name: 'vModal',
  props: {
  	titulo:{
  		type: String,
  		default: 'Titulo'
  	},
  	size: {
  		type: String,
  		default: 'sm'
  	},
  	footer: {
  		type: Boolean,
  		default: false
  	},
  	overlayClose: Boolean,
  	sideBarOverlay: Boolean,
  	sideBar: Boolean,
  },
  data () {
    return {
    	closeActive: true,
    	element: null
    }
  },
  computed:{
  	maxWidth(){
  		return {
  			'xxs': 450,
  			'xs': 700,
  			'sm': 800,
  			'md': 920,
  			'lg': 1400
  		}
  	},
  	closeOverlay(){
  		return (a)=>{
  			let _overlay = this.$refs['overlay'];
  			if(a.target == _overlay)
  				this.closeModal();
  		}
  	}
  },
  mounted() {
  	if(!this.sideBar)
	  	document.body.insertBefore(this.$el, null);

	  if(!this.sideBar || this.sideBarOverlay)
	  	document.body.style.overflowY = 'hidden';
  	
  	if(this.overlayClose)
	  	window.addEventListener('click', this.closeOverlay);
  },
  destroyed(){
  	document.body.style.overflowY = '';
  	if(this.overlayClose)
  		window.removeEventListener('click', this.closeOverlay);
  },
  methods:{
  	closeModal(value){
  		this.$emit('close', value);
  	},
  	closeState(value){
  		if([undefined, null, ''].indexOf(value)){
  			this.closeActive = value;
  		}else{
  			this.closeActive = !this.closeActive;
  		}
  	},
  }
}
</script>

<style lang="css" scoped>
.sideBarOverlay {
  position: fixed; /* Sit on top of the page content */
  display: block; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  z-index: 1; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
	transition: display .5s;
}
.vModal {position: fixed; z-index: 1050; inset: 0;}
.icons > *+* {margin-left: 1rem;}
.vModelOverlay {position: relative; min-height: 100%; padding:20px; display: flex; flex-direction: column; inset: 0;background: #00000080;z-index: 1;}
.vModalContainer {width: 100%;margin: 0 auto;border-radius: 6px; background: #fff;z-index: 2;position: relative;}
.vModalHeader, .vModalFooter {padding: 20px 25px;line-height: 1;font-size: 18px;font-weight: 500;background: #fbfbfb;z-index: 6;position: sticky;display: flex; align-items: center; justify-content: space-between;}
.vModalHeader {top: 0;border-radius:6px 6px 0 0; border-bottom: 1px solid #ebe9f1;}
.vModalFooter {bottom: 0;border-radius:0 0 6px 6px; border-top: 1px solid #ebe9f1;}
.vModelContent {z-index: 0; padding: 20px 25px;}
.vModalClose {width: 1.25em;display: flex;justify-content: center;font-size: 25px;color: #000000;opacity: 0.5;}
.vModalClose svg {width: auto;display: block;height: 1em;fill: currentColor;}
.vModal.sideBar .vModelOverlay {background: transparent;padding: 0;height: 100%;}
.vModal.sideBar .vModalContainer {border-radius: 0;box-shadow: 0px 0 10px #00000026;margin-right: 0;pointer-events: auto;overflow-y: auto;min-height: 100%;}
.vModal.sideBar.sideBarOverlay .vModelOverlay::before {content: '';background: #000000;display: block;width: 100vw;height: 100vh;right: 100%;position: absolute;top: 0;opacity: 0.5;cursor: pointer;}

.fade-enter-active, .fade-leave-active {
  transition: opacity ease 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

.slide-to-left-enter-active, .slide-to-left-leave-active {
  transition: transform ease 0.4s
}
.slide-to-left-enter, .slide-to-left-leave-to {
  transform:translateX(100%);
}

.slide-to-left-enter-active.vModal.sideBar.sideBarOverlay .vModelOverlay::before, .slide-to-left-leave-active.vModal.sideBar.sideBarOverlay .vModelOverlay::before {
  transition: opacity ease 0.4s
}
.slide-to-left-enter.vModal.sideBar.sideBarOverlay .vModelOverlay::before, .slide-to-left-leave-to.vModal.sideBar.sideBarOverlay .vModelOverlay::before{
  opacity: 0;
}


</style>