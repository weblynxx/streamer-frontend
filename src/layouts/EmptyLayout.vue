<template>
  <div class="area">
    <ul class="circles">
      <li v-for="index in 100" :key="index"></li>
    </ul>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col>
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
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
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css?family=Exo:400,700');
body {
  background-color: transparent;
  font-family: 'Exo', sans-serif;
}

.area {
  background: #4e54c8;
  background: -webkit-linear-gradient(to left, #8f94fb, #ffffff);
  width: 100%;
  height: 100vh;
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
  animation: animate 1s linear infinite;
  bottom: 0;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 5s;
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
import { Action, State } from 'vuex-class';

@Component
export default class EmptyLayout extends Vue {
  @State('snackbar') public stateSnackbar!: Snackbar;
  @Action('releaseSnackbar') private releaseSnackbar: any;
  // computed
  get snackbar() {
    return this.stateSnackbar;
  }
}
</script>
