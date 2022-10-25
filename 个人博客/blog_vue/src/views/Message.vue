<template>
    <div>
        <div class="message_box">
            <h2><i class="el-icon-tickets">留言板</i></h2>
        </div>
        <div>留言区 </div>
        <div class="wrap">
            <p class="title">将想说的话记录并分享给大家！</p>
            <!-- 设置留言 -->
            <div class="center">
                <div class="infinite-list-wrapper" style="overflow:auto">
                    <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
                        <li v-for="(item) in infoArr" :key="item._id"  class="list-item">
                            <p class="p1"><img :src="'/node'+item.about.userIcon" alt=""></p>
                            <div class="message_warp">
                                <p><span>{{item.about.userName}} {{item.messageDate}}</span></p>
                                <p>{{item.messageInfo}}</p>
                            </div>
                        </li>
                    </ul>
                    <p v-if="loading">加载中...</p>
                    <p v-if="noMore">没有更多了</p>
                </div>
            </div>
            <!-- 设置发送留言 -->
            <div class="submit_value">
                <i class="el-icon-edit-outline"></i>
                <input type="text" placeholder="请输入留言" @keyup.enter="submit" ref="inputbox" v-model="inputMessage" />

                <el-popover placement="top" width="200" trigger="click">
                    <el-button slot="reference"> <b>😀</b></el-button>
                    <el-tabs v-model="activeName" style="cursor:pointer">
                        <el-tab-pane label="😁" name="first">

                            <Emoji :emoji="emoji" @mouseup.native="handlerEmojo" />
                        </el-tab-pane>
                        <el-tab-pane label="🏀" name="second">
                            <Emoji :emoji="movement" @mouseup.native="handlerEmojo" />
                        </el-tab-pane>
                        <el-tab-pane label="🐱" name="third">
                            <Emoji :emoji="animal" @mouseup.native="handlerEmojo" />
                        </el-tab-pane>
                        <el-tab-pane label="🍌" name="fourth">
                            <Emoji :emoji="eat" @mouseup.native="handlerEmojo" />
                        </el-tab-pane>
                        <el-tab-pane label="🚗" name="fifth">
                            <Emoji :emoji="traffic" @mouseup.native="handlerEmojo" />
                        </el-tab-pane>
                    </el-tabs>
                </el-popover>
                <span @click="submit">发送</span>
            </div>
        </div>

    </div>

</template>
  

<script>
import { mapState } from 'vuex';
import Emoji from '@/components/messageBase/Emoji';
export default {
    name: "Message",
    data() {
        return {
            inputMessage: "",
            activeName: 'second',
            infoArr: [],
            count: 10,
            loading: false
        }
    },
    components: { Emoji },
    computed: {
        ...mapState(["emoji", "movement", "animal", "eat", "traffic", "userInfo"]),
        noMore() {  //true 数值已经加载完毕
            return this.count > this.infoArr.length  ;
        },
        //是否启动滚动加载 true 执行 false 不执行
        disabled() {
            return this.loading || this.noMore
        }
    },
    methods: {
        //获取表情
        handlerEmojo(event) {
            let emo = event.target.innerText
            // guangbiaozai1input框中的位置
            let inde = this.$refs.inputbox.selectionStart
            // 添加到留言框
            this.inputMessage =
                this.inputMessage.substring(0, inde) +
                emo +
                this.inputMessage.substring(inde);

        },
        //发送留言
        async submit() {
            //没有登录不能发送
            if (!this.userInfo._id) return this.$message.error("需要登录");
            //发送
            let { data } = await this.$axios.post("/node/user/setmessage", {
                id: this.userInfo._id,
                inputMessage: this.inputMessage
            })
            this.infoArr.unshift(data)
            this.inputMessage = ''
        },
        //滚动加载
        load() {
            this.loading = true;
           
            setTimeout(() => {
                this.getMessage(this.count)
                this.count+= 10;
                this.loading = false;
            }, 2000)
        },
        //获取留言
        async getMessage(val=0) {
            let { data } = await this.$axios.post("/node/user/getmessage",{skip:val})
              
            this.infoArr.push(...data)
            
        }
    },
    created() {
        this.getMessage()
    }
}
</script>
  
<style lang="less" scoped>
.message_box {
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

.wrap {
    .title {
        width: 100%;
        height: 50px;
        background-color: rgb(196, 196, 196);
        text-align: center;
        line-height: 50px;
    }

    .center {
        box-sizing: border-box;
        height: 500px;
        border: 1px solid rgb(196, 196, 196);
        border-width: 0 2px;
        overflow-y: scroll;
        padding: 10px;

        // 定义滚动条宽度
        &::-webkit-scrollbar {
            width: 5px; // 右边的宽度
            height: 0px; // x轴的高
        }

        /*定义滑块 */
        &::-webkit-scrollbar-thumb {
            height: 20px;
            border-radius: 20px;
            background-color: #1fff01;
        }

    }

    //设置发送
    .submit_value {
        display: flex;
        width: 100%;
        background-color: rgb(196, 196, 196);
        border-radius: 8px;

        i,
        b,
        span {
            width: 50px;
            height: 50px;
            line-height: 47px;
            text-align: center;
        }

        b,
        span {
            cursor: pointer;
        }

        input {
            flex: auto;
            outline: none;
            text-indent: 4px;

        }

        .el-button {

            cursor: pointer;

            background-color: rgb(196, 196, 196);


            border: 1px solid rgb(196, 196, 196);
            padding: 0;

            border-radius: 4px;
        }
    }

    //设置留言
    .infinite-list-wrapper .list-item {
        display: flex;
        // background-color: #aeaeae;

        margin: 10px;
        border-radius: 12px;

        .message_warp {
            max-width: 500px;

            p:nth-child(2) {
                background-color: #d7d7d7;
                padding: 0 3px;
                border-radius: 5px;

            }
        }

        .p1 {
            width: 50px;
            height: 50px;
            padding-right: 10px;

            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
        }

    }

}
</style>>
  
