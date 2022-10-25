<template>

  <div class="link_wrap">
    <div class="linkBox">
      <h2><i class="el-icon-link">友情链接</i> </h2>
    </div>
    <div class="linkformBox">
      <el-tabs v-model="activeName">
        <!-- 申请友链 -->
        <el-tab-pane label="申请友链" name="first">
          <p>友链申请-请符合规范😊</p>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="博客名称" prop="blogName">
              <el-input type="text" v-model="ruleForm.blogName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="博客地址" prop="blogOrigin">
              <el-input type="text" v-model="ruleForm.blogOrigin" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="logo地址" prop="blogLogin">
              <el-input v-model.number="ruleForm.blogLogin" type="text" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="博客描述" prop="blogMessage">
              <el-input v-model.number="ruleForm.blogMessage" type="text" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 友链提示 -->
        <el-tab-pane label="友链提示" name="second">
          <LinkChild :links="links" />

        </el-tab-pane>
        <!-- 推荐友链 -->
        <el-tab-pane label="推荐友链" name="third">
       <LinkChild :links="hotLinks" />

        </el-tab-pane>
        <!-- 个人友链 -->
        <el-tab-pane label="修改友链" name="fourth">
          <button @click="activeName ='first'" style="width:1oopx,height:50px,background-color:#A0A0A0">修改友链</button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
  
 
<script>
import LinkChild from "../components/linkBase/LinkChild"
export default {

  name: "Links",
  components:{LinkChild},
  data() {
    var blogNameval = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }

    };
    var blogOriginval = (rule, value, callback) => {
      if (value.trim === '') {
        callback(new Error('地址不能为空'));
      } else if (!value.startsWith("http")) {
        callback(new Error('格式不正确'));

      } else {
        callback();
      }
    };


    return {
      activeName: 'first',
      ruleForm: {
        blogName: '',
        blogOrigin: '',
        blogLogin: '',
        blogMessage: ''
      },
      rules: {
        blogName: [
          { validator: blogNameval, trigger: 'blur' }
        ],
        blogOrigin: [
          { validator: blogOriginval, trigger: 'blur' }
        ],
        blogLogin: [
          { validator: blogOriginval, trigger: 'blur' }
        ],
        blogMessage: [
          { validator: blogNameval, trigger: 'blur' }
        ]
      },
      links: [],
      hotLinks:[]

    };

  },
  methods: {

    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {

        if (valid) {
          //验证成功 设置请登录
          if (!this.$store.state.userInfo._id) {
            return this.$message.error("请登录")
          }
          //提交后端数据库中
          let { data } = await this.$axios.post("/node/user/userLink", {
            ruleForm: this.ruleForm
          });
          this.$message.success(data.value)
          this.$refs[formName].resetFields();
         
          // this.links.unshift(data.data)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    async getLinks() {
      let { data } = await this.$axios.get("/node/user/getlinks")
      this.links = data,
      this.hotLinks = data.filter((item)=>item.blogLinkHot)
      
    }
  },
  mounted() {
    this.getLinks()
  }

}
</script>
  
  
<style lang="less" scoped>
.link_wrap {
  .linkBox {
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

  .link_flex {
    display: flex;

    justify-content: space-between;
    flex-wrap: wrap;

    .link_list {
      display: flex;
      background-color: rgb(239, 239, 239);
      border-radius: 10px;
      width: 48%;

      .link_word {
        width: 200px;
        height: 100%;
        padding-left: 20px;
      }

      .link_bg {
        width: 40px;
        height: 40px;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>