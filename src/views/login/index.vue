<template>
  <div ref="login" class="login-container">
    <div class="banxin">
      <div ref="animationContainer" class="animationContainer">
        <canvas />
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="off" label-position="left" @submit.native.prevent>

        <div class="title-container">
          <h3 class="title">Hi,</h3>
          <h3 class="title">欢迎登录深圳拓保DCP</h3>
        </div>
        <div class="form-item-title">账号</div>
        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="off"
          />
        </el-form-item>
        <div class="form-item-title">密码
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </div>
        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="off"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <div class="keepPassword">
          <span>忘记密码？</span>
        </div>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

        <div class="tips">
          <div style="margin-right:20px;font-weight:bold;">Tips:</div>
          <div style="margin-right:20px;">username: {{ user_list }}</div>
          <div> password: any</div>
        </div>

      </el-form>
    </div>
    <div class="copyright">Copyright © Shenzhen Tobo Software Co.,Ltd</div>
  </div>
</template>

<script>
import { validUsername, valid_map } from '@/utils/validate'
import { init } from './animation'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('格式错误'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('格式错误'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: '',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      user_list: valid_map
    }
  },
  computed: {
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
    /* autocompleteList: {
      deep: true
    } */
  },
  mounted() {
    // 初始化threejs动画
    init(this.$refs.animationContainer)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((response) => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* 覆盖 element-ui 样式 */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 0;
      color: #21333F;
      height: 47px;
      caret-color: $cursor;
      border-bottom: 1px solid #CACACA ;

      /* &:-webkit-autofill { // 浏览器表单自动填充
        box-shadow: 0 0 0px 1000px #CACACA inset !important;
        -webkit-text-fill-color: $cursor !important;
      } */
    }
  }

  .el-form-item.is-success .el-input__inner,
  .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
      border-color: #CACACA;
  }
  .el-form-item {
    background-color: transparent;
    font-size: 16px;
    color: #21333F;
    position: relative;
    .el-form-item__content {
      .el-form-item__error {
        position: absolute;
        right: 0;
        top: 0;
        left: auto;
        height: calc(100%-1px);
        width: 88px;
        line-height: 40px;
        text-align: right;
        background-color: #fff;
      }
    }
  }

}
</style>

<style lang="scss" scoped>
$dark_gray:#889aa4;
$light_gray:#eee;
$main_hue: #2C9EF7; // 主色调

@media screen and (max-width: 1480px) {
  .login-container {
    background: none !important;
    .banxin {
      background: url('../../assets/login/login_bg@2x.png') no-repeat 0 0;
      background-size: cover;
    }
  }
}

.login-container {
  height: 100%;
  width: 100%;
  min-width: 1480px;
  min-height: 820px;
  overflow: hidden;
  position: relative;
  background: url('../../assets/login/login_bg@2x.png') no-repeat 0 0;
  background-size: cover;

  .banxin {
    position: relative;
    width: 1480px;
    height: 100%;
    margin: 0 auto;

    .animationContainer {
      position: absolute; left:0px; top:0px; right:500px; bottom:0; pointer-events: none;z-index: 9999;

      canvas {
        width: 100%;height: 100%;position: absolute;left: 0;top: 0;transform: rotate(180deg);
      }
    }
  }

  .login-form {
    position: absolute;
    top: 326px;
    right: 0;
    width: 320px;
    margin: 0 auto;

  }

  .tips {
    font-size: 14px;
    color: #000;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    margin-bottom: 80px;

    .title {
      font-size: 24px;
      color: $main_hue;
      margin-bottom: 9px;
      margin-top: 0;
      text-align: left;
      font-weight: bold;
    }
  }

  .form-item-title {
    font-size: 14px;
    color: #5F717D;
    font-family: Microsoft YaHei;
    position: relative;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .keepPassword {
    color: $main_hue;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    position: relative;
    height: 40px;

    span {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      cursor: pointer;
    }
  }

  .copyright {
    font-size: 14px;
    font-weight: bold;
    font-family: MicrosoftYaHei;
    color: #85B5FF;
    text-align: center;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 22px;
  }
}
</style>
