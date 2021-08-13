import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import $http from '@/utils/request.js'
import 'video.js/dist/video-js.css'

// const loadFail = `this.className="fail-img",this.src="${require('@/images/loadFail.png')}"`

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$http = $http
Vue.prototype.resize = function () {
  // document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
  $(function () {
    //内容区  自适应  整体缩放
    var testW = $("#app").width();
    var testH = $("#app").height();

    function autoScale() {
      var width = $(window).width();
      var height = $(window).height();
      var xScale = width / testW;
      var yScale = height / testH;
      var marginTop = testH - height;
      var marginLeft = testW - width;
      $("#app").css({
        "transform": "scale(" + xScale + "," + yScale + ") translate3d(0,0,0)",
        "margin-top": -marginTop / 2,
        "margin-left": -marginLeft / 2,
      });
      $("body").css({
        "height": height + "px",
        "width": width + "px",
      })
      //		console.log(-marginTop,-marginLeft);
    }
    autoScale();
    window.onresize = function () {
      autoScale();
    }
  })
}
Vue.use(ElementUI);
Vue.config.productionTip = false
import './icons'
import './common/style/style.css'
import './mock.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
