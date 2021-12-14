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
export default class EditRestaurantComponent extends Vue {
    private tab = 0;
}