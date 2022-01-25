import router from '@/router';
import { Snackbar } from '@/shared/model/snackbar';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, State } from 'vuex-class';
@Component
export default class EmptyLayout extends Vue {
  @State('snackbar') public stateSnackbar!: Snackbar;
  @Action('releaseSnackbar') private releaseSnackbar: any;
  // computed
  get snackbar() {
    return this.stateSnackbar;
  }
}
