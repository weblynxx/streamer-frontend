import Vue from 'vue';
import { Component, Ref } from 'vue-property-decorator';
import { Streamer, StreamerEmpty } from '../../shared/model/user';
import { namespace } from 'vuex-class';

const editProfileManagementModule = namespace('editProfileManagement');

@Component
export default class EditTimeDeliveryComponent extends Vue {
  @editProfileManagementModule.State('currentUser')
  private stateCurrentUser!: Streamer;
  @editProfileManagementModule.Action('getprofile')
  private actionGetProfile!: any;
  @editProfileManagementModule.Action('updateProfile')
  private actionUpdateProfile!: any;

  @Ref('observer-edit-contact-data-form') private observerForm!: any;

  created() {
    this.init();
  }
  init() {
    this.actionGetProfile().then(() => {
      this.editedProfile = Object.assign({}, this.stateCurrentUser);
    });
  }
  editedProfile: Streamer = {
    ...StreamerEmpty,
  };

  private isLoading = false;
}
