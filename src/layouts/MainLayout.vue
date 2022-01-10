<template>
  <v-app class="transparent_bg">
    <v-dialog v-model="showFileUploadDialog" :max-width="800" persistent>
      <v-card>
        <v-card-title>
          Загрузить аватар
        </v-card-title>
        <v-card-text>
          <v-file-input
            id="file__upload__input"
            :show-size="7000"
            label="filename"
            hint="Please select png file"
            :persistent-hint="true"
            name="cv"
            v-model="cv"
            prepend-inner-icon="mdi-paperclip"
            prepend-icon=""
            accept=".png"
            @change="onChange"
          >
          </v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            id="document__upload__close__btn"
            color="error"
            text
            @click="clickClose"
            v-t="$t('app.actions.cancel')"
          >
          </v-btn>
          <v-btn
            id="document-upload__upload__btn"
            color="primary"
            text
            :disabled="!hasFile || isLoading"
            @click="uploadImage"
            v-t="$t('app.actions.save')"
          >
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      persistent
      v-model="dialog"
      @keydown.esc="close"
      max-width="700px"
    >
      <v-card>
        <v-toolbar dark color="" class="elevation-0">
          <v-toolbar-title>{{
            $t('home_management.settings')
          }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pt-4">
          <validation-observer ref="observer-settings-form">
            <validation-provider
              name="login"
              mode="lazy"
              :rules="
                `required|max:32|verify_already_exist_username:${currentUser.id}`
              "
              v-slot="{ errors }"
            >
              <v-text-field
                :label="$t('auth_management.login')"
                color="#55597D"
                outlined
                class="rounded-lg"
                v-model="currentUser.userName"
                background-color="rgba(169, 162, 164, 0.3)"
                :error-messages="errors[0]"
              ></v-text-field>
            </validation-provider>

            <validation-provider
              name="firstName"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                :label="$t('auth_management.first_name')"
                v-model="currentUser.firstName"
                outlined
                class="rounded-lg"
                color="#55597D"
                background-color="rgba(169, 162, 164, 0.3)"
                :error-messages="errors[0]"
              ></v-text-field>
            </validation-provider>
            <validation-provider
              name="lastName"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                :label="$t('auth_management.last_name')"
                v-model="currentUser.lastName"
                outlined
                class="rounded-lg"
                color="#55597D"
                background-color="rgba(169, 162, 164, 0.3)"
                :error-messages="errors[0]"
              ></v-text-field>
            </validation-provider>
            <v-btn
              v-t="'home_management.change_logo'"
              color="#F12C5E"
              class="white--text"
              @click="showFileUploadDialog = true"
            ></v-btn>
          </validation-observer>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            v-t="'app.actions.cancel'"
            color="error"
            class="white--text px-10"
            @click="close"
          ></v-btn>
          <v-btn
            v-t="'app.actions.save'"
            class="white--text px-10"
            color="primary"
            :disabled="isLoading"
            :loading="isLoading"
            @click="updateProfile"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-app-bar color="transparent" flat class="mt-12" style="flex:0">
      <v-container>
        <v-row align="center">
          <v-flex
            md12
            class="d-flex d-flex-inline offset-sm-3 offset-md-3 offset-lg-3"
          >
            <v-flex md6 class="d-flex justify-center offset-1">
              <div class="white--text logo" data-end="Fans  ">From</div>
            </v-flex>
            <v-row align="center" justify="end">
              <v-col cols="12">
                <v-flex md12 class="d-flex d-flex-inline ">
                  <v-flex md4 class="d-flex ml-auto mr-auto">
                    <v-avatar class="pa-2 mt-2 cursor">
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
                    <span v-if="!isMobile" class="white--text mt-5">{{
                      $i18n.locale == 'en' ? 'English' : 'Русский'
                    }}</span>
                  </v-flex>
                </v-flex>
              </v-col>
            </v-row>
          </v-flex>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" xs="12" sm="4" md="4" lg="3" xl="3">
            <v-card
              rounded="lg"
              :img="require(`../assets/bg_main_profile.png`)"
            >
              <v-card-text>
                <v-row align="center" justify="center">
                  <v-col>
                    <v-flex class="d-flex d-flex-inline">
                      <v-avatar color="indigo" max-height="60" max-width="60">
                        <v-img :src="getterLogo"> </v-img>
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
                  <v-col align="right" justify="center" cols="3">
                    <v-flex class="d-flex d-flex-inline">
                      <v-img
                        v-if="isMobile"
                        class="cursor mr-2"
                        :src="require(`../assets/Logout.png`)"
                        max-width="28"
                        max-height="28"
                        @click="logout"
                      >
                      </v-img>
                      <v-img
                        :src="require(`../assets/setting.png`)"
                        max-width="30"
                        max-height="30"
                        class="cursor"
                        @click="dialog = true"
                      >
                      </v-img>
                    </v-flex>
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
                  <v-list-item link to="/editRestaurant">
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
              v-if="!isMobile"
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
          <v-col cols="12" xs="12" sm="8" md="8" lg="8" xl="6">
            <v-card rounded="lg" color="transparent" class="elevation-0">
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
  background: url('../assets/bg_main2.png');
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
  font-style: normal;
  font-size: 70px !important;
  font-weight: 900;
  line-height: 125px;
  letter-spacing: 0em;
  text-align: left;
}
.logo::after {
  content: attr(data-end);
  color: #f12c5e;
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
.v-text-field fieldset {
  border: none !important;
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
@media only screen and (max-width: 1264px) {
  .logo {
    font-size: 60px !important;
  }
}
@media only screen and (max-width: 960px) {
  .logo {
    font-size: 50px !important;
  }
}
@media only screen and (max-width: 600px) {
  .logo {
    font-size: 40px !important;
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
import { editProfileManagement } from '@/shared/store/modules/editProfileManagement';
import { Ref } from 'vue-property-decorator';

const authModule = namespace('authManagement');
const editProfileManagementModule = namespace('editProfileManagement');

@Component
export default class MainLayout extends Vue {
  @State('snackbar') public stateSnackbar!: Snackbar;
  // computed
  get snackbar() {
    return this.stateSnackbar;
  }
  @Action('setLocale') public setLocaleForVuex!: any;

  @Ref('observer-settings-form') private observerForm!: any;

  mounted() {
    this.actionGetLogo();
  }

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
  @authModule.Getter('getUser') private currentUser!: any;

  get message() {
    return {
      name: `${this.currentUser.lastName}, ${this.currentUser.firstName}`,
      title: 'Welcome to Vuetify!',
    };
  }
  private dialog = false;

  private logout() {
    this.actionLogout().then((result: any) => {
      this.$router.push('/login');
    });
  }
  private close() {
    this.dialog = false;
  }
  private isLoading = false;

  @editProfileManagementModule.Action('updateProfile')
  private actionUpdateProfile!: any;

  private async updateProfile() {
    this.isLoading = true;
    const result = await this.observerForm.validate();
    if (!result) {
      this.isLoading = false;
      return;
    }
    this.actionUpdateProfile(this.currentUser).then(() => {
      this.isLoading = false;
      this.close();
    });
  }

  //#region upload image

  private showFileUploadDialog = false;

  changeMainImage() {
    this.showFileUploadDialog = true;
  }

  cv: any = null;
  private hasFile = false;

  private onChange(e: any) {
    const isInputHasFile = e && e.name ? true : false;
    this.hasFile = isInputHasFile;
  }

  @editProfileManagementModule.Action('uploadLogo')
  private actionUploadImage!: any;
  @editProfileManagementModule.Action('getLogo')
  private actionGetLogo!: any;
  @editProfileManagementModule.Getter('logo')
  private getterLogo!: any;

  async uploadImage(payload: any) {
    this.isLoading = true;
    await this.actionUploadImage({
      file: this.cv,
      targetFolder: 'logo',
    })
      .then((result: string) => {
        payload.id = result;
        this.actionGetLogo();
      })
      .finally(() => {
        this.isLoading = false;
        this.cv = null;
        this.showFileUploadDialog = false;
      });
  }

  clickClose() {
    this.showFileUploadDialog = false;
  }

  //#endregion
}
</script>
