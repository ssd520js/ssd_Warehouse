<template>
 <div> <div class="admin_box"><h2><i class="el-icon-menu">管理界面</i></h2></div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="修改密码" name="first">
      <div>
        密码:<el-input size="smail" placeholder="修改密码" v-model="inputPass"></el-input>
      </div>
      <el-button @click="handlerpass" type="primary" size="smail">确认修改</el-button>
    </el-tab-pane>
    <el-tab-pane label="友链管理" name="second">
      <LinkBase />
    </el-tab-pane>
    <el-tab-pane label="发表文章" name="third"><AdminSubmitArticle /></el-tab-pane>
    <el-tab-pane label="文章管理" name="fourth"><AdminArticleManage /></el-tab-pane>
  </el-tabs></div>
</template>

<script>
import AdminSubmitArticle from '@/components/adminBase/AdminSubmitArticle';
import LinkBase from '@/components/adminBase/LinkBase';
import AdminArticleManage from '@/components/adminBase/AdminArticleManage';
export default {
    name:"Admin",
  components: { AdminSubmitArticle ,LinkBase,AdminArticleManage},
  data() {
      return {
        activeName: 'second',
        inputPass:""
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handlerpass(){
       let {data}= this.$axios.post("/node/root/changeroot",{
        inputPass:this.inputPass
        })
        this.$message.success(data)
      }
    }

}
</script>

<style lang="less" scoped>
 .admin_box{
  width: 100%;
    height: 150px;
    background-color: rgb(196, 196, 196);
    border-radius: 8px;
    ;

    h2 {
      padding-left: 5px;
      padding-top: 50px;
    }

 }
</style>>

