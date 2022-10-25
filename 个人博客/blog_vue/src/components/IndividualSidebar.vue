<template>
 <div>
    <div class="sideber">
        <div class="touxiang"> <img src="../assets/comImg/touxiang.png" alt="" class="touxiang_bg"></div>
        <div class="font_show" @click="changeTransition">不积跬步无以至千里</div>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__backInLeft"
            leave-active-class="animate__backOutLeft">
            <div v-if="bol" class="box_trani">{{  text_box  }}}</div>
        </transition>
        <!-- 文章 -->
        <div class="article_text">
            <h3>热门文章</h3>
            <ul >
                <li class="article_text_list" v-for="(item,index) in article_Arr" :key="index">
                    <div class="article_bg"><img :src="item.imgSrc" alt="" draggable="false"></img></div>
                    <span>{{item.HotTitle}}</span>
                </li>

            </ul>
        </div>
        <!-- 博客 -->
        <div class="blog_message">
            <h3>博客信息</h3>
            <ul >
                <li  v-for="(item,index) in blogText" :key="index">
                   <i :class="item.iconClass"></i>
                   <span class="blog_message_text">{{item.titleText}}</span>
                   <span class="blog_message_date">{{item.changeNumber}}</span>
                </li>

            </ul>

            <div class="guanli" @click="bols=!bols">
               <i class="el-icon-setting">管理</i>  
            </div>
        </div>
    </div>
      <Root :bols="bols" @handlerRootLogin="handlerRootLogin" />
 </div>
</template>

<script>
import Root from './inputlogin/Root';

export default {
    name: "IndividualSidebar",
    data() {
        return {
            bol: false,
            bols: false,
            textArr: [
                "我可不会碰你,除非忍不住🤪🤪🤪🤪🤪",
                "该睡觉了😪😪😪",
                "早上好,新的一天⏰⏰⏰",
                "中午好，该午睡了😪😪😪",
                "下午好,努力吧少年💦💦💦",
                "晚上好,开始学习了嘛📚︎📚︎📚︎",
            ],
            text_box: "我可不会碰你,除非忍不住🤪🤪🤪🤪🤪",
            article_Arr: [
                {
                    imgSrc: require("@/assets/comImg/hot1.png"),
                    HotTitle: "一个可以绑定多个天翼云网盘的目录列表程序",
                },
                {
                    imgSrc: require("@/assets/comImg/hot2.png"),
                    HotTitle: "cpulimit 是一个限制进程的 CPU 使用率的工具（以百分比表示，而不是 CPU 时间）。当您不希望批处理作业占用太多 CPU 周期时，控制批处理作业很有用",
                },
                {
                    imgSrc: require("@/assets/comImg/hot3.png"),
                    HotTitle: "查找适合自己当前网络环境的优选Cloudflare Anycast IP，具体这玩意儿有啥用？可以",
                },
                {
                    imgSrc: require("@/assets/comImg/hot4.png"),
                    HotTitle: "Deluge是一款免费的 BT 传输软件，相比于其他同类产品，Deluge完美支持各大主流操作系统( Windows 、 Linux 、 Mac OS )，软件体积小巧、绿色安全，",
                },
                {
                    imgSrc: require("@/assets/comImg/hot5.png"),
                    HotTitle: "多时候，我们监控程序都使用supervisor，但是在一些小场景中，没必要安装额外的软件，并且supervisor对新手不太友好，需要根据他的语法格式进行撰写",
                },
            ],
            blogText: [
                {
                    iconClass: "el-icon-notebook-1",
                    titleText: "文章展示",
                    changeNumber: "1",
                },
                {
                    iconClass: "el-icon-chat-dot-square",
                    titleText: "评论数量",
                    changeNumber: "2",
                },
                {
                    iconClass: "el-icon-loading",
                    titleText: "运行天数",
                    changeNumber: "4",
                },
                {
                    iconClass: "el-icon-edit",
                    titleText: "最后活动",
                    changeNumber: "4",
                },
            ],
        };
    },
    components: { Root },
    methods: {
        changeTransition() {
            this.bol = true;
            let date = new Date().toTimeString().split(":")[0];
            switch (true) {
                case date >= 0 && date < 6:
                    this.text_box = this.textArr[1];
                    break;
                case date >= 6 && date < 10:
                    this.text_box = this.textArr[2];
                    break;
                case date >= 10 && date < 14:
                    this.text_box = this.textArr[3];
                    break;
                case date >= 14 && date < 17:
                    this.text_box = this.textArr[4];
                    break;
                case date >= 17 && date < 23:
                    this.text_box = this.textArr[5];
                    break;
                default:
                    this.text_box = this.textArr[0];
            }
            setTimeout(() => {
                this.bol = false
            },2500);
            
        },
        handlerRootLogin(){
             this.bols=false
        }
    },
    
}
</script >

<style lang="less" scoped>
.sideber {
    width: 200px;
    height: 100vh;
    padding: 0 17px  0 0;
    overflow: scroll;
    background: #fff;
    position: fixed;
    box-shadow: 0 0 5px 1px rgb(228, 228, 228);
    

    .touxiang {
        width: 150px;
        height: 150px;

        .touxiang_bg {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }

    .font_show {
        font-size: 14px;
        position: relative;
        cursor: pointer;

        &:after {
            position: absolute;
            right: 6px;
            bottom: -2px;
            content: " ";
            width: 0px;
            height: 0px;
            border: 6px solid black;
            border-color: rgba(0, 0, 0, 0.5) transparent transparent transparent;
        }
    }

}
.box_trani{ 
    position: relative;
    height: 15px;
}

.article_text{ 
    margin-top: 50px;
    .article_text_list{ 
        height: 60px;
        overflow:hidden;
        margin-top: 15px;
        display: -webkit-box;
        -webkit-line-clamp:3;
        -webkit-box-orient:vertical;
        text-overflow: ellipsis;
        font-size: 14px;
        .article_bg{ 
            float: left;
            
        }
    }
    
    img{ 
    width: 50px;
    height: 50px;
    border-radius: 50%;
 }

}
.guanli{
    width: 200px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    background: rgb(232, 232, 232);
    border-radius: 8px;
}

.blog_message_date{
    margin-left: 50%;
    width: 10px;
}


</style>