import Vue from 'vue';
import { Component, Watch, Ref } from 'vue-property-decorator';
import { Streamer, StreamerEmpty } from '../../shared/model/user';
import { namespace } from 'vuex-class';
import { Logger } from 'fsts';
import Axios from 'axios';
import router from '@/router';
import { LinkedServices, Service } from '@/shared/model/service';

const authModule = namespace('authManagement');
const editServiceManagementModule = namespace('editServiceManagement');

@Component
export default class EditServiceComponent extends Vue {
  @editServiceManagementModule.Action('getServices')
  private actionGetServices!: any;
  @editServiceManagementModule.Getter('getServices')
  private getterServices!: Service[];

  @editServiceManagementModule.Action('getLinkedServices')
  private actionGetLinkedServices!: any;
  @editServiceManagementModule.Getter('getLinkedServices')
  private getterLinkedServices!: LinkedServices[];

  mounted() {
    this.actionGetServices();
    this.actionGetLinkedServices();
  }
  private isLoading = false;

  //#region  Twitch region
  private twitchOauthUrl() {
    return `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.VUE_APP_TWITCH_CLIENT_ID}&redirect_uri=${process.env.VUE_APP_TWITCH_REDIRECT}/oauth/twitch&response_type=code&scope=user:read:email`;
  }

  get getTwitchFullUrl() {
    let resultUrl = 'https://twitch.tv';
    let twitch = this.getterLinkedServices.find(
      (x: LinkedServices) => x.serviceName == 'Twitch'
    );
    if (twitch != undefined) {
      return resultUrl + '/' + twitch.userName;
    }
    return resultUrl;
  }
  get getVkFullUrl() {
    let resultUrl = 'https://vk.com';
    // let twitch = this.getterLinkedServices.find(
    //   (x: LinkedServices) => x.serviceName == 'Twitch'
    // );
    // if (twitch != undefined) {
    //   return resultUrl + '/' + twitch.userName;
    // }
    return resultUrl;
  }
  get getYoutubeFullUrl() {
    let resultUrl = 'https://youtube.com';
    // let twitch = this.getterLinkedServices.find(
    //   (x: LinkedServices) => x.serviceName == 'Twitch'
    // );
    // if (twitch != undefined) {
    //   return resultUrl + '/' + twitch.userName;
    // }
    return resultUrl;
  }
  get isTwitchLinkDisabled() {
    let twitch = this.getterLinkedServices.find(
      (x: LinkedServices) => x.serviceName == 'Twitch'
    );
    if (twitch != undefined) {
      return true;
    }
    return false;
  }
  //#endregion
}
