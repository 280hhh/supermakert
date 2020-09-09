<template>
<el-container>
  <el-header>
       <el-menu default-active="/welcome" class="el-menu-demo" mode="horizontal" router>
         <el-menu-item index="/welcome">主页</el-menu-item>
  
  <el-menu-item index="/pay">充值中心</el-menu-item>
  <el-menu-item index="/list" v-if="a===1">商品管理</el-menu-item>
  <el-menu-item ><el-button type="primary" @click="exit">退出</el-button></el-menu-item>
</el-menu>
  </el-header>
  <el-main>
    <router-view></router-view>
  </el-main>
</el-container>
</template>

<script>

export default {
  data () {
    return {
      a: global.admin
    }
  },
  created () {
    this.getadmin()
  },
  methods: {
    async exit () {
      const {data:msg} = await this.$http.post('/logout')
      window.sessionStorage.clear()
      this.$message(msg)
      this.$router.push('/login')
    },
    async getadmin () {
      const res = await this.$http.get('/admin')
      this.a = res.data.administor
    }
  }
}
</script>

<style>

</style>
