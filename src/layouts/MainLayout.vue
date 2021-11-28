<template>
  <v-app class="transparent_bg">
    <v-app-bar color="transparent" flat class="mt-12">
      <v-container class="py-0 fill-height">
        <v-flex md12 class="d-flex d-flex-inline">
          <v-flex md4 v-if="!isMobile"></v-flex>
          <v-flex md4 class="d-flex justify-center">
            <div class="white--text logo" data-end="AD">Send</div>
          </v-flex>
          <v-row align="center" justify="center" v-if="!isMobile">
            <v-col cols="1"></v-col>
            <v-col cols="3">
              <v-avatar class="pa-2 cursor">
                <v-img
                  :src="
                    $i18n.locale == 'en'
                      ? require(`../assets/en-flag.svg`)
                      : require(`../assets/ru-flag.png`)
                  "
                  aspect-ratio="1.0"
                  @click="setLocale($i18n.locale == 'en' ? 'ru' : 'en')"
                  max-height="32"
                ></v-img>
              </v-avatar>
              <span class="white--text">{{
                $i18n.locale == 'en' ? 'English' : 'Русский'
              }}</span>
            </v-col>
            <v-col cols="8"> </v-col>
          </v-row>
          <v-row align="center" justify="center" v-else>
            <v-col>
              <v-avatar class="pa-2">
                <v-img
                  :src="
                    $i18n.locale == 'en'
                      ? require(`../assets/en-flag.svg`)
                      : require(`../assets/ru-flag.png`)
                  "
                  aspect-ratio="1.0"
                  @click="setLocale($i18n.locale == 'en' ? 'ru' : 'en')"
                  max-height="32"
                ></v-img>
              </v-avatar>
              <span class="white--text">{{
                $i18n.locale == 'en' ? 'English' : 'Русский'
              }}</span>
            </v-col>
          </v-row>
        </v-flex>
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
  font-family: 'Exo', sans-serif;
}
.transparent_bg {
  background-color: transparent !important;
}
.logo {
  font-family: Gilroy;
  font-size: 100px;
  font-style: normal;
  font-weight: 900;
  line-height: 125px;
  letter-spacing: 0em;
  text-align: left;
}
.logo::after {
  content: attr(data-end);
  color: #fea116;
}
.cursor {
  cursor: pointer;
}
</style>
<script lang="ts">
import router from '@/router';
import { Snackbar } from '@/shared/model/snackbar';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, State } from 'vuex-class';
import EmptyLayout from './EmptyLayout.vue';
import i18n from '../i18n';
import { localize } from 'vee-validate';
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
  @Action('setLocale') public setLocaleForVuex!: any;

  private setLocale(locale: string) {
    this.$i18n.locale = locale;
    i18n.locale = locale;
    localStorage.setItem('locale', locale);
    localize(locale);
    this.setLocaleForVuex();
  }
  get isMobile() {
    return this.$vuetify.breakpoint.xsOnly;
  }
}
</script>
