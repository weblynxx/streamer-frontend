import Vue from 'vue';
import { Component, Watch, Ref } from 'vue-property-decorator';
import { Streamer, StreamerEmpty } from '../../shared/model/user';
import { namespace } from 'vuex-class';
import { Logger } from 'fsts';

const editProfileManagementModule = namespace('editProfileManagement');
const authModule = namespace('authManagement');

@Component
export default class EditContactDataComponent extends Vue {
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

  @editProfileManagementModule.Action('updateStreamerContactData')
  private actionUpdateStreamerContactData!: any;
  async save() {
    this.isLoading = true;
    const result = await this.observerForm.validate();
    if (!result) {
      this.isLoading = false;
      return;
    }
    this.actionUpdateStreamerContactData(this.editedProfile).then(() => {
      this.init();
      this.isLoading = false;
    });
  }
}
