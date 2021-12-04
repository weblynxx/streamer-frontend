<template>
  <v-app class="transparent_bg">
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
  </v-app>
</template>
<style>
@import url('../style/fonts/Gilroy/stylesheet.css');
html,
body {
  margin: 0;
  height: 100%;
  background: url('../assets/bg_main.png');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

body {
  font-family: 'Gilroy', sans-serif !important;
  font: optional;
}
</style>
<style>
@font-face {
  font-family: 'Gilroy';
  src: local('../style/fonts/Gilroy/stylesheet.css'),
    url(../style/fonts/Gilroy/Gilroy-Light.ttf) format('truetype');
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
