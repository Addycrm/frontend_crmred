<template>
	<section id="Banner" class="sectionTemplate py-0">
		<div class="slider " ref="slider">
				<div class="wrapperSlick" v-if="images.length > 0" >
							<div class="banner-container" v-for="(item,index) in images" :key="item.id" :class="{ 'active': index===posBanner }">
									<img class="img-banner" :srcset="item.url" alt="Banner" :style="{'max-width': item.width,'height': item.height }">
						</div>
						<!-- <a class="carousel-control-prev button-carrousel" role="button" data-slide="prev" @click="prevIMage()">
							<span class="carousel-control-prev-icon" aria-hidden="true"></span>
							<span class="sr-only">Previous</span>
						</a>
						<a class="carousel-control-next button-carrousel" role="button" data-slide="next" @click="nexImage()">
							<span class="carousel-control-next-icon" aria-hidden="true"></span>
							<span class="sr-only">Next</span>
						</a> -->
				</div>
			</div>
	</section>
</template>

<script>
	export default {

		name: 'Banner',
		data(){
			return {
				posBanner:0,
        interval:null
			}
		},
    props:{
      images:{
        type:Array
      }
    },
    mounted() {
      this.autoIncrement()
    },
    destroyed() {
      clearInterval(this.interval)
    },
		methods:{
			autoIncrement(){
				this.interval=setInterval(()=> {
          this.autoPlay()
        }
				,4000)
			},
      autoPlay(){
        this.nexImage()
      },
			nexImage(){
				if(this.posBanner<this.images.length-1){
					this.posBanner++
				}else{
					this.posBanner=0
				}
			},
			prevIMage(){
				if(this.posBanner>0){
					this.posBanner--
				}else{
					this.posBanner=this.images.length-1
				}
			}
		}
	}

</script>

<style lang="css" scoped>
	#Banner .slider {
		position: relative;
		display: flex;
		margin:0;
		--carousel-button-color: #170724;
		--carousel-button-bg: #fff;
		--carousel-button-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%),
		0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);

		--carousel-button-svg-width: 50px;
		--carousel-button-svg-height: 50px;
		--carousel-button-svg-stroke-width: 2.5;
		overflow: hidden;
    margin-left: 0rem;
    width: 750px;
	}
  .carousel-control-prev-icon,.carousel-control-next-icon{
    width: 40px;
    height: 40px;
  }
	.carousel__track{
		transform: none !important;
	}
	.wrapperSlick {
		display: block;
		width: 100%;
		padding: 0;
		flex-shrink: 0;
	}
	.banner-container {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
    align-items: center ;
		padding: 20px;
		width: 100%;
		display: none;
	}
.img-banner {
		inset: 0;
    object-fit: fill;
    margin: 0 auto;
    border-radius: 15px;
	}
	.button-carrousel{
		width: 5% !important;
	}

	.banner-container .content-banner {
		position: absolute;
		z-index: 1;
		color: #fff;
		font-size: 20px;
		width: 40%;
		max-width: 800px;
		display: flex;
		flex-direction: column;
		bottom: 4rem;
	}

	.banner-container .overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(45deg, #000, #0000);
		mix-blend-mode: multiply;
	}

	.banner-container .title-banner {
		font-size: 3em;
		line-height: 1.2;
		margin-bottom: 1rem;
		width: 100%;
	}

	.banner-container .text-banner {
		font-size: 1.1em;
		line-height: 1.8;
	}

	.banner-container .link-banner .btn {
		font-size: 1.1em;
		font-weight: 600;
		text-transform: uppercase;
	}

	.active{
		display: flex;
	}

	.banner-container .title-banner::after {
		content: '';
		display: block;
		border-bottom: 4px solid var(--tm-color);
		width: 2em;
		margin-top: 6px;
	}

  @media (max-width: 1400px) {
    #Banner .slider{
      margin: 0;
      width: 400px;
      margin: 0 auto;
    }
  }

  @media (max-width: 1290px) {
    #Banner .slider{
      margin: 0;
      width: 600px;
      margin: 0 auto;
    }
  }
  @media (max-width: 640px) {
    #Banner .slider{
      margin: 0;
      width: 100%;
      margin: 0 auto;
    }
  .img-banner {
    margin: 0 auto;
    width: 100% !important;
		max-height: 300px !important;
	}
  }

</style>