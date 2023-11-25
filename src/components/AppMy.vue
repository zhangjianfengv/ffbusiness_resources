<template>
  <div id="app">
    <div class="login" v-if="!login">
      <h1>Hi!，请先登录</h1>
      <p>--------社交账号登录--------</p>
      <b-button type="button" style=" display: inline-block; padding: 0;border: none;  background: none;"
                @click="toLogin"><img style="display: block;" src="/bt_white_76X24.png" alt="QQ登录"/></b-button>
    </div>
    <div id="content" v-if="login">
      <div>
        <Tables v-for="(item, index) in realData" :index="index" :item="item">
        </Tables>
      </div>
    </div>
    <div id="loading-indicator" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
div.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

p {
  font-size: 1em;
  margin-bottom: 1em;
}

button {
  padding: 0.5em 1em;
  font-size: 1em;
  cursor: pointer;
}


</style>
<script>

import Base64 from "@/plugins/base64.js";
import Tables from "@/components/Tables.vue";
import $ from "jquery";

export default {
  name: "AppMy",
  components: {Tables},
  data() {
    return {
      login: false,
      realData: null
    }
  },
  methods: {
    isStr(val) {
      return val !== null && val !== undefined && val !== '' && val.replace(/(^s*)|(s*$)/g, "").length !== 0;
    },
    toLogin() {
      QC.Login.showPopup({
        appId: Base64.decode("MTAyMDc1MDIx"),
        redirectURI: Base64.decode("aHR0cHMlM0ElMkYlMkZ3d3cuZmYxNHB2cC50b3AlMkZhcGklMkZvYXV0aCUyRnFxJTJGY2FsbGJhY2s=")
      });
    },
  },
  mounted() {
    const vm = this;
    const userCookie = this.$cookies.get('user');
    if (this.isStr(userCookie)) {
      this.login = true;
      $('#loading-indicator').show();
      $('#content').hide();
      $.ajax({
        url: "/ffbusiness/currentData/batchCurrent",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: function (data) {
          vm.realData = data;
          $('#loading-indicator').hide();
          $('#content').show();
        }
      });
    }
  }
}
</script>

<style scoped>

</style>