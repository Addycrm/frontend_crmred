import { $themeConfig } from '@themeConfig'
export default {
  setup(){
    const { appName, appLogoImage } = $themeConfig.app;
    
    return{
      appLogoImage
    }
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
    empresa: {
      type: Object,
      required: true,
    },
    colors: {
      type: Object,
      required: true,
    },
    imgBg: {
      type: Object,
      required: true,
    },

  },
  computed: {
    
  },
  data() {
    const _date = new Date();
    let year = _date.getFullYear();
    return {
      year 
    };
  },
  methods:{
    stateValue(value){
      return ['', undefined, null].indexOf(value) == -1;
    },
  }
};