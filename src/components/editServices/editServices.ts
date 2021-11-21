import Vue from 'vue';
import { Component, Watch, Ref } from 'vue-property-decorator';
import { User, UserEmpty } from '../../shared/model/user';
import { namespace } from 'vuex-class';
import { Logger } from 'fsts';
import Axios from 'axios';
import router from '@/router';
import { Service } from '@/shared/model/service';

const authModule = namespace('authManagement');
const editServiceManagementModule = namespace('editServiceManagement');

@Component
export default class EditServiceComponent extends Vue {
  @editServiceManagementModule.Action('getServices')
  private actionGetServices!: any;
  @editServiceManagementModule.Getter('getServices')
  private getterServices!: Service[];

  mounted() {
    this.actionGetServices();
  }
  private twitchOauthUrl() {
    return `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.VUE_APP_TWITCH_CLIENT_ID}&redirect_uri=http://localhost:2002/oauth/twitch&response_type=code&scope=user:read:email`;
  }
}
