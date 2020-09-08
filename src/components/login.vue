<template>
    <div class="login-container">
        <div class="login_box" v-if="!abc">
            <div class="avatar_box">
                <img src="../assets/1.png" alt="">
            </div>
            <el-form ref="loginformref" :model="loginform" :rules="loginformrules" label-width="0px" class="login_form">
                <el-form-item prop="zhangHao">
                    <el-input v-model="loginform.zhangHao" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                 <el-form-item prop="miMa">
                    <el-input v-model="loginform.miMa" prefix-icon="el-icon-lock" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="abc=!abc">注册</el-button>
            </el-form-item>
            </el-form>
        </div>
        <div class="regist_box" v-else >
          <el-form ref="signformref" :model="registform" label-width="0px" class="regist_form">
                <el-form-item prop="userName">
                    <el-input v-model="registform.userName" prefix-icon="el-icon-box" placeholder="昵称"></el-input>
                </el-form-item>
                <el-form-item prop="zhangHao">
                    <el-input v-model="registform.zhangHao" prefix-icon="el-icon-user-solid" placeholder="账号"></el-input>
                </el-form-item>
                 <el-form-item prop="miMa">
                    <el-input v-model="registform.miMa" prefix-icon="el-icon-lock" type="password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                <el-button type="primary" @click="regist">注册</el-button>
                <el-button type="info" @click="abc=!abc">取消</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginform: {
        zhangHao: 'admin',
        miMa: '1234'
      },
      registform: {
        userName: 'aaa',
        zhangHao: 'admin',
        miMa: '1234'
      },
      abc: false,
      loginformrules: {
        /* username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 14, message: '长度在 6 到 14 个字符', trigger: 'blur' }
        ] */
      }
    }
  },
  methods: {
    async regist () {
      const _this = this
      const date = await this.$http.post('/register',null, { params: _this.registform })
      if (date.data !== '注册成功') return this.$message.error(date.data)
      this.$message.success(date.data)
      this.abc = false
    },
    async login () {
      const _this = this
      const res = await this.$http.get('/login',{ params: _this.loginform })
      if (res.data.status !== 1) return this.$message.error('登录失败')
      this.$message.success('登录成功')
      window.sessionStorage.setItem('token', res.data.status)
      this.$router.push('/welcome')
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
   background-color: antiquewhitea;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: aliceblue;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    box-shadow: 0 0 1px;
    .avatar_box{
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #eee;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.regist_box{
    width: 450px;
    height: 300px;
    background-color: aliceblue;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    box-shadow: 0 0 1px;
}
.regist_form{
  position: absolute;
    bottom: 0;
    width: 100%;
    padding: 30px 20px;
    height: 100%;
    box-sizing: border-box;
}
.btn{
    display: flex;
    justify-content: flex-end;
}
</style>

<style>

/* .el-input__inner{
    background-color: #ffffff00!important;
    border:0!important;
    border-radius: 0!important;
    color: #fff!important;
    display: block!important;
    outline: 0!important;
    border-bottom: 1px solid rgb(199, 191, 219)!important;
}
.el-button--primary {
  background-color: #ffffff00!important;
}
.el-button--info {
  background-color: #ffffff00!important;
} */

</style>
