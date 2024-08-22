<template>
  <div>
    <div style="text-align: center" class="mt-2 mb-2">
      <b-container fluid>
        <b-alert show>{{ message }}</b-alert>
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
            xs="12"
            class="mb-4">
          <b-card style="text-align: center" :title="item.itemName" img-top>
            <img style="width: 100%; height: auto;" :src="defaultUrl+item.url+'.jpg?v=1'"
                 alt="莫古用力找也找不到照片库啵!"
                 v-on:error="handleImageError">
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<style scoped>
.card-body {
  padding: 0;
}
</style>
<script>
import moment from "moment";

export default {
  data() {
    return {
      items: [], // 存储从后端获取的物品数据
      defaultUrl: 'https://sta2.ff14pvp.top/preview/',
      message: '',
      intervalId: null,
      fallback: ''
    };
  },
  mounted() {
    this.updateMessage();
    this.intervalId = setInterval(this.updateMessage, 60000); // 每分钟更新一次
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
        event.target.src = event.target.src.replace(this.defaultUrl, 'https://sta2.ff14pvp.top/lpreview/l/').replace(".jpg", '.png');
      else event.target.src = 'https://static.ff14pvp.top/icon/icon/placeholder.png'
    },
    updateMessage() {
      const now = moment();
      const cycleStartDate = moment('2024-08-20 23:00:00');
      const announcementPeriod = 4; // 公示期天数
      const drawPeriod = 5; // 抽选期天数
      // 计算当前周期的起点
      const daysSinceStart = now.diff(cycleStartDate, 'days');
      const currentCycleStart = cycleStartDate.add(Math.floor(daysSinceStart / (announcementPeriod + drawPeriod)) * (announcementPeriod + drawPeriod), 'days');
      // 计算当前周期的各个时间点
      const announcementStart = currentCycleStart;
      const announcementEnd = currentCycleStart.clone().add(announcementPeriod, 'days');
      const drawStart = announcementEnd.clone().add(1, 'seconds');
      const drawEnd = currentCycleStart.clone().add(announcementPeriod + drawPeriod, 'days').subtract(1, 'seconds');
      if (now.isBetween(announcementStart, announcementEnd)) {
        this.message = `当前为公示期，于${announcementEnd.format('YYYY年MM月DD日HH:mm:ss')}开始可参加抽选`;
      } else if (now.isBetween(drawStart, drawEnd)) {
        this.message = `当前可参加抽选，于${drawEnd.format('YYYY年MM月DD日HH:mm:ss')}公示结果`;
      } else if (now.isBefore(announcementStart)) {
        this.message = `还未开始，预计于${announcementStart.format('YYYY年MM月DD日HH:mm:ss')}开始公示期`;
      } else {
        this.message = `抽选期已结束，感谢您的参与。`;
      }
    },
  }, beforeDestroy() {
    clearInterval(this.intervalId);
  }
}
</script>

<style>
/* 自定义样式可以在这里添加 */
</style>
