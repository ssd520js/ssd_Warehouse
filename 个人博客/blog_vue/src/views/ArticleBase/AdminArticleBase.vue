<template>
<div class="article_box">
        <mavonEditor 
        v-model="value"
        :boxShadow="false"
        @save="handlerSubmit"
        />
        <div class="icon-post" @click="$router.back()">
            <i class="el-icon-back"></i>
        </div>
    </div>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    name:"AdminArticleBase",
    components: {
        mavonEditor
    },
    data(){
        return {
            value:""
        }
    },
    methods:{
        //初始化获取数据
        async getmd(val){
            let {data} = await this.$axios.get("/node"+val)
            this.value=data
        },
        //修改内容
        async handlerSubmit(value,render){
          let {data} = await this.$axios.post("/node/root/changearticleinfo",{value,id:this.$route.query.id})
          console.log(data);
        }
    },
    created(){
       
       this.getmd(this.$route.query.info)
       
    },
   
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
 .icon-post{
    position: absolute;
    left: 15px;
    top: 0;
    width:30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    background: rgb(227, 227, 227);
    z-index: 10000;
}
</style>>

