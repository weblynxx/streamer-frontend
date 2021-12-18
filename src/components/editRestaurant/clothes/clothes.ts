import Vue from 'vue';
import { Component, Watch, Ref } from 'vue-property-decorator';
import { Streamer, StreamerEmpty } from '../../../shared/model/user';
import { namespace } from 'vuex-class';
import { Logger } from 'fsts';
import { partnerManagement } from '@/shared/store/modules/partnerManagement';
import { StreamerPartner } from '@/shared/model/partner';

const editProfileManagementModule = namespace('editProfileManagement');
const preferenceModule = namespace('preferenceManagement');
const authModule = namespace('authManagement');
const partnerManagementModule = namespace('partnerManagement');

@Component
export default class ClothesComponent extends Vue {
  @partnerManagementModule.Action('getStreamerPartnersClothes')
  private actionGetStreamerPartnersClothes!: any;
  @partnerManagementModule.Getter('getStreamerPartnersClothes')
  private getterStreamerPartnersClothes!: any;
  @partnerManagementModule.Action('getPartnersClothes')
  private actionGetPartnersClothes!: any;
  @partnerManagementModule.Getter('getPartnersClothes')
  private getterPartnersClothes!: any;

  mounted() {
    this.actionGetPartnersClothes();
    this.actionGetStreamerPartnersClothes().then(() => {
      this.selected = this.getterStreamerPartnersClothes.map(
        (x: StreamerPartner) => x.partnerId
      );
    });
  }

  private isLoading = false;
  private selected = [];

  private updateClothes() {
    this.$emit('update-clothes', this.selected);
  }
}
