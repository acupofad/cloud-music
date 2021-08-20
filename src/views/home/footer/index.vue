<template>
  <div class="footer">
    <audio
      :src="url"
      ref="audioPlayer"
      autoplay
      @timeupdate="timeupdate"
      @play="changeState(true)"
      @pause="changeState(false)"
      @ended="changeSong(1)"
    ></audio>
    <div class="pic"></div>
    <div class="center">
      <div class="songName size-12">
        <span>{{ songName }}</span>
      </div>
      <div>
        <div class="top">
          <div class="turnback icon"></div>
          <div class="last icon" @click="changeSong(-1)"></div>
          <div class="play" @click="play(false)" v-if="playState"></div>
          <div class="pause" @click="play(true)" v-else></div>
          <div class="next icon" @click="changeSong(1)"></div>
          <div class="like icon"></div>
        </div>
        <div class="bottom">
          <div class="size-12 time">
            <div>
              {{ (currentTime * 1000) | formatTime }}/{{
                totalTime | formatTime
              }}
            </div>
          </div>
          <div class="slider">
            <el-slider
              v-model="playTimeRate"
              @change="changeSongProgress"
              :show-tooltip="false"
            ></el-slider>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div
        class="loud logo"
        @click="changeVolumeState"
        v-if="volumeState"
      ></div>
      <div class="silent logo" @click="changeVolumeState" v-else></div>
      <div class="logo-progress">
        <el-slider
          v-model="volume"
          @input="changeVolume"
          :disabled="!volumeState"
        ></el-slider>
      </div>
      <div class="adjust icon"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      playTime: 50,
      url: "",
      totalTime: 0,
      playTimeRate: 0,
      currentTime: 0,
      musicList: [],
      currentIndex: -1,
      songName: "",
      playState: false,
      volume: 20,
      volumeState: true,
    };
  },
  created() {
    this.getPlay();
  },
  watch: {
    "$store.state.musicId"(id) {
      this.getPlay(id);
      this.musicList = this.$store.state.musicList;
      this.getIndexList(id);
    },
    "$store.state.musicList"(musicList) {
      this.musicList = musicList;
    },
    "$store.state.playState"(playState) {
      this.playState = playState;
    },
  },
  methods: {
    async getPlay(id) {
      try {
        const {
          data: { data: res },
        } = await this.$http.post(`/song/url?id=${id}`);
        if (res) {
          const { url } = res[0];
          this.url = res ? url : "";
          if (!this.url) {
            this.$message.error("此歌曲尚无版权，将播放下一首歌曲");
            this.changeSong(1);
            return;
          }
          this.totalTime = this.$store.state.totalTime;
          this.songName = this.$store.state.songName;
        }
      } catch (err) {
        console.log(err);
      }
    },
    timeupdate() {
      let time = this.$refs.audioPlayer.currentTime;
      this.$store.commit("updateCurrentTime", time);
      this.currentTime = time;
      this.playTimeRate = (this.currentTime / this.totalTime) * 100000;
    },
    changeSongProgress(e) {
      this.currentTime = (e * this.totalTime) / 100000;
      this.$refs.audioPlayer.currentTime = this.currentTime;
    },
    play(play) {
      play ? this.MusicPlay() : this.musicPause();
      console.log(play);
    },
    MusicPlay() {
      this.$refs.audioPlayer.play();
    },
    musicPause() {
      this.$refs.audioPlayer.pause();
    },
    changeState(state) {
      this.$store.commit("changePlayState", state);
    },
    changeSong(add) {
      console.log(this.currentIndex);
      if (!this.musicList.length) {
        this.$message.warning("目前歌单为空");
        return;
      } else if (this.currentIndex <= 0 && add < 0) {
        this.$message.warning("歌单已到第一首歌曲");
        if (this.currentIndex == -1) this.changeSong(1);
        return;
      } else if (this.currentIndex >= this.musicList.length - 1 && add > 0) {
        this.$message.warning("歌单已到最后，为您播放第一首歌曲");
        this.changeSong(-this.currentIndex);
        return;
      } else {
        this.currentIndex += add;
        console.log(this.currentIndex);
        this.$store.commit("updateCurrentIndex", this.currentIndex);
        const element = this.musicList[this.currentIndex];
        this.$store.commit("updateMusicId", {
          id: element.id,
          dt: element.dt,
          name: element.name,
        });
        this.getPlay(this.musicList[this.currentIndex].id);
      }
    },
    getIndexList(id) {
      let index = this.musicList.findIndex((item) => item.id === id);
      this.currentIndex = index;
      this.$store.commit("updateCurrentIndex", index);
      this.$store.commit("updateMusicId", {
        id,
        dt: this.musicList[index].dt,
        name: this.musicList[index].name,
      });
    },
    changeVolume(e) {
      this.$refs.audioPlayer.volume = e / 100;
    },
    changeVolumeState() {
      this.volumeState = !this.volumeState;
      console.log(this.volumeState);
      if (!this.volumeState) this.volume = 0;
      else this.volume = 20;
    },
  },
};
</script>

<style scoped>
.footer {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px 0 10px;
  height: 100%;
  width: 100%;
  border-top: 1px solid #eee;
}
.pic {
  width: 40px;
  height: 40px;
  background: url("../head/logo.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 5px;
}
.center {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
}
.songName {
  position: absolute;
  padding: 30px;
  width: 300px;
  height: 56%;
  left: -300px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.top {
  width: 200px;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
}
.turnback {
  background: url("../../../assets/img/fanhui.svg");
}
.last {
  background: url("../../../assets/img/zuobofang.svg");
}
.play {
  background: url("../../../assets/img/zanting.svg");
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
}
.pause {
  background: url("../../../assets/img/play.svg");
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
}
.next {
  background: url("../../../assets/img/youbofang.svg");
}
.like {
  background: url("../../../assets/img/shoucang_1.svg");
}
.adjust {
  background: url("../../../assets/img/controls__eas.svg");
}
.icon {
  width: 15px;
  height: 15px;
  background-size: contain;
  background-repeat: no-repeat;
}
.time {
  position: absolute;
  top: 20px;
}
.slider {
  width: 100%;
  height: 50px;
}
/deep/.el-slider__runway {
  height: 4px;
  margin: 0;
}
/deep/.el-slider__button-wrapper {
  top: -15px;
}
/deep/.el-slider__button {
  width: 10px;
  height: 10px;
  border: 1px solid #ddd;
}
/deep/.el-slider__bar {
  height: 4px;
  background: #e13e3e;
}
.right {
  width: 150px;
  display: flex;
  align-items: center;
}
.logo-progress {
  flex: 1;
  margin: 0 10px;
}
.loud {
  background: url("../../../assets/img/lianxi2hebing_yinliang.svg");
}
.silent {
  background: url("../../../assets/img/jinyin.svg");
}
.logo {
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>