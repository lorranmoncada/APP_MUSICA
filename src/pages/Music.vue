<template>
  <div>
    <header>
      <h1>app music</h1>
    </header>

    <section class="center">
      <img class="img" width="300px" height="300px" :src="current.img" alt="Daniel Cesar" />
    </section>

    <section style="margin-top:15px;color:rgb(228 228 228);;" class="center">
      <h2 class="song-title">{{current.title}}</h2>
      <span id="artistSpan">by {{current.artist}}</span>
    </section>
    <!--  <div class="center">
        <div style="width: 618px;">
          <v-col>
            <v-card max-width="700" class="mx-auto">
               <v-list two-line>
                <v-list-item-group v-model="selected" multiple active-class="pink--text">
                  <template v-for="(item, i) in musics">
                    <v-list-item :key="item.title" @click="playList(item)">
                      <template v-slot:default="{ active }">
                        <v-list-item-content>
                          <v-list-item-title v-text="item.title"></v-list-item-title>
                          <v-list-item-subtitle v-text="item.artist"></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                          <v-icon v-if="!active" color="grey lighten-1">star_border</v-icon>

                          <v-icon v-else color="yellow">star</v-icon>
                        </v-list-item-action>
                      </template>
                    </v-list-item>

                    <v-divider v-if="i + 1 < musics.length" :key="i"></v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </div>
    </div>-->
    <footer>
      <div class="timeMusic" ref="timeMusic" style="width:0%"></div>

      <div class="iconPlay">
        <i class="material-icons iconbtn">
          <span class="span" @click="previous()">skip_previous</span>
        </i>
        <i v-if="!isPause" @click="isPlay()" class="material-icons iconbtn">
          <span class="span">play_arrow</span>
        </i>
        <i v-if="isPause" @click="isPlay()" class="material-icons iconbtn">
          <span class="span">pause</span>
        </i>
        <i class="material-icons iconbtn">
          <span class="span" @click="next()">skip_next</span>
        </i>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data: () => ({
    alignment: "center",
    justify: "center",
    selected: null,
    interval: null,
    duration: null,
    /*  current: {}, */
    index: 0,
    isPause: false,
    musics: [
      {
        title: "Get You",
        artist: "Daniel Celsium",
        img: require("../assets/getyou.jpg"),
        src: require("../assets/GetYou.mp3"),
      },
      {
        title: "Giveon",
        artist: "Não sabemos",
        img: require("../assets/giveon.jpg"),
        src: require("../assets/Giveon.mp3"),
      }
    ],
    player: new Audio()
  }),
  computed: {
    current() {
      return this.musics[this.index];
    }
  },
  methods: {
    playList(item) {
      this.isPause = false;
      let artista = this.musics.findIndex(x => x.artist == item.artist);
      this.index = artista;
      this.player.src = this.current.src;
      console.log(artista);
    },
    isPlay() {
      // duração da música
     /*  let minutes = "0" + Math.floor(this.player.duration / 60);
      let seconds = "0" + Math.floor(this.player.duration - minutes * 60);
      this.duration = minutes.substr(-2) + ":" + seconds.substr(-2); */
      this.isPause !== false ? this.player.pause() : this.player.play();
      this.isPause = !this.isPause;
      let width = parseInt(this.$refs.timeMusic.style.width.replace("%", ""));

      if (this.isPause) {
        this.interval = setInterval(() => {
          width = width >= 100 ? 0 : width + 1;
          let progress = width.toString() + "%";
          this.$refs.timeMusic.style.width = progress;
        }, 1000);
      } else {
        clearInterval(this.interval);
      }
    },
    next() {
      this.resetProgressBar();
      clearInterval(this.interval);
      const countList = this.musics.length;
      this.index + 1 >= countList ? this.index : this.index++;
      if (this.current !== undefined) {
        this.player.src = this.current.src;
      }
      this.isPause = false;
    },
    previous() {
      this.resetProgressBar();
      this.index <= 0 ? 0 : this.index--;
      this.player.src =
        this.current.src !== undefined ? this.current.src : this.player.src;
      this.isPause = false;
    },
    resetProgressBar() {
      clearInterval(this.interval);
      this.$refs.timeMusic.style.width = "0%";
    }
  },
  /*  created() {
    this.current = this.musics[this.index];
    this.player.src = this.current.src;
  } */
  mounted() {
    this.selected = this.index;
    this.player.src = this.current.src;
    /*  this.player.duration = */
  }
};
</script>

<style lang="scss">
.iconPlay {
  display: flex;
  justify-content: space-around;
}

.img {
  opacity: 0.8 !important;
}

.timeMusic {
  height: 6px;
  background-color: #857777;
}

.card {
  margin-right: 2px;
}
.iconbtn {
  margin-top: 15px;
  cursor: pointer;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #212121;
}

.span {
  font-size: 33px;
  border-radius: 47px;
}

header {
  display: flex;
  justify-content: center;
  background-color: #111;
  margin: 0px;
  color: #fff;
  padding: 10px;
  margin-bottom: 50px;
}

footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #111;
  height: 60px;
  color: #fff;
  text-align: center;
}
.center {
  display: flex;
  justify-content: center;
}

#artistSpan {
  margin-top: 5px;
  margin-left: 5px;
}
</style>

