<template>
  <div id="dy-login">
      <div class="bg-img">
          <div 
            v-for="(bgitem,index) in bgList" 
            :key="index" 
            v-show="index==mark"
            :style="{backgroundImage: 'url('+bgitem+')'}"
            class="bg-item"></div>
      </div>
  </div>
</template>

<script>
import bg1 from '../assets/images/bg/1.jpg';
import bg2 from '../assets/images/bg/2.jpg';
import bg3 from '../assets/images/bg/3.jpg';
import bg4 from '../assets/images/bg/4.jpg';


export default {
    name: 'login',
    data() {
        return {
            mark: 0,
            bgList: [bg1, bg2, bg3, bg4],
            bgInterval: null
        }
    },
    methods: {
        autoPlay() {
            if(this.mark < 3) {
                this.mark++;
            } else {
                this.mark = 0;
            }
        },
        
    },
    mounted() {
        this.bgInterval = setInterval(this.autoPlay, 2000)
    },
    destroyed() {
        clearInterval(this.bgInterval);
    }

};
</script>

<style lang="scss" scoped>
#dy-login,.bg-img {
    height: 100%;
    width: 100%;
}
.bg-item {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>