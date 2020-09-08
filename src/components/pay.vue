<template>
  <div>
 <el-form :inline="true">
  <el-form-item>
    <el-input v-model="number" placeholder="充值金额"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit(number)">充值</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
data() {
      return {
        number:''
      }
    },
    methods: {
      async onSubmit(a) {
        const {data:msg} = await this.$http.put('/addBalance',null,{params:{number:a}})
        this.$message.success(msg+a+'元')
      }
    }
  }
</script>

<style>

</style>
