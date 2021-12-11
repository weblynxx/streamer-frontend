import Vue from 'vue';
import { Component, Watch, Ref, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Logger } from 'fsts';
import { Streamer } from '@/shared/model/user';
import { StreamerPreference } from '@/shared/model/preference';

const preferenceModule = namespace('preferenceManagement');
const editProfileManagementModule = namespace('editProfileManagement');

@Component
export default class PreferenceFoodComponent extends Vue {
  @editProfileManagementModule.State('currentUser')
  private stateCurrentUser!: Streamer;

  @preferenceModule.Action('getPreferencesFood')
  private actionGetPreferencesFood!: any;
  @preferenceModule.Getter('getPreferencesFood')
  private getterPreferencesFood!: any;
  @preferenceModule.Action('getStreamerPreferencesFood')
  private actionGetStreamerPreferencesFood!: any;
  @preferenceModule.Getter('getStreamerPreferencesFood')
  private getterStreamerPreferencesFood!: StreamerPreference[];

  created() {
    this.actionGetPreferencesFood();
    this.actionGetStreamerPreferencesFood().then(() => {
      this.selected = this.getterStreamerPreferencesFood.map(
        (x: StreamerPreference) => x.preferenceId
      );
    });
  }
  private selected: string[] = [];

  private isLoading = false;
  get isMobile() {
    return this.$vuetify.breakpoint.xsOnly;
  }

  private updateFoodData() {
    this.$emit(
      'update-food-preference',
      this.stateCurrentUser.foodPreferenceText,
      this.selected
    );
  }
}
