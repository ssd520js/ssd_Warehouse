<template>
  
  <div>
    <div class="home_box"> <div class="home_bg"><h2>愿一切汗水都有收获！</h2></div></div>
     <div class="home_wrap"></div>
   
  </div>
  </template>
  
  <script>
  
  export default {


   name:"Home",



  }
  </script>
  
  <style lang="less" scoped>
    .home_bg{ 
      height: 105px;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      background: url("../assets/comImg/home_bg.png") no-repeat center / cover;
    }
    h2{
      margin-left: 30%;
      margin-top: 4%;
   
    }
    .home_box{
      height: 150px;
    }
    .home_wrap{
      width: 100%;
      height: 1000px;
      background:url("http://localhost/vue_img/shouye.jpg") no-repeat center / cover;
    }
  </style>