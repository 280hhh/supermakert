<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @click="goAddpage">
            <el-button slot="append" icon="el-icon-search" @click="goAddpage"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
        </el-row>
      <!-- table表格区域 -->
      <el-table :data="goodslist" border>
        <el-table-column label="商品名称" prop="goodsName"></el-table-column>
        <el-table-column label="商品价格（元）" prop="price"></el-table-column>
        <el-table-column label="商品数量">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.inventory"
              @change="handleChange"
              :min="1"
              :max="10"
            ></el-input-number>
            </template>
        </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.flag"
              @change="change1"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 查询参数对象
      val: true,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 商品列表
      goodslist: [],
      // 总数据条数
      total: 0,
      goodsNum1: 1
    }
  },
  created () {
    this.getgood()
  },
  methods: {
    async getgood () {
      const res = await this.$http.get('/getAllGoods')
      this.goodslist = res.data
      console.log(this.goodslist)
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
    },
    goAddpage () {
      this.$router.push('/add')
    },
    async change1 (userinfo) {
      console.log(userinfo)
      const {data:res} = await this.$http.put('/changGoodsFlag?goodsName=userinfo.goodsName&flag=userinfo.goodsName')
    },
    handleChange () {
      console.log(this.goodsNum1)
    },
    mounted () {
    }
  }
}
</script>

<style lang="less" scoped>
</style>
