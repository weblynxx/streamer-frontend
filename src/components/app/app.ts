import Vue from 'vue';
import Component from 'vue-class-component';
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';
@Component({
  components: {
    EmptyLayout,
    MainLayout,
  },
})
export default class AppComponent extends Vue {
  get layout() {
    if (this.$route.meta?.layout != undefined) {
      return this.$route.meta!.layout + '-layout';
    }
    return 'empty-layout';
  }
}
