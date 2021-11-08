import Vue from 'vue';
import { Component, Watch, Ref } from 'vue-property-decorator';
import { User, UserEmpty } from '../../shared/model/user';
import { namespace } from 'vuex-class';
import { Logger } from 'fsts';

const editProfileManagementModule = namespace('editProfileManagement');
const authModule = namespace('authManagement');

@Component
export default class EditProfileComponent extends Vue {
  @editProfileManagementModule.State('currentUser')
  private stateCurrentUser!: User;
  @editProfileManagementModule.Action('getprofile')
  private actionGetProfile!: any;
  @editProfileManagementModule.Action('updateProfile')
  private actionUpdateProfile!: any;
  @authModule.Action('loadAccountDetails')
  private actionLoadAccountDetails!: any;

  @Ref('observer-edit-profile-form') private observerForm!: any;

  created() {
    this.actionGetProfile().then(() => {
      this.updateProfile = Object.assign({}, this.stateCurrentUser);
    });
  }

  updateProfile: User = {
    ...UserEmpty,
  };
}
