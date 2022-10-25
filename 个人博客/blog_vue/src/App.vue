<template>
  <div id="app"><MaskCanvas />
    <HeaderNav />
    <div class="center_wrap">
     
    <div class="box_left hidden-xs-only" >
       <IndividualSidebar /></div>
    <div class="center_right">
      <router-view></router-view>
    </div>
    </div>
    
  </div>


</template>
<script>

import HeaderNav from './components/HeaderNav'
import IndividualSidebar from './components/IndividualSidebar'
import MaskCanvas from './components/MaskCanvas'
export default {
  name: "App",
  components: { HeaderNav,IndividualSidebar,MaskCanvas}
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}
a{ text-decoration: none;color: black;}
#app {
  border-top: 1px solid #fff;
}

.center_wrap {
  display: flex;
  justify-content: space-between;
  margin: 65px auto 0;
  
  max-width: 1200px;
  min-width: 375px;
  .box_left{ 
    width: 200px;
    height: 100vh;
    
  }
  .center_right{ 
    flex: auto;
    min-height: 1100px;
    max-width: 985px;
    background: rgb(255, 255, 255);
    box-shadow: 0 0 5px 1px rgb(228, 228, 228);
    position: relative;
    z-index: 1;
    padding-left: 15px;
  }
}
h3{ 
    border-left: 8px solid #7CFC00;
    padding-left: 15px ;
    margin: 10px 10px;
}
</style>
