import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/components/home/home.vue';
import AuthorityUtils from './shared/backend/authorityUtils';
import { AUTHORITIES } from './shared/store/modules/auth';
import { Logger } from 'fsts';

Vue.use(VueRouter);
const logger = new Logger('router');

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: 'Login',
        layout: 'empty',
        requiresAuth: false,
      },
      component: () => import('@/components/login/login.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/home/home.vue'),
      meta: {
        title: 'Home Page',
        layout: 'main',
        requiresAuth: true,
        requiresRole: [AUTHORITIES.STREAMER],
      },
    },

    {
      path: '/oauth/twitch',
      name: 'TwitchOAuth',
      meta: {
        title: 'TwitchOAuth',
        layout: 'main',
        requiresAuth: true,
        requiresRole: [AUTHORITIES.STREAMER],
      },
      component: () => import('@/components/redirects/twitch/twitch.vue'),
    },
    {
      path: '/',
      redirect: '/login',
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title + ' | Streamer';
  if (to.name == undefined) {
    next({
      path: '/login',
    });
    return;
  }
  // always load api information
  await AuthorityUtils.getApiInfo();
  if (to.path == 'login') {
    next();
    return;
  }
  // does the route require authorization?
  if (!to.matched.some(record => record.meta.requiresAuth)) {
    next();
    return;
  }
  try {
    // enforce loading of account details
    await AuthorityUtils.ensureAccountDetails();
    //user is loggedin
    if (!AuthorityUtils.isEmptyAccount()) {
      // check access to route based on roles
      if (
        !AuthorityUtils.isStreamer() &&
        !AuthorityUtils.hasAnyRole(to.meta.requiresRole)
      ) {
        next('error-access-view');
        return;
      }

      next(); // all is fine
      return;
    }
  } catch (e) {
    logger.debug(e);
  }
  next({
    path: '/login',
    query: { redirect: to.fullPath },
  });
});

export default router;
