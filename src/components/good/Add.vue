<template>
  <div>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="addForm.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="inventory">
          <el-input v-model="addForm.inventory"></el-input>
        </el-form-item>
        <!-- 添加商品的按钮 -->
        <el-button type="primary" @click="add">添加商品</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 添加商品的表单数据对象
      addForm: {
        goodsName: '',
        price: 0,
        inventory: 0
      },
      addFormRules: {
        goodsName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        inventory: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ]
      },
      abc: false,
      wuping:{
        goodsName : '', // 清空数据
        price : '',
        inventory : ''
      }
    }
  },
  created () {},
  methods: {
    add () {
      this.$refs.addFormRef.validate(async valid =>
      {
        if(!valid) return
        const {data:res} = await this.$http.post
        ('addGood', this.addForm)

        if(res.meta.status !== 200) {
          this.$message.error('添加商品失败！')
        }
        this.$message.success('添加商品成功！')
      })
      this.$router.push('/list')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
