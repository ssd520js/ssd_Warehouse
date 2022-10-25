<template>
    <div>
        <transition name="animate__animated animate__fade" enter-active-class="animate__fadeInRight"
            leave-active-class="animate_fadeOutRight">
            <div class="posi" v-if="bols">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item label="账号" prop="rootName">
                        <el-input type="text" v-model="ruleForm.rootName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="rootPass">
                        <el-input type="password" v-model="ruleForm.rootPass" autocomplete="off"></el-input>
                    </el-form-item>
                   
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </transition>
    </div>
</template>

<script>

export default {
    name: "Root",
    props: ["bols"],
     data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }else{
            callback()
        }
       
      };
    
      
      return {
        ruleForm: {
          rootName: '',
          rootPass: '',
          
        },
        rules: {
            rootName: [
            { validator: checkAge, trigger: 'blur' }
          ],
          rootPass: [
            { validator: checkAge, trigger: 'blur' }
          ],
         
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate( async(valid) => {
          if (valid) {
           let {data} = await this.$axios.post("/node/root/rootLogin",{
                rootName: this.ruleForm.rootName,
                rootPass: this.ruleForm.rootPass,
             })
             if(!data.code)return this.$message.error(data.value)
             this.$store.commit("CHANGEROOT","1234")
             this.$emit("handlerRootLogin")
             this.$router.push("/admin")
          } else {
            console.log('error submit!!');
            return false;
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
//root
.posi {
    position: fixed;
    right: 3%;
    top: 20%;
    width: 300px;
    height: 200px;
    background: rgb(255, 255, 255);
    z-index: 100;
    .demo-ruleForm{
        box-shadow: 0 0 15px rgb(246, 246, 246);
    }
}
</style>