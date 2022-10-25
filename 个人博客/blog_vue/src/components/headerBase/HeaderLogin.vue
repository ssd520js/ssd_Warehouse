<template>
  <div class="key_login" >
    <div class="box"  @click="handlerClick">
        <i class="el-icon-user"></i>
    </div>
   <div class="from_login" v-if="fromBol">
   <div v-if="!userInfo.userName">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="userName"> 
        <el-input
          type="text"
          v-model="ruleForm.userName"
          autocomplete="off"
          size="mini"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码"  type="password"  class="icon_height"  prop="userPass">
        <el-input
          type="text"
          v-model="ruleForm.userPass"
          autocomplete="off"
          size="mini"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码"  class="icon_web" prop="userCaptcha">
        <el-input v-model="ruleForm.userCaptcha" size="mini" class="input_width_set"></el-input>
        <div class="input_bg_set" ref="svg" @click="getSvg()">
            <img src="" alt="">
        </div>

      </el-form-item>
      <el-form-item label-width="30px"   >
        <el-button type="primary" @click="submitForm('ruleForm')" class="sumbit_click_logon">提交</el-button>
      </el-form-item>
    </el-form>
   
  </div>
   <div v-else>
    
    <div class="login">
      <p class="login_bg">
        <img :src="'/node/'+userInfo.userIcon" alt="">
      </p>
      <p>名称：{{userInfo.userName}}</p>
      <p>上号时间：{{userInfo.userDate.split("-")[0]+"年"+userInfo.userDate.split("-")[1]+"月"}}</p>
    
    </div>
  <router-link to="/information"><el-button type="primary" size="medium">修改资料</el-button></router-link>
     <div> <el-button type="primary" size="medium" @click="handlerDestory">退出登录</el-button></div>
  </div>
   </div>
  </div>
</template>

<script>
  export default {
    name: "HeaderLogin",
    data() {
      let validateName = (rule, value, callback) => {
        // 正则匹配  /中文,字母 数字/  3到14个之间
        let reg = /^[\u4e00-\u9fa5_\w]{3,14}$/
        if (!value) {
          return callback(new Error('账号不能为空'));
        }else if(!reg.test(value)){
            callback(new Error('请求输入3-14个字符'))
        }else{
            callback()
        }
      };
      let validatePass = (rule, value, callback) => {
        //  匹配密码  字母 数字 特殊符号6-15字符
        let reg = /^[\w_`~!@#$%^&*()+=-\\\]\]\{\}:;'\,.<>/?]{6,15}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else  if(!reg.test(value)){
            callback(new Error('输入6-15个字符,不能是中文'));
        }else{
            callback()
        }
      };
      let validateCaptcha = (rule, value, callback) => {
        
        if (value === '') {
          callback(new Error('验证码不能为空'));
        } else if (value.toLowerCase() != this.svgBol) { 
          callback(new Error('验证错误'));
        } else {
          callback();
        }
      };
      return {
        fromBol:false,
       
        svgBol:"",
        //   数据绑定
        ruleForm: {
          userName: '',
          userPass: '',
          userCaptcha: ''
        },
        // 验证规则
        rules: {
          userName: [
            //   input框失去焦点的时候触发
            { validator: validateName, trigger: 'blur' }
          ],
          userPass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          userCaptcha: [
            { validator: validateCaptcha, trigger: 'blur' }
          ]
        }
      };
    },
    computed:{
         userInfo(){

          return this.$store.state.userInfo
         }

    },
    methods: {
     //设置点击事件
      handlerClick(){
        this.fromBol = !this.fromBol;
        this.getSvg();
     },
      //登录注册账号
      submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
          let {data} = await this.$axios.post("/node/blog/userInfo",{
                ruleForm:this.ruleForm
          })
          if(!data.code)return this.$message.error(data.value);
         
          
          this.$store.commit("CHANGEUSERINFO",data.data)
          this.$message.success(data.value)
          //重置登录
          this.$refs[formName].resetFields();
          //隐藏登录
          setTimeout(()=>this.fromBol = false,1500)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // },
      //退出登录
      async handlerDestory(){ 
        let {data} = await this.$axios.post("/node/blog/destory")
        this.$store.commit("CHANGEUSERINFO",data)
        this.getSvg()

      },
      //获取验证码
     async getSvg(){
      //验证码
      if(!this.fromBol) return;
      if(this.userInfo.userName) return;
      let {data} = await this.$axios.get("/node/blog/getsvg")
      this.$refs.svg.innerHTML = data.data
      console.log(data.text);
      this.svgBol = data.text.toLowerCase()
      }
    },
    // mounted(){
    //        this.getSvg();
    // },
  };
</script>

<style lang="less" scoped>
.key_login{
    position: relative;
}
.box{
    width: 50px;
    height: 50px;
}
.from_login {
  position: absolute;
  right: 0;
  top: 52px;
  width: 300px;
  height: 300px;
  background: #fff;
  padding-top: 15px;
  padding-right: 15px;  
  box-shadow: 0 0 5px 1px #eee;

  .input_width_set{
    width: 40%;
    margin-right: 15px;
    vertical-align: 9px;
    
  }
  .input_bg_set{
    display: inline-block;
    width: 34%;
    height: 35px;

    img,svg{
        width: 100%;
        height: 100%;
    }
  };
  .icon_height{
    margin-bottom: 15px;
  }
 .icon_web .el-form-item__label{
    line-height: 40px;
    
  }
 
 .sumbit_click_logon{
    width: 100%;
  }
  .login{
    widows: 100px;
    height: 100px;
    p{
      text-align: left;
      margin-right: 20px;
    }
    
    .login_bg {
      width: 80px;
      height: 80px;
      background: url("@/assets/comImg/headdant.png") no-repeat center / cover;
      float: left;
      img{
        width: 73%;  
        height: 70%; 
        border-radius: 50%;   
        transform: translate(10px,18px); 
    }}
  }
  /deep/ .el-button{
    width: 100%;
  }
}
</style>