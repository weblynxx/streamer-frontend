<template>
  <v-app class="transparent_bg">
    <v-app-bar color="transparent" flat class="mt-12">
      <v-container class="py-0 fill-height">
        <v-row align="center">
          <v-col align="right" cols="7">
            <v-img
              :src="require(`../assets/SendAD.png`)"
              max-height="100"
              max-width="300"
            ></v-img>
          </v-col>
          <v-col align="center">
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
            }}</span></v-col
          >
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container class="mb-10">
        <v-row>
          <v-col cols="12" xs="12" sm="4" md="4" lg="3">
            <v-card
              rounded="lg"
              :img="require(`../assets/bg_main_profile.png`)"
            >
              <v-card-text>
                <v-row align="center" justify="center">
                  <v-col>
                    <v-flex class="d-flex d-flex-inline">
                      <v-avatar color="indigo" max-height="60" max-width="60">
                        <v-icon dark>
                          mdi-account-circle
                        </v-icon>
                      </v-avatar>
                      <v-flex
                        class="d-flex black--text profile_form_text ml-4 mt-2"
                      >
                        {{
                          currentUser.lastName + ', ' + currentUser.firstName
                        }}
                      </v-flex>
                    </v-flex>
                  </v-col>
                  <v-col align="right" justify="center" cols="2">
                    <v-img
                      :src="require(`../assets/setting.png`)"
                      max-width="30"
                      max-height="30"
                    >
                    </v-img>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card
              class="profile_form mt-2"
              rounded="lg"
              :img="require(`../assets/bg_main_profile.png`)"
            >
              <v-card-text>
                <v-list color="transparent">
                  <v-list-item link to="/">
                    <v-list-item-action>
                      <v-img :src="require(`../assets/Profile.png`)"></v-img>
                    </v-list-item-action>
                    <v-list-item-title class="black--text">
                      {{ $t('home_management.profile') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item link to="/services">
                    <v-list-item-action>
                      <v-img :src="require(`../assets/Send.png`)"></v-img>
                    </v-list-item-action>
                    <v-list-item-title class="black--text">
                      {{ $t('home_management.integrations') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item link to="/editContactData">
                    <v-list-item-action>
                      <v-img
                        :src="require(`../assets/Contact_data.png`)"
                      ></v-img>
                    </v-list-item-action>
                    <v-list-item-title class="black--text">
                      {{ $t('home_management.contact_data') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item link to="/editContactData">
                    <v-list-item-action>
                      <v-img :src="require(`../assets/restorants.png`)"></v-img>
                    </v-list-item-action>
                    <v-list-item-title class="black--text">
                      {{ $t('home_management.my_restaurants') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item link to="/editTimeDelivery">
                    <v-list-item-action>
                      <v-img
                        :src="require(`../assets/delivery_time.png`)"
                      ></v-img>
                    </v-list-item-action>
                    <v-list-item-title class="black--text">
                      {{ $t('home_management.delivery_time') }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
            <v-flex
              class="d-flex mt-12  cursor"
              @click="logout"
              style="align-items:center"
            >
              <v-img
                :src="require(`../assets/Logout.png`)"
                max-width="48"
                max-height="48"
              >
              </v-img>
              <v-flex class=" white--text logout">
                {{ $t('auth_management.logout') }}
              </v-flex>
            </v-flex>
          </v-col>
          <v-col cols="12" xs="12" sm="8" md="8" lg="6">
            <v-card min-height="50vh" rounded="lg" color="#1F2340">
              <router-view></router-view>
            </v-card>
          </v-col>
          <v-col cols="4"></v-col>
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
.profile_form_text {
  font-size: 20px;
  font-weight: 500;
  line-height: 35px;
  text-align: left;
}
.logout {
  font-size: 25px;
}

/* .v-text-field input {
  color: white !important;
  font-size: 18px;
  line-height: 21px;
} */

@media only screen and (min-width: 600px) and (max-width: 960px) {
  .main_login_form {
    border-radius: 10px !important;
  }
  .profile_form_text {
    font-size: 15px !important;
  }
  .logout {
    font-size: 15px;
  }
}
</style>
<script lang="ts">
import { Snackbar } from '@/shared/model/snackbar';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, namespace, State } from 'vuex-class';
import i18n from '../i18n';
import { localize } from 'vee-validate';
import { Credentials } from '@/shared/model/credentials';

const authModule = namespace('authManagement');

@Component
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
  @authModule.Action('logout') private actionLogout: any;
  @authModule.Getter('getUser') private currentUser!: Credentials;

  get message() {
    return {
      name: `${this.currentUser.lastName}, ${this.currentUser.firstName}`,
      title: 'Welcome to Vuetify!',
    };
  }
  private window = 0;

  private logout() {
    this.actionLogout().then((result: any) => {
      this.$router.push('/login');
    });
  }
}
</script>
