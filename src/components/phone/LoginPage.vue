<template>
  <main class="flex flex-col">
    <TopNav previousPhonePage>
      <button v-on:click="signIn" class="sign-in">{{$t('message.signin')}}</button>
    </TopNav>
    <div class="layout-stacked primary-card">
      <h1 class="small">{{ $t('message.phone_login_title')}}</h1>
      <div class="field-item">
        <input id="username" type="text" v-model="username" :placeholder="$t('message.username')" />
        <label for="username">{{$t('message.username')}}</label>
      </div>
      <div class="field-item">
        <input
          id="password"
          type="password"
          v-model="password"
          :placeholder="$t('message.password')"
        />
        <label for="password">{{$t('message.password')}}</label>
      </div>
      <span class="error" v-if="hasErrorMsg">{{$t('message.invalidLogin')}}</span>
    </div>
    <div class="bottom-banner">
      <a>
        <i class="pi pi-phone-out" />
        {{ $t("message.phone_login_speak_agent")}}
      </a>
    </div>
  </main>
</template>

<script>
import { mainconfig, updatePegaChat } from '../../global';
import TopNav from './TopNav.vue';

export default {
  data() {
    /* Find if a default user is defined */
    let username = '';
    let password = '';
    for (const i in mainconfig.settings.users) {
      if (mainconfig.settings.users[i].load_by_default) {
        username = mainconfig.settings.users[i].username;
        password = mainconfig.settings.users[i].password;
        break;
      }
    }
    return Object.assign({}, mainconfig, {
      isActive: false,
      hasErrorMsg: false,
      username,
      password,
    });
  },
  components: {
    TopNav,
  },
  methods: {
    signIn() {
      /* Validate the password */
      let isLoginSuccess = false;
      mainconfig.userId = -1;
      for (const i in this.settings.users) {
        if (
          this.settings.users[i].username === this.username &&
          this.settings.users[i].password === this.password
        ) {
          isLoginSuccess = true;
          mainconfig.userId = i;
          updatePegaChat(this.settings.users[i]);
          break;
        }
      }
      mainconfig.isAuthenticated = isLoginSuccess;

      if (!isLoginSuccess) this.hasErrorMsg = true;

      if (window.history) {
        if (mainconfig.isAuthenticated) {
          window.history.pushState(
            { userId: mainconfig.userId },
            '',
            mainconfig.phonePageName === ''
              ? 'index.html'
              : mainconfig.phonePageName,
          );
        } else {
          window.history.pushState(
            {},
            '',
            mainconfig.phonePageName === ''
              ? 'index.html'
              : mainconfig.phonePageName,
          );
        }
      }
    },
  },
};
</script>
