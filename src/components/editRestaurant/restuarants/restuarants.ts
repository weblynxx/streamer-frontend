import Vue from 'vue';
import { Component, Watch, Ref } from 'vue-property-decorator';
import { Streamer, StreamerEmpty } from '../../../shared/model/user';
import { namespace } from 'vuex-class';
import { Logger } from 'fsts';
import { partnerManagement } from '@/shared/store/modules/partnerManagement';

const editProfileManagementModule = namespace('editProfileManagement');
const preferenceModule = namespace('preferenceManagement');
const authModule = namespace('authManagement');
const partnerManagementModule = namespace('partnerManagement');

@Component
export default class RestaurantComponent extends Vue {
  @partnerManagementModule.Action('getPartnersFood')
  private actionGetPartnersFood!: any;
  @partnerManagementModule.Getter('getPartnersFood')
  private getterPartnersFood!: any;

  created() {
    this.actionGetPartnersFood();
  }

  private isLoading = false;
  private selected = [];
}
