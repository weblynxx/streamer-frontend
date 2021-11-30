import Vue from 'vue';
import Component from 'vue-class-component';
import { Streamer, StreamerEmpty } from '../../shared/model/user';
import { Action, namespace } from 'vuex-class';
import { Logger } from 'fsts';
import { DefaultViewHelper } from '../ViewHelper';
import { Ref } from 'vue-property-decorator';
import i18n from '../../i18n';
import { localize } from 'vee-validate';

const logger = new Logger('authorization');
const authModule = namespace('authManagement');

@Component
export default class LoginComponent extends Vue {
  @authModule.Action('createStreamer') private actionCreateStreamer!: any;
  @authModule.Action('login') private actionLogin!: any;
  @authModule.Action('loadAccountDetails')
  private actionLoadAccountDetails!: any;
  @Ref('observer-login-form') private observerLoginForm!: any;
  @Ref('observer-register-form') private observerRegisterForm!: any;

  private step = 1;
  private showPassword = false;
  private isLoading = false;
  private tab = 0;

  private newUser: Streamer = {
    ...StreamerEmpty,
  };

  emailChanged() {
    const email = this.newUser.email;
    const suggestedName = email.split('@', 1);
    this.newUser.userName = suggestedName[0];
  }

  private async create() {
    this.isLoading = true;
    const result = await this.observerRegisterForm.validate();
    if (!result) {
      this.isLoading = false;
      return;
    }
    this.newUser.authorities = 'ROLE_STREAMER';
    var payload = {
      newEmployee: this.newUser,
    };
    this.actionCreateStreamer(payload)
      .then(() => {
        this.loginAfterCreateAdmin();
      })
      .catch(() => {
        this.isLoading = false;
      });
  }

  async loginAfterCreateAdmin() {
    const credentialPayload = {
      username: this.newUser.userName,
      password: this.newUser.password,
      rememberMe: true,
    };
    await this.actionLogin(credentialPayload)
      .then(() => {
        this.isLoading = false;
        this.actionLoadAccountDetails()
          .then(() => {
            this.$router.push({ path: '/' });
          })
          .catch(() => {
            this.isLoading = false;
          });
      })
      .catch(() => {
        this.isLoading = false;
      });
    this.isLoading = false;
  }
  public async login() {
    this.isLoading = true;
    var redirect = this.$route.query.redirect as string;
    const credentialPayload = {
      username: this.newUser.userName,
      password: this.newUser.password,
      rememberMe: true,
    };
    const result = await this.observerLoginForm.validate();
    if (!result) {
      this.isLoading = false;
      return;
    }
    await this.actionLogin(credentialPayload)
      .then(() => {
        this.actionLoadAccountDetails()
          .then(() => {
            this.isLoading = false;
            redirect = redirect && redirect != '/' ? redirect : '/';
            this.$router.push({ path: redirect }).catch((e: any) => {
              console.log(e);
            });
            this.isLoading = false; // KPTM-354
          })
          .catch(() => {
            this.isLoading = false;
            logger.debug('error');
          });
      })
      .catch((error: any) => {
        this.isLoading = false;
        if (error.response.data == 'passive_user') {
          DefaultViewHelper.showSnackbarError('eror passive user');
          return;
        }
        // Show snackbar error when login failed
        DefaultViewHelper.showSnackbarError('error.login.login_failed');
      });
  }
  get isMobile() {
    return this.$vuetify.breakpoint.xsOnly;
  }

  @Action('setLocale') public setLocaleForVuex!: any;
  
  private setLocale(locale: string) {
    this.$i18n.locale = locale;
    i18n.locale = locale;
    localStorage.setItem('locale', locale);
    localize(locale);
    this.setLocaleForVuex();
  }
}
