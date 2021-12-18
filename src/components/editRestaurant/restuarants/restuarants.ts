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
export default class RestaurantComponent extends Vue {
  @partnerManagementModule.Action('getStreamerPartnersFood')
  private actionGetStreamerPartnersFood!: any;
  @partnerManagementModule.Getter('getStreamerPartnersFood')
  private getterStreamerPartnersFood!: any;
  @partnerManagementModule.Action('getPartnersFood')
  private actionGetPartnersFood!: any;
  @partnerManagementModule.Getter('getPartnersFood')
  private getterPartnersFood!: any;

  mounted() {
    this.actionGetPartnersFood();
    this.actionGetStreamerPartnersFood().then(() => {
      this.selected = this.getterStreamerPartnersFood.map(
        (x: StreamerPartner) => x.partnerId
      );
    });
  }

  private isLoading = false;
  private selected = [];

  private updateRestuarants() {
    this.$emit('update-restuarants', this.selected);
  }
}
