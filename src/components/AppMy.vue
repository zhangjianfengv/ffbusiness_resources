<template>
  <div id="app">


    <div class="login" v-if="!login">
      <h1>Hi!，请先登录</h1>
      <p>--------社交账号登录--------</p>
      <b-button type="button" style=" display: inline-block; padding: 0;border: none;  background: none;"
                @click="toLogin"><img style="display: block;" src="/bt_white_76X24.png" alt="QQ登录"/></b-button>
    </div>
    <div v-if="login">


      <div>


        <b-card title="Title" header-tag="header" footer-tag="footer" v-for="(child, index) in item.detail"
                :key="index"
                :item="child">
          <template #header>
            <h6 class="mb-0">Header Slot</h6>
          </template>
          <b-card-text>Header and footers using slots.</b-card-text>
          <b-button href="#" variant="primary">Go somewhere</b-button>
          <template #footer>
            <em>Footer Slot</em>
          </template>
        </b-card>


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

export default {
  name: "AppMy",
  data() {
    return {
      login: false,
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
    const userCookie = this.$cookies.get('user');
    if (this.isStr(userCookie)) {
      this.login = true;
    }
  }
}
</script>

<style scoped>

</style>