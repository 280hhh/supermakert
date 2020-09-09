<template>
  <div>
      <el-card>
          <el-table
    :data="tableData"
    border
   width="100%" class="aaa">
    <el-table-column type="index">
    </el-table-column>
    <el-table-column
      prop="goodsName"
      label="商品">
    </el-table-column>
    <el-table-column
      prop="price"
      label="单价">
    </el-table-column>
    <el-table-column
      prop="inventory"
      label="库存"
>
    </el-table-column>
    <el-table-column
      label="数量">
      <template slot-scope="scope">
        <el-input-number v-model="scope.row.num" @change="handleChange(scope.row.num)" size="mini" :min="0" :max="99" label="描述文字">
     </el-input-number>
      </template>
     </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.flag==0?0:1">购买</el-button>
      </template>
    </el-table-column>
  </el-table>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getgood()
  },
  methods: {
    async handleEdit (index, row) {
      const aa = row
      if(row.flag==0) return this.$message.error('商品未上架');
      else{const msg = await this.$http.put('/buy',null,{params: {"goodsName":aa.goodsName,"number":aa.num}} )
      this.$message.success(msg.data);}
      
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleChange (value) {
      console.log(value)
      console.log(this.tableData)
    },
    async getgood () {
      const res = await this.$http.get('/getAllGoods')
      this.tableData = res.data
      this.tableData.map(v => {
        // v.num=0   刚开始这样赋值，不可行
        this.$set(v, 'num', 1)
      })
    }
  }
}
</script>

<style>
.aaa{
  overflow:hidden;
}
</style>
