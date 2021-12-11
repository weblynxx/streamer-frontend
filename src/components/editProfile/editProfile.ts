import Vue from 'vue';
import { Component, Watch, Ref } from 'vue-property-decorator';
import { Streamer, StreamerEmpty } from '../../shared/model/user';
import { namespace } from 'vuex-class';
import { Logger } from 'fsts';
import PreferenceFoodComponent from './preferenceFood/preferenceFood.vue';
import PreferenceClothesComponent from './preferenceClothes/preferenceClothes.vue';

const editProfileManagementModule = namespace('editProfileManagement');
const preferenceModule = namespace('preferenceManagement');
const authModule = namespace('authManagement');

@Component({
  components: {
    'preference-food': PreferenceFoodComponent,
    'preference-clothes': PreferenceClothesComponent,
  },
})
export default class EditProfileComponent extends Vue {
  @editProfileManagementModule.State('currentUser')
  private stateCurrentUser!: Streamer;
  @editProfileManagementModule.Action('getprofile')
  private actionGetProfile!: any;
  @editProfileManagementModule.Action('updateProfile')
  private actionUpdateProfile!: any;
  @authModule.Action('loadAccountDetails')
  private actionLoadAccountDetails!: any;

  @Ref('observer-edit-profile-form') private observerForm!: any;

  created() {
    this.actionGetProfile().then(() => {
      this.editedProfile = Object.assign({}, this.stateCurrentUser);
    });
  }

  editedProfile: Streamer = {
    ...StreamerEmpty,
  };

  private isLoading = false;

  @editProfileManagementModule.Action('generateNewStreamerId')
  private actionGenerateNewStreamerId!: any;

  generateNewStreamerId() {
    this.isLoading = true;
    this.actionGenerateNewStreamerId().then(() => {
      this.actionGetProfile().then(() => {
        this.editedProfile = Object.assign({}, this.stateCurrentUser);
        this.isLoading = false;
      });
    });
  }

  get isMobile() {
    return this.$vuetify.breakpoint.xsOnly;
  }

  //#region tab
  private tab = 0;

  @editProfileManagementModule.Action('updateStreamerFoodPreferenceText')
  private updateStreamerFoodPreferenceText!: any;
  @preferenceModule.Action('updateStreamerPreferencesFood')
  private updateStreamerPreferencesFood!: any;

  updateFoodPreference(text: string, preferencesIds: string[]) {
    this.updateStreamerFoodPreferenceText(text);
    this.updateStreamerPreferencesFood(preferencesIds);
  }

  @editProfileManagementModule.Action('updateStreamerClothesPreferenceText')
  private updateStreamerClothesPreferenceText!: any;
  @preferenceModule.Action('updateStreamerPreferencesClothes')
  private updateStreamerPreferencesClothes!: any;

  updateClothesPreference(text: string, preferencesIds: string[]) {
    this.updateStreamerClothesPreferenceText(text);
    this.updateStreamerPreferencesClothes(preferencesIds);
  }
  //#endregion
}
