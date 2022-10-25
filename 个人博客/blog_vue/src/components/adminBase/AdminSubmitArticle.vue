<template>
  <el-form ref="form"  label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="form.name" size="small" placeholder="输入标题"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input type="textarea" v-model="form.desc" size="small" placeholder="输入文章描述"></el-input>
    </el-form-item>
    <el-form-item label="上传文档" > 
      <el-upload ref="uploadmd" class="upload-demo" drag action="/node/root/articleMd"
       :limit="1" :on-success="handlerSuccess" :auto-upload="false" :on-change="handlerChange" :on-remove="handlerDelete">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-form-item>
    <el-form-item label="上传封面">
      <el-upload
  class="avatar-uploader"
  action="/node/root/articleImg"
  ref="uploadimg"
  :show-file-list="true"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  :on-remove="handlerDelete"
  :limit="1">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="onSubmit">点击上传</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "AdminSubmitArticle", data() {
    return {
      form: {
        name: '',
        desc: '',
        
      },
      mdUrl:"",
      imageUrl: '',
      mdImgUrl:""
    }
  },
  methods: {
    //文档上传成功后执行
    handlerSuccess(res, file, fileList){
      //console.log(response, file, fileList);
      this.mdUrl = res.data

    },
    //上传框改变时触发
    handlerChange(file, fileList){
      if(file.name.endsWith(".md")){}
       //true 就要上传
       this.$refs.uploadmd.submit()
    },
    //移除文件 
    async handlerDelete(file, fileList){
     let {data}=await this.$axios.post("/node/root/deleteMd",{mdUrl:file.response?.data?.path || file})
     
    },
    
//发送数据，数据存储到数据库中
 async onSubmit() {
      if(!this.form.name.trim()) return;
      if(!this.mdUrl) return;
     await this.$axios.post("/node/root/handlermdInfo",{
      form: this.form,
      mdUrl:this.mdUrl,
      mdImgUrl:this.mdImgUrl,
     })
          this.emptyArticle()
    },
    //清空文章
    emptyArticle(){
      this.form={}
          this.mdUrl=""
          this.mdImgUrl=""

          this.$refs.uploadimg.clearFiles();
          this.$refs.uploadmd.clearFiles()
    },
    //离开路由删除没有上传的数据
    beforeDestroy() {
      if(this.mdUrl){
        this.handlerDelete(this.mdUrl.path)
      }
      if(this.mdImgUrl){
        this.handlerDelete(this.mdImgUrl.path)
      }
      this.emptyArticle()
    },

    
    //上传图片封面 成功之后
    handleAvatarSuccess(res, file) {
      
      this.mdImgUrl = res.data
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  }

}
</script>

<style lang="less" scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>>
