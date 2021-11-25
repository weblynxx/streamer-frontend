import { Credentials } from '@/shared/model/credentials';
import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';
import EditProfile from '../editProfile/editProfile.vue';
import EditServices from '../editServices/editServices.vue';
const authModule = namespace('authManagement');
import { instance } from '@/shared/backend';

@Component({})
export default class TwitchRedirectComponent extends Vue {
  mounted() {
    instance.post<any>(`/api/Service/TwitchLogin`, {
      AccessToken: this.$route.query.code,
    }).then((resp:any) => {alert(resp)});
    // instance.post<any>(`/api/Service/TwitchLogin`);
    // this.$router.push('/');
  }
}
