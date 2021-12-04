import Vue from 'vue';
import { Component, Watch, Ref } from 'vue-property-decorator';
import { Streamer, StreamerEmpty } from '../../shared/model/user';
import { namespace } from 'vuex-class';
import { Logger } from 'fsts';
import {
  DeliveryTypeEnum,
  Partner,
  PartnerEmpty,
} from '@/shared/model/partner';

const partnerManagementModule = namespace('partnerManagement');

@Component
export default class AdminComponent extends Vue {
  @partnerManagementModule.Action('createPartner')
  private actionCreatePartner!: any;
  @partnerManagementModule.Action('getPartners')
  private actionGetPartners!: any;
  @partnerManagementModule.State('partners')
  private statePartners!: any;
  @partnerManagementModule.State('totalPartners')
  private stateTotalPartners!: number;
  @partnerManagementModule.State('isLoadingPartners')
  private stateIsLoadingPartners!: boolean;

  @partnerManagementModule.State('options') private stateOptions!: any;
  @partnerManagementModule.Action('updateOptions') private updateOptions!: any;

  @Ref('observer-add-partner-form') private observerForm!: any;

  private isLoading = false;
  private partner: Partner = { ...PartnerEmpty };

  private deliveryType = [
    { text: 'Food', value: DeliveryTypeEnum.FOOD },
    { text: 'Clothes', value: DeliveryTypeEnum.CLOTHES },
  ];
  private dialog = false;
  private editedIndex = -1;

  private async addPartner() {
    this.isLoading = true;
    const result = await this.observerForm.validate();
    if (!result) {
      this.isLoading = false;
      return;
    }
    this.actionCreatePartner(this.partner).then(() => {
      this.isLoading = false;
    });
  }

  close() {
    this.dialog = false;
    this.partner = Object.assign({}, PartnerEmpty);
  }

  get headers() {
    return [
      { text: 'UserName', value: 'userName' },
      { text: 'DeliveryName', value: 'deliveryName' },
      { text: '', value: 'actionEdit', sortable: false, width: '1%' },
      { text: '', value: 'actionDelete', sortable: false, width: '1%' },
    ];
  }

  private options: any = {};

  loadOptions() {
    this.options = Object.assign(
      {
        page: 1,
      },
      this.stateOptions
    );
  }
  created() {
    this.loadOptions();
  }
  get searchParams(): any {
    const searchParams: any = {};
    return searchParams;
  }

  @Watch('options', { deep: true })
  public onOptionsChanged(oldV: any, newV: any) {
    if (JSON.stringify(oldV) == JSON.stringify(newV)) return;
    this.OptionsChanged();
  }

  public OptionsChanged() {
    this.updateOptions(this.options);
    this.searchParams.page = this.options.itemsPerPage;
    this.searchParams.rowsPerPage =
      (this.options.page - 1) * this.options.itemsPerPage;
    if (this.options.sortBy.length > 0) {
      if (this.options.sortDesc[0]) {
        this.searchParams.sort = `${this.options.sortBy[0]} desc`;
      } else {
        this.searchParams.sort = `${this.options.sortBy[0]} asc`;
      }
    } else {
      this.searchParams.sort = `id asc`;
    }

    this.actionGetPartners(this.searchParams);
  }
  private async addItem() {
    this.dialog = true;
  }
  private async editItem(item: Partner) {
    this.editedIndex = this.statePartners.indexOf(item);
    this.partner = Object.assign({}, item);
    this.dialog = true;
  }
}
