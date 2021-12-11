import Vue from 'vue';
import { Component, Watch, Ref, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Logger } from 'fsts';
import { Streamer } from '@/shared/model/user';
import { StreamerPreference } from '@/shared/model/preference';

const preferenceModule = namespace('preferenceManagement');
const editProfileManagementModule = namespace('editProfileManagement');

@Component
export default class PreferenceClothesComponent extends Vue {
  @editProfileManagementModule.State('currentUser')
  private stateCurrentUser!: Streamer;

  @preferenceModule.Action('getPreferencesClothes')
  private actionGetPreferencesClothes!: any;
  @preferenceModule.Getter('getPreferencesClothes')
  private getterPreferencesClothes!: any;
  @preferenceModule.Action('getStreamerPreferencesClothes')
  private actionGetStreamerPreferencesClothes!: any;
  @preferenceModule.Getter('getStreamerPreferencesClothes')
  private getterStreamerPreferencesClothes!: StreamerPreference[];

  created() {
    this.actionGetPreferencesClothes();
    this.actionGetStreamerPreferencesClothes().then(() => {
      this.selected = this.getterStreamerPreferencesClothes.map(
        (x: StreamerPreference) => x.preferenceId
      );
    });
  }
  private selected: string[] = [];

  private isLoading = false;

  get isMobile() {
    return this.$vuetify.breakpoint.xsOnly;
  }

  private updateClothesData() {
    this.$emit(
      'update-clothes-preference',
      this.stateCurrentUser.clothesPreferenceText,
      this.selected
    );
  }
}
