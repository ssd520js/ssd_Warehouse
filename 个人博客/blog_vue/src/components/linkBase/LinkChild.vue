<template>
    <div class="link_flex">

        <a :href="item.blogOrigin" class="link_list" v-for="(item) of links" :key="item.id">

            <p>
                <img :src="item.blogLogin" alt="" class="link_bg">
            </p>
            <div class="link_word">
                <p>{{item.blogName}}</p>
                <p>{{item.blogMessage}}</p>
            </div>
        </a>
    </div>
</template>

<script>
export default {
   name:"LinkChild",
   props:["links"],
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

