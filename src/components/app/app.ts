import Vue from 'vue';
import Component from 'vue-class-component';
import EmptyLayout from '@/layouts/emptyLayout/emptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import PublicLayout from '@/layouts/publicLayout/publicLayout.vue';
@Component({
  components: {
    EmptyLayout,
    MainLayout,
    AdminLayout,
    PublicLayout,
  },
})
export default class AppComponent extends Vue {
  get layout() {
    if (this.$route.meta?.layout != undefined) {
      return this.$route.meta!.layout + '-layout';
    }
    return 'empty-layout';
  }

  mounted() {}
}
