import Vue from 'vue';
import { Component, Watch, Ref } from 'vue-property-decorator';
import { Streamer, StreamerEmpty } from '../../shared/model/user';
import { namespace } from 'vuex-class';
import { Logger } from 'fsts';
import RestuarantsComponent from './restuarants/restuarants.vue';

const editProfileManagementModule = namespace('editProfileManagement');
const preferenceModule = namespace('preferenceManagement');
const authModule = namespace('authManagement');
const partnerManagementModule = namespace('partnerManagement');

@Component({
  components: {
    'restuarants-component': RestuarantsComponent,
  },
})
export default class EditRestaurantComponent extends Vue {
  @partnerManagementModule.Action('getPartnersFood')
  private actionGetPartnersFood!: any;
  @partnerManagementModule.Getter('getPartnersFood')
  private getterPartnersFood!: any;

  mounted() {
    this.actionGetPartnersFood();
  }

  private tab = 0;

  @partnerManagementModule.Action('updateStreamerRestuarants')
  private updateStreamerRestuarants!: any;

  updateRestuarants(restuarantsId: string[]) {
    this.updateStreamerRestuarants(restuarantsId);
  }
}
