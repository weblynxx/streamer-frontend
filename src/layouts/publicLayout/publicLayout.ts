import { Snackbar } from '@/shared/model/snackbar';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, Mutation, namespace, State } from 'vuex-class';
import i18n from '../../i18n';
import { localize } from 'vee-validate';
import { Credentials } from '@/shared/model/credentials';
import { PublicStreamer } from '@/shared/model/publicStreamer';

const publicStreamerModule = namespace('publicStreamerManagement');

@Component
export default class PublicLayout extends Vue {
  @State('snackbar') public stateSnackbar!: Snackbar;
  @Mutation('setSnackbarSuccess') public setSnackbarSuccess!: any;
  @Action('releaseSnackbar') private releaseSnackbar: any;
  @Action('setLocale') public setLocaleForVuex!: any;

  @publicStreamerModule.Action('getPublicStreamer')
  private actionGetPublicStreamer!: any;
  @publicStreamerModule.Getter('getStreamer')
  private getterStreamer!: PublicStreamer;

  mounted() {
    let username = this.$route.params.username;
    if (username != '') {
      this.actionGetPublicStreamer(username);
    }
  }

  get timeDelivery() {
    return (
      this.getterStreamer.from.slice(0, 5) +
      ' - ' +
      this.getterStreamer.to.slice(0, 5)
    );
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.getterStreamer.streamerId).then(() => {
      this.setSnackbarSuccess(
        {
          message: i18n.tc('publicStreamer_management.success.copy_streamerId'),
          duration: 5000,
        },
        { root: true }
      );
    });
  }

  //#region linked services

  get getTwitchFullUrl() {
    let resultUrl = 'https://twitch.tv';
    // let twitch = this.getterStreamer..find(
    //   (x: LinkedServices) => x.serviceName == 'Twitch'
    // );
    // if (twitch != undefined) {
    //   return resultUrl + '/' + twitch.userName;
    // }
    return resultUrl;
  }

  //#endregion

  get snackbar() {
    return this.stateSnackbar;
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
}
