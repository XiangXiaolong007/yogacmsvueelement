<template>
  <div id="dy-login">
    <div class="bg-img">
      <!-- 列表元素：注意group的直接子元素是v-for渲染出来的 -->
      <transition-group tag="ul" name="bgList">
        <li v-for="(bgitem,index) in bgList" :key="bgitem" v-show="index==mark">
          <div :style="{backgroundImage: 'url('+bgitem+')'}" class="bg-item"></div>
        </li>
      </transition-group>
    </div>
    <transition name="fade">
      <div class="login-content" v-if="hide">
        <div class="logo">
          <img class="logo-img" src="../assets/images/logo.png" alt="daily yoga logo" />
          <h3>DAILY YOGA</h3>
        </div>
        <div class="form-login">
          <!-- 登录界面 -->
          <h3 class="form-title">请登录</h3>
          <el-input
            placeholder="请输入用户名"
            v-model="username"
            prefix-icon="fa fa-user"
            clearable
            class="input">
          </el-input>
          <el-input 
            placeholder="请输入密码" 
            v-model="password" 
            clearable
            type="password"
            prefix-icon="fa fa-lock"
            class="input">
          </el-input>
          <div class="login-btn">
            <el-button 
              type="primary"
              @click="login">
              登录<i class="fa fa-hand-o-right"></i>
            </el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import bg1 from "../assets/images/bg/1.jpg";
import bg2 from "../assets/images/bg/2.jpg";
import bg3 from "../assets/images/bg/3.jpg";
import bg4 from "../assets/images/bg/4.jpg";
import qs from 'qs';

export default {
  name: "login",
  data() {
    return {
      mark: 0,
      bgList: [bg1, bg2, bg3, bg4],
      bgInterval: null,
      hide: false,
      username: '',
      password: ''
    };
  },
  methods: {
    autoPlay() {
      if (this.mark < 3) {
        this.mark++;
      } else {
        this.mark = 0;
      }
    },
    
  login() {
    let model = {
      username: this.username,
      password: this.password
    };
    this.axios
      .post("login/login", qs.stringify(model))
      .then(res => {
        if(res) {
          let _data = res.data;
          this.$message({
            message: "登录成功",
            type: "success"
          });

          // user name
          localStorage.setItem("DailyYoga.NADMIN", _data.n_admin);
          // auth required
          localStorage.setItem("DailyYoga.SADMIN", _data.s_admin);
          localStorage.setItem("DailyYoga.UADMIN", _data.u_admin);
          this.$router.push("/");
        }
      })
      .catch(() => {
        this.$message({
          message: "登录出错",
          type: "error"
        });
      });
    }
  },
  mounted() {
    this.bgInterval = setInterval(this.autoPlay, 2000);
    this.hide = true;
  },
  destroyed() {
    clearInterval(this.bgInterval);
  }
};
</script>

<style lang="scss" scoped>
#dy-login,
.bg-img,
ul,
li {
  height: 100%;
  width: 100%;
}
.bg-item {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
.bgList-enter,
.bgList-leave-to {
  opacity: 0;
}
.bgList-enter-active,
.bgList-leave-active {
  transition: all 4s;
}
.bgList-leave,
.bgList-enter-to {
  opacity: 1;
}
.bg-img {
  position: fixed;
  z-index: -3333;
}
.bg-img li {
  position: absolute;
}
.fade-enter-active {
  transition: all 1s ease;
}
.fade-enter {
  transform: translateY(-20px);
  opacity: 0;
}
.login-content {
  overflow: hidden;
  text-align: center;
  .logo {
    margin: 60px auto 20px auto;
    padding: 15px;
    font-size: 50px;
    color: #fff;
    font-weight: bold;
    .logo-img {
      width: 90px;
      height: 90px;
    }
    h3 {
      font-size: 33px;
      font-weight: 300;
      margin-top: 20px;
      margin-bottom: 10px;
    }
  }
  .form-login {
    width: 360px;
    padding: 20px 30px 15px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.4);
    margin-bottom: 0px;
    border-radius: 7px;
    .form-title {
      color: #fff;
      font-size: 23px;
      margin-top: 20px;
      margin-bottom: 10px;
      text-align: left;
      font-weight: 300;
    }
    .input {
      margin-bottom: 15px;
    }
    .login-btn {
      text-align: left;
    }
    .fa-hand-o-right {
      margin-left: 5px;
    }
  }
}
</style>