<template>
  <div id="my-google-signin-btn">
    <div id="nav">
      <div id="google-signin-btn" v-if="!profile"></div>
      <a href="#" class="sign-out" @click="signOut" v-if="profile">Sign out</a>
    </div>
  </div>
</template>

<script>
import store from '@/shared/store';
export default {
  components: {},
  data() {
    return {
      profile: false,
      image: '',
    };
  },
  methods: {
    onSignIn(user) {
      const profile = user.getBasicProfile();
      console.log(profile);
      var id_token = user.getAuthResponse().id_token;
      this.$emit('googlelogin', id_token);
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        location.reload(true);
      });
    },
    renderGoogleLoginButton() {
      gapi.signin2.render('google-signin-btn', {
        onsuccess: this.onSignIn,
      });
    },
  },
  mounted() {
    gapi.signin2.render('google-signin-btn', {
      // this is the button "id"
      onsuccess: this.onSignIn, // note, no "()" here
    });
  },
};
</script>
