<template>
  <div>
    <div style="text-align: center" class="mt-2 mb-2">
      <b-container fluid>
        <b-button squared class="ml-2" variant="outline-dark" @click="fetchItems">全部</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(57)">家具</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(76)">庭具</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(67)">窗户</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(77)">桌台</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(78)">桌上</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(79)">壁挂</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(80)">地毯</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(73)">内墙</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(74)">地板</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(68)">房门</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(69)">房顶装饰</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(70)">外墙装饰</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(71)">门牌</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(72)">院墙</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(66)">外墙</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(65)">房顶</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(75)">屋顶照明</b-button>
        <b-button squared class="ml-2" variant="outline-dark" @click="clickRow(64)">房产证书</b-button>
      </b-container>
    </div>
    <b-container fluid>
      <b-row>
        <b-col
            v-for="(item, index) in items"
            :key="index"
            lg="3"
            md="4"
            sm="6"
            class="mb-4">
          <b-card style="text-align: center" :title="item.itemName" img-top>
            <img :src="defaultUrl+item.url+'.jpg?v=0'"
                 alt="莫古用力找也找不到照片库啵!"
                 v-on:error="handleImageError">
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<style scoped>
img {
  width: 600px; /* 在PC上默认宽度 */
}

/* 在小屏幕设备上（例如移动设备）设置输入框宽度为100% */
@media only screen and (max-width: 768px) {
  img {
    width: 100%;
  }
}

.card-body {
  padding: 0;
}
</style>
<script>
export default {
  data() {
    return {
      items: [], // 存储从后端获取的物品数据
      defaultUrl: 'https://applet.ff14pvp.top/preview/',
      fallback: ''
    };
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      fetch('/ffbusiness/preview/random')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            this.items = data; // 将获取的物品数据保存到 items 中
          })
          .catch(error => {
            console.error('Error fetching items:', error);
          });
    },
    clickRow(type) {
      fetch('/ffbusiness/preview/type/' + type)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            this.items = data; // 将获取的物品数据保存到 items 中
          })
          .catch(error => {
            console.error('Error fetching items:', error);
          });
    },
    handleImageError(event) {
      if (event.target.src.startsWith(this.defaultUrl))
        event.target.src = event.target.src.replace(this.defaultUrl, 'https://applet.ff14pvp.top/lpreview/l/').replace(".jpg", '.png');
      else event.target.src = 'https://static.ff14pvp.top/icon/icon/placeholder.png'
    }
  }
};
</script>

<style>
/* 自定义样式可以在这里添加 */
</style>
