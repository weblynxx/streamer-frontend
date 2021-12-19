import { Snackbar } from '@/shared/model/snackbar';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, namespace, State } from 'vuex-class';
import i18n from '../../i18n';
import { localize } from 'vee-validate';
import { Credentials } from '@/shared/model/credentials';
import { PublicStreamer } from '@/shared/model/publicStreamer';

const publicStreamerModule = namespace('publicStreamerManagement');

@Component
export default class PublicLayout extends Vue {
  @State('snackbar') public stateSnackbar!: Snackbar;
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
