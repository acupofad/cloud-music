import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, getSetToken } from '../utils/token'

Vue.use(Vuex)

const key = 'DATA_USER'

export default new Vuex.Store({
  state: {
    user: getToken(key),
    musicId: '',
    totalTime: 0,
    currentTime: 0,
    musicList: [],
    currentIndex: -1,
    songName: "",
    playState: false,
    loginState: false,
    nickname: '',
    avatarUrl: ''
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      getSetToken(key, user)
    },
    updateMusicId(state, song) {
      state.musicId = song.id
      state.totalTime = song.dt
      state.songName = song.name
      console.log(state.songName);
    },
    updateCurrentTime(state, currentTime) {
      state.currentTime = currentTime;
    },
    updateMusicList(state, musicList) {
      state.musicList = [...musicList]
    },
    updateCurrentIndex(state, currentIndex) {
      state.currentIndex = currentIndex
    },
    changePlayState(state, playState) {
      state.playState = playState
    },
    updateLoginState(state, loginState) {
      state.loginState = loginState
      console.log(state.loginState,'kk');
    }
  },
})
