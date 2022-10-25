<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <!-- 修改信息 -->
            <el-table-column label="标题" width="180">
                <template slot-scope="scope">
                    <el-input v-model=" scope.row.articleTitle" :disabled="scope.row.articleBol">
                    </el-input>
                    
                </template>
            </el-table-column>
            <el-table-column label="描述" width="180">
                <template slot-scope="scope">     
                <el-input v-model="scope.row.articleDesc " :disabled="scope.row.articleBol">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleInput( scope.row)">{{!scope.row.articleBol ? "保存":"编辑"}}</el-button>
                    <el-button size="mini" type="danger" @click="handleSubmit(scope.$index, scope.row)">提交</el-button>
                </template>
            </el-table-column>

            <!-- 修改封面 -->
            <el-table-column label="修改封面" width="180">
                <template slot-scope="scope">
                    <el-image style="width: 60px; height: 60px" :src="'/node/'+scope.row.articleImgUrl" :fit="'fill'">
                    </el-image>
                    <el-upload
                        class="upload-demo"
                        action="/node/root/changeImg"
                        :limit="1"
                        :data="{articleImgUrl:scope.row.articleImgUrl,id:scope.row._id}"
                        :on-success="function(res){handlerChangeImg(res,scope.row)}">
                        <el-button size="small" type="primary">上传</el-button>
                        </el-upload>

                </template>
            </el-table-column>
            <el-table-column label="修改文档" width="180">
                <template slot-scope="scope">
                    <el-button @click="handlerRouter(scope.row)">修改文档</el-button>
                </template>
            </el-table-column>
            <!-- 删除 -->
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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
    name: "AdminArticleManage",
    data() {
        return {
            total:0,
            tableData: [],
            newData:[]
        }
    },
    methods: {
        //获取十项文章数据
        async getArticleAll() {
            let { data } = await this.$axios.get("/node/root/getall");
            this.tableData = data.data;
            this.total=data.bol;
            this.newData.push(...data.data)
        },
        //是否编辑
        handleInput(bol){
                bol.articleBol=!bol.articleBol
        },//修改标题 描述信息
      async  handleSubmit(index,value){
           await this.$axios.post("/node/root/changeinfo",{
                articleDesc:value.articleDesc,
                articleTitle:value.articleTitle,
                id:value._id

            });
           
        },
        //修改封面
        handlerChangeImg(res, file){
            
            file.articleImgUrl =res   

        },
       //删除文件
       async handleDelete(index, row) {
            
       await this.$axios.post("/node/root/deletearticle",{
              
                id:row._id

            });
            this.tableData.splice(index,1)
        },
        //分页请求文件
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

        //修改文章
        handlerRouter(val){
            console.log(val);
            this.$router.push({path:"/AdminArticleBase/123",query:{info:val.articleMdUrl,id:val._id}})
        },


    },
    created() {
        this.getArticleAll()
    },
}

</script>

<style lang='less' scoped>
.el-upload-list{

    display: none;
}
</style>
