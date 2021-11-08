<template>
  <v-app>
    <div class="area">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <v-app-bar color="white" app flat>
      <v-container class="py-0 fill-height">
        <v-btn text color="black"> Home</v-btn>
        <v-btn text color="black"> About </v-btn>
        <v-spacer></v-spacer>
        <span class="text-h4 black--text">StreamerId</span>
      </v-container>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
      <v-snackbar
        top
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="snackbar.duration"
        right
      >
        {{ snackbar.text }}

        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="releaseSnackbar()">
            Ok
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>
<style>
@import url('https://fonts.googleapis.com/css?family=Exo:400,700');
body {
  background-color: transparent;
  font-family: 'Exo', sans-serif;
}

.area {
  background: white;
  background: -webkit-linear-gradient(to left, #8f94fb, #ffffff);
  width: 100%;
  height: 100vh;
  position: absolute;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 120, 255, 0.2);
  animation: animate 10s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
  animation-duration: infinite;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: infinite;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
  animation-duration: infinite;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: infinite;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
  animation-duration: infinite;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
  animation-duration: infinite;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
  animation-duration: infinite;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: infinite;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: infinite;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: infinite;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>
<script lang="ts">
import router from '@/router';
import { Snackbar } from '@/shared/model/snackbar';
import Vue from 'vue';
import Component from 'vue-class-component';
import { State } from 'vuex-class';
import EmptyLayout from './EmptyLayout.vue';
@Component({
  components: {
    'empty-layout': EmptyLayout,
  },
})
export default class MainLayout extends Vue {
  @State('snackbar') public stateSnackbar!: Snackbar;
  // computed
  get snackbar() {
    return this.stateSnackbar;
  }
}
</script>
