<template>
	<GmapMap
	:center="position"
	:zoom="zoom"
	map-type-id="terrain"
	style="width: 100%; height: 350px"
	>
	<GmapCircle
  	:center="position"
  	:radius="350"
  	:options='{
      strokeColor: "#ea5455",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#ea5455",
      fillOpacity: 0.35,
    }'
  />
	<!-- <GmapMarker
    :position="position"
    @click="resetMap"
  /> -->
</GmapMap>
</template>

<script>
	export default {

		name: 'Map',
		props:{
			data:{
				type: Object,
			}
		},
		data () {
			return {
				map:{
					open: true,
				},
				zoom: 16
			}
		},
		computed: {
			position(){
				return {
					lat: Number(this.data.latitud),
					lng: Number(this.data.longitud),
				}
			}
		},
		methods:{
			resetMap(){
				this.zoom = 16;
			},
		}
	}
</script>

<style lang="css">
	.titleMap {font-size: 14px;font-weight: 600;text-transform: uppercase;margin-bottom: 10px;}

	.infoMap {padding: 0;list-style: none;margin: 0;font-size: 12px;}

	.infoMap b {font-weight: 500;}
</style>