import Vue from 'vue';
import Component from 'vue-class-component';
import { User, UserEmpty } from '../../shared/model/user';
import { namespace } from 'vuex-class';
import { Logger } from 'fsts';
import { DefaultViewHelper } from '../ViewHelper';

const logger = new Logger('authorization');
const authModule = namespace('authManagement');

@Component
export default class LoginComponent extends Vue {
  @authModule.Action('createStreamer') private actionCreateStreamer!: any;
  @authModule.Action('login') private actionLogin!: any;
  @authModule.Action('loadAccountDetails')
  private actionLoadAccountDetails!: any;

  private step = 1;
  private showPassword = false;
  private isLoading = false;

  private newUser: User = {
    ...UserEmpty,
  };

  emailChanged() {
    const email = this.newUser.email;
    const suggestedName = email.split('@', 1);
    this.newUser.userName = suggestedName[0];
  }

  private async create() {
    this.newUser.authorities = 'ROLE_STREAMER';
    var payload = {
      newEmployee: this.newUser,
    };
    this.actionCreateStreamer(payload)
      .then(() => {
        this.loginAfterCreateAdmin();
      })
      .catch(() => {});
  }

  async loginAfterCreateAdmin() {
    const credentialPayload = {
      username: this.newUser.userName,
      password: this.newUser.password,
      rememberMe: false,
    };
    await this.actionLogin(credentialPayload).then(() => {
      this.actionLoadAccountDetails()
        .then(() => {
          this.$router.push({ path: '/' });
        })
        .catch(() => {});
    });
  }
  public async login() {
    var redirect = this.$route.query.redirect as string;
    const credentialPayload = {
      username: this.newUser.userName,
      password: this.newUser.password,
      rememberMe: true,
    };
    await this.actionLogin(credentialPayload)
      .then(() => {
        this.actionLoadAccountDetails()
          .then(() => {
            redirect = redirect && redirect != '/' ? redirect : '/';
            this.$router.push({ path: redirect }).catch((e: any) => {
              console.log(e);
            });
            this.isLoading = false; // KPTM-354
          })
          .catch(() => {
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
}
