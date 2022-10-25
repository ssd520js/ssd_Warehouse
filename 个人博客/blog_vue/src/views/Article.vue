<template>
  
<div>
  <div class="Article_box">
            <h2><i class="el-icon-notebook-1">文章展示</i></h2>
        </div>

        <hr>
        <div>
          <div>
            <el-row>
  <el-col :span="12" v-for="(o, index) in tableData" :key="index" :offset="index > 0 ? tableData : 0">
    <el-card :body-style="{ padding: '0px' }">
      <img :src="'/node/'+o.articleImgUrl" class="image">
      <div style="padding: 14px;">
        <p>主题:{{o.articleTitle}}</p>
        <span>描述:{{o.articleDesc}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ o.articleDate.split("-")[0]+"年"+ o.articleDate.split("-")[1]+"月"}}</time>
          <el-button type="text" class="button" @click="handlerArticle(o)">查看</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>

          </div>
        </div>
        <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange">
</el-pagination>
</div>
</template>

<script>

export default {
  name:"Article",
  data() {
        return {
            total:0,
            tableData: [],
            newData:[]
        }
    },
  methods:{
    //请求数据
    async getArticleAll() {
            let { data } = await this.$axios.get("/node/root/getall");
            this.tableData = data.data;
            this.total=data.bol;
            this.newData.push(...data.data)
        },
      
       //分页请求
       async  currentChange(number){
        this.tableData  = this.newData.slice((number-1) * 10,number * 10)
        if(this.tableData.length) return;
        number = number * 10 - 10
        let {data} = await this.$axios.post("/node/root/getarticle", {
           number
        });
        this.tableData  = data
        this.newData.push(...data)
        }, 
        handlerArticle(val){
        this.$router.push({path:"/article/123",query:{info:val.articleMdUrl,id:val._id}})
       },
      },
      created() {
        this.getArticleAll()
    },

}
</script>

<style lang="less" scoped>
.Article_box{
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
// .time {
//     font-size: 13px;
//     color: #999;
//   }
  
//   .bottom {
//     margin-top: 13px;
//     line-height: 12px;
//   }

//   .button {
//     padding: 0;
//     float: right;
//   }

//   .image {
//     width: 100%;
//     display: block;
//   }

//   .clearfix:before,
//   .clearfix:after {
//       display: table;
//       content: "";
//   }
  
//   .clearfix:after {
//       clear: both
//   }
  /deep/ .el-col-offset-2{
    margin-left: 0;
  }
  img{
   width: 360px;
  }
</style>>

