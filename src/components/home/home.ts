import { Credentials } from '@/shared/model/credentials';
import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';
import EditProfile from '../editProfile/editProfile.vue';
import EditServices from '../editServices/editServices.vue';

const authModule = namespace('authManagement');

@Component({
  components: {
    'edit-profile': EditProfile,
    'edit-services': EditServices,
  },
})
export default class HomeComponent extends Vue {
  @authModule.Action('logout') private actionLogout: any;
  @authModule.Getter('getUser') private currentUser!: Credentials;

  private streanerId = '1d3a228a-516b-4598-bebc-8326ba6ca9cf';
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
