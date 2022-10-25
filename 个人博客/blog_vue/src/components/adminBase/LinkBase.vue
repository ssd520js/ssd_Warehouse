<template>
  <div>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="博客名"
      width="140">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.blogName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="博客地址"
      width="140"
      height="15">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.blogOrigin
 }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="博客logo地址"
      width="140"
      height="15">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.blogLogin }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="博客描述"
      width="140">
      <template slot-scope="scope"> 
        <span style="margin-left: 10px">{{ scope.row.blogMessage }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="是否推荐中"
      width="140">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.blogLinkHot }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">推荐</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
name:"LinkBase",
data() {
      return {
        tableData: []
      }
    },
    methods: {
      //设置是否为推荐
     async handleEdit(index, row) {
      row.blogLinkHot=!row.blogLinkHot
      let {data}= await this.$axios.post("/node/user/sethotlists",{blogLinkHot:row.blogLinkHot,id:row._id})
      
        
      },
      handleDelete(index, row) {
       
      },
      //获取友链信息
      async getLinks() {
      let { data } = await this.$axios.get("/node/user/getlinks")
      
       this.tableData=data
      
    }
    },
    created() {
    this.getLinks()
  }
}
</script>

<style lang="less" scoped>
 /deep/ .el-table .cell{
     width: 160px;
     height: 23px;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
   }
</style>>

