<template>
  <div
    class="music_vue hidden-xs-only"
    v-loading="load"
    element-loading-background="#fff"
  >
    <VueAPlayer
      :music="music"
      :list="newURL"
      :float="mini"
      listMaxHeight="150px"
      :listFolded="mini"
    />
  </div>
</template>

<script>
import VueAPlayer from "vue-aplayer";
import axios from "axios";
VueAPlayer.disableVersionBadge = true;

export default {
  name: "HeaderMuisc",
  components: { VueAPlayer },
  data() {
    return {
      mini: true,
      loading: false,
      sortSongs: 0,
      // 列表数据
      newURL: [],
      load: true,
      // 初始化数据
      music: {
        artist: " ",
        id: 1901371647,
        indexedDB: 0,
        pic: "http://www.laixinen.vip/vue_icon/hot5.png",
        src: "https://music.163.com/song/media/outer/url?id=1844449888.mp3",
        title: "孤勇者",
      },
      value: [],
    };
  },
  methods: {
    async getMusic() {
      // 判断session中是否存在 已经获取到的music数据
      let result = JSON.parse(sessionStorage.getItem("key_session_music"));
      if (result) {
        this.newURL = result;
        this.music = result[0];
        this.load = false;
        return;
      }
      // 获取推荐歌单数据
      let { data } = await axios.get(
        "http://www.zhuqueque.com/playlist/detail?id=19723756"
      );
      //  处理数据
      this.toDealWithData(data.playlist.tracks.slice(0, 10));
    },
    // 获取音乐url地址
    async getMessage(value, index) {
      let { data } = await axios.get(
        `http://www.zhuqueque.com/song/url?id=${value}`
      );
      this.newURL[index].src = data.data[0].url;
      // 存储数据
      if (index == this.newURL.length - 1) {
        this.setSessionStorage();
      }
    },
    // 处理数据
    toDealWithData(value) {
      this.newURL = value.map((ele, index) => {
        this.getMessage(ele.id, index);
        return {
          id: ele.id,
          title: ele.name,
          pic: ele.al.picUrl,
          indexedDB: index,
          src: "",
          artist: " ",
        };
      });
    },
    // 存储到session中
    setSessionStorage() {
      this.music = this.newURL[0];
      sessionStorage.setItem("key_session_music", JSON.stringify(this.newURL));
      this.load = false;
    },
  },
  created() {
    this.getMusic();
  },
};
</script>

<style lang="less" scoped>
.music_vue {
  width: 200px;

  /deep/ .aplayer-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 5px;
  }
  /deep/ .aplayer-body {
    height: 50px;
    box-shadow: 0 0 5px 1px #eee;
  }
  /deep/ .aplayer-float {
    margin: 0;
    box-shadow: 0 0 0 0 #eee;
  }
  /deep/ .aplayer-body .aplayer-info {
    padding: 0;
    height: 50px;
    margin-left: 5px;
  }
  /deep/ .aplayer-info .aplayer-body .aplayer-info {
    border: none;
  }
  /deep/ .aplayer.aplayer-withlist .aplayer-body .aplayer-info {
    border: none;
  }
  /deep/ .aplayer-music {
    margin-top: 10px;
  }
  /deep/ .aplayer-controller {
    margin-left: 5px;
  }

  /deep/ .aplayer-info .aplayer-volume-bar {
    height: 25px;
    box-shadow: 0 0 0 0 #eee;
  }
  /deep/ .aplayer-withlist {
    margin: 0;
  }
  /deep/ .aplayer-controller {
    width: 100px;
  }
  /deep/ .aplayer-pic .aplayer-play {
    width: 15px;
    height: 15px;
    bottom: 30%;
    right: -290%;
    border: 0px solid #fff;
  }
  /deep/ .aplayer-pic .aplayer-play .aplayer-icon-play {
    top: -2px;
    left: -1px;
    border: 0px solid #eee;
  }
  /deep/ .aplayer-pic .aplayer-pause {
    width: 15px;
    height: 15px;
    bottom: -7%;
    right: -328%;
    border: 0px solid #fff;
  }
  /deep/ .aplayer-icon-menu {
    margin-top: 2px;
  }
}
.music_vue /deep/ .aplayer-icon-mode,
.music_vue /deep/ .aplayer-time-inner {
  display: none;
}
</style>