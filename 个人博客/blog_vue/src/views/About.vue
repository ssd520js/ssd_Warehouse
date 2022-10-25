<template>

  <div class="about">
    <div class="about_bg">

    </div>
    <div class="about_readme">
      <h3>自述</h3>
      <p>一个学习Web编程的新手，请多多指教！！！</p>
    </div>
    <div class="">
      <h3>技能</h3>
      <ul class="about_ul">

        <li v-for="(item, index) of skillArr" :key="index">{{ item.name }}</li>
      </ul>
    </div>
    <div class="">
      <h3>联系 :QQ-2633273689</h3>
      <p>有需要请联系我，收到后一定会会回复！！！</p>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="贵姓" prop="userName">
        <el-input type="text" v-model.trim="ruleForm.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="你的邮箱" prop="email">
        <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱主题" prop="theme">
        <el-input type="text" v-model.trim="ruleForm.theme"></el-input>
      </el-form-item>
      <el-form-item label="你的留言" prop="emailInfo">
        <el-input type="text" v-model.trim="ruleForm.emailInfo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
 
  <script>


export default {
  components: {},

  name: "About",
  data() {
    let validateUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      }
      callback()
    };
    let validateEmail = (rule, value, callback) => {
      let reg = /^[\da-z]+([\-\.\_]?[\da-z]+)*@[\da-z]+([\-\.]?[\da-z]+)*(\.[a-z]{2,})+$/;

      if (!value) {
        return callback(new Error('不能为空'));
      } else if (!reg.test(value)) {
        return callback(new Error('邮箱地址错误'));
      }
      callback()

    };
    let validateTheme = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      }
      callback()

    };
    let validateEmailInfo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      }
      callback()

    };

    return {
      ruleForm: {
        userName: "",
        email: '',
        theme: '',
        emailInfo: ''
      },
      rules: {
        userName: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        theme: [
          { validator: validateTheme, trigger: 'blur' }
        ],
        emailInfo: [
          { validator: validateEmailInfo, trigger: 'blur' }
        ]
      },
      skillArr: [
        {
          name: "JavaScript",

        },
        {
          name: "ES6",

        },
        {
          name: "JQuery",

        },
        {
          name: "Node-Express",

        },
        {
          name: "Vue全家桶",

        },
        {
          name: "微信小程序",

        },
        {
          name: "Wabpack-Github",

        },
        {
          name: "Element",
          iconClass: "el-icon-notebook-1"
        },
      ],
    };

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //ajax请求
          let { data } = await this.$axios.post("/node/blog/setEmail", { ruleForm: this.ruleForm });
          console.log(data);
          if (!data.code) return this.$message({
            
            message: data.value,
            type: 'error',
            duration: 1000
          });this.$message({
            
            message: data.value,
            type: 'success',
            duration: 1000
          });
          this.$refs[formName].resetFields();
        } else {
          //element-ui  自带提示
          this.$message({
            showClose: true,
            message: '联系验证不通过',
            type: 'error',
            duration: 1000
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }



}
</script>
  
  <style lang="less" scoped>
  .about {
  
    user-select: none;
    height: 1000px;
  
    .about_bg {
      width: 100%;
      height: 300px;
      border-radius: 8px;
      background: url("http://localhost/vue_img/about_bg.jpg") no-repeat center / cover;
    }
  
    .about_readme {
      margin-top: 20px;
  
      p {
        padding-left: 20px;
      }
    }
  
    .about_ul {
      padding-left: 20px;
    }
  }
  </style>