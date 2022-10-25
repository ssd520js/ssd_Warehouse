<template>
    <div class="mask_wrap">
        <div class="wrap_center">
            <div class="logo hidden-xs-only" ><img class="logo_Img" src="@/assets/logo.jpg" draggable="false" alt=""></div>
            <ul class="nav_list_center">
                <li v-for="(item, index) in navListArr" :key="index">
                <router-link :to="item.path">{{ item.title }}</router-link>
            </li>

            </ul>
            <!-- 音乐播放器 -->
            <HeaderMusic />
            <!-- 登录注册 -->
            <HeaderLogin />
        </div>
    </div>
</template>

<script>
import HeaderMusic from "./headerBase/HeaderMusic"
import HeaderLogin from "./headerBase/HeaderLogin"
export default {
    name: "HeaderNav",
    components: { HeaderMusic, HeaderLogin },
    data() {
        
        return {
            // "首页", "文章", "留言", "友链", "关于"
            navListArr: [

            {
                path:"/",
                title:"首页"
            }, {
                path:"/article",
                title:"文章"
            }, {
                path:"/message",
                title:"留言"
            }, {
                path:"/links",
                title:"友链"
            }, {
                path:"/about",
                title:"关于"
            },
            ]
        }

    },
    methods:{
        async getSession(){
          let {data}= await this.$axios.get("/node/blog/getcookie");
          if(!data.code) return;
          //注意后端返回值
          this.$store.commit("CHANGEUSERINFO",data.data);
         
        }
    },
    mounted(){
        this.getSession()
    },
}
</script>

<style lang="less" scoped>
.mask_wrap {
    position: fixed;
    top: 0;
    width: 100%;
    height: 55px;
    background-color: #e9e9e9;
    box-shadow: 0 0 5px 1px #eee;
    z-index: 99;

    .wrap_center {
        display: flex;
        max-width: 1200px;
        min-width: 375px;
        height: 55px;
        margin: 0 auto;
        justify-content: space-between;

        .logo {

            user-select: none;

            .logo_Img {
                display: flex;
                height: 55px;
            }
        }

        .nav_list_center {
            margin-left: 12px;
            display: flex;
            height: 55px;
            line-height: 55px;
            user-select: none;
            flex-grow: 1;

            li {
                padding: 0 12px;

            }
        }

        //音乐播放器
        .music {
            height: 55px;
            width: 200px;
            background: #605e5e;

        }

        //设置登录注册
        .key_login {
            width: 55px;
            height: 55px;
            text-align: center;
            line-height: 55px;
            cursor: pointer;

            &:hover {
                background: #a6a6a6;
            }
        }
    }
}
</style>>

