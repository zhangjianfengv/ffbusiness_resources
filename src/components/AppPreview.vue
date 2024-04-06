<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col
            v-for="(item, index) in items"
            :key="index"
            lg="3"
            md="4"
            sm="6"
            class="mb-4">
          <b-card :title="item.itemName" img-top>
            <b-card-img-lazy :src="'https://preview.linshaosoft.com/preview/'+item.url+'.jpg'"
                             alt="Item Image"></b-card-img-lazy>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [] // 存储从后端获取的物品数据
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
    }
  }
};
</script>

<style>
/* 自定义样式可以在这里添加 */
</style>
