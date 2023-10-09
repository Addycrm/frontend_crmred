import Vue from 'vue'
import Toast from 'vue-toastification'

// Toast Notification Component Styles
import '@core/scss/vue/libs/toastification.scss'

/**
 * NOTE: If you are using other transition them make sure to import it in `src/@core/scss/vue/libs/notification.scss` from it's source
 */
Vue.use(Toast, {
  hideProgressBar: true,
  closeOnClick: false,
  closeButton: false,
  icon: false,
  timeout: 3000,
  transition: 'Vue-Toastification__fade',
   
})
// var data = { soundurl: 'http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3' }

// var audio = new Audio(data.soundurl)
// audio.play();
