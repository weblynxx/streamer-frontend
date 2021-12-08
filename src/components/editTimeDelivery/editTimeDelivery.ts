import Vue from 'vue';
import { Component, Ref } from 'vue-property-decorator';
import { Streamer, StreamerEmpty } from '../../shared/model/user';
import { namespace } from 'vuex-class';
import { TheMask } from 'vue-the-mask';
import moment from 'moment';
import i18n from '@/i18n';

const editProfileManagementModule = namespace('editProfileManagement');

@Component({
  components: {
    TheMask,
  },
})
export default class EditTimeDeliveryComponent extends Vue {
  @editProfileManagementModule.State('currentUser')
  private stateCurrentUser!: Streamer;
  @editProfileManagementModule.Action('getprofile')
  private actionGetProfile!: any;
  @editProfileManagementModule.Action('updateProfile')
  private actionUpdateProfile!: any;

  @Ref('observer-edit-time-delivery-form') private observerForm!: any;

  created() {
    this.init();
  }
  init() {
    this.actionGetProfile().then(() => {
      this.editedProfile = Object.assign({}, this.stateCurrentUser);
      this.timeInterval =
        this.editedProfile.from.slice(0, 5) +
        ' - ' +
        this.editedProfile.to.slice(0, 5);
    });
  }
  editedProfile: Streamer = {
    ...StreamerEmpty,
  };

  private isLoading = false;
  private timeInterval = '00:00 - 00:00';
  private disabledInterval = true;

  get titleForBtnTime() {
    if (this.disabledInterval) {
      return i18n.tc('timeDelivery_management.edit');
    } else {
      return i18n.tc('app.actions.save');
    }
  }

  get titleForBtnDelivery() {
    if (!this.editedProfile.isStoppedDelivery) {
      return i18n.tc('timeDelivery_management.stop_delivery');
    } else {
      return i18n.tc('timeDelivery_management.start_delivery');
    }
  }

  private handleInput(interval: string) {
    let split = interval.split(' - ');
    if (split.length != 2) {
      return undefined;
    }
    if (split[0].length != 5 || split[1].length != 5) {
      return undefined;
    }
    let first = moment(split[0], 'hh:mm');
    let second = moment(split[1], 'hh:mm');
    if (!first.isValid() || !second.isValid()) {
      return undefined;
    }

    return {
      from: first,
      to: second,
    };
  }

  @editProfileManagementModule.Action('updateStreamerTimeDelivery')
  private actionUpdateStreamerTimeDelivery!: any;

  private async saveTime() {
    if (this.disabledInterval) {
      this.disabledInterval = !this.disabledInterval;
      return;
    }
    const result = await this.observerForm.validate();
    if (!result && !this.disabledInterval) {
      return;
    }
    this.disabledInterval = !this.disabledInterval;
    if (!this.disabledInterval) {
      return;
    }
    const { from, to }: any = this.handleInput(this.timeInterval);
    this.editedProfile.from = from.format('HH:mm');
    this.editedProfile.to = to.format('HH:mm');
    this.actionUpdateStreamerTimeDelivery(this.editedProfile).then(() => {
      this.init();
    });
  }
  private turnOffOnDelivery() {
    this.editedProfile.isStoppedDelivery = !this.editedProfile
      .isStoppedDelivery;
    this.actionUpdateStreamerTimeDelivery(this.editedProfile).then(() => {
      this.init();
    });
  }
}
