<template>
  <div id="app">


    <div class="login" v-if="login">
      <h1>Hi!，请先登录</h1>
      <p>--------社交账号登录--------</p>
      <b-button type="button" style=" display: inline-block; padding: 0;border: none;  background: none;"
                @click="toLogin"><img style="display: block;" src="/bt_white_76X24.png" alt="QQ登录"/></b-button>
    </div>
    <div v-if="!login">

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

export default {
  name: "AppMy",
  data() {
    return {
      login: false,
    }
  },
  methods: {
    searchItem() {
      this.queryCurrentForm();
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