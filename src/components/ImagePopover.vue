<template>
  <div>
    <!-- 图标 -->
    <img
        :src="getIconUrl(id)"
        width="32"
        height="32"
        alt="Icon"
        @mouseover="showImage(id)"
        @mouseleave="hideImage"
    />

    <!-- 弹出的图片 -->
    <b-img v-if="show" :src="imageUrl" v-on:error="handleImageError" fluid alt="Hovered Image" @mouseleave="hideImage"/>
  </div>
</template>

<script>
export default {
  name: 'ImagePopover',
  data() {
    return {
      show: false, // 控制图片显示
      imageUrl: '', // 弹出的图片 URL
      id: null,// 图标对应的 ID
      defaultUrl: 'https://preview.linshaosoft.com/preview/',
      fallback: ''
    };
  },
  methods: {
    // 根据 ID 获取图标 URL
    getIconUrl(id) {
      return `https://static.ff14pvp.top/icon/icon/${id}.png`;
    },
    // 鼠标悬停时显示图片
    async showImage(id) {
      this.id = id;
      try {
        const response = await fetch(`/ffbusiness/furniture/${id}`);
        const data = await response.json();
        if (data.imageUrl) {
          this.imageUrl = data.imageUrl;
          this.show = true;
        }
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    },
    handleImageError(event) {
      if (event.target.src.startsWith(this.defaultUrl))
        event.target.src = event.target.src.replace(this.defaultUrl, 'https://preview.linshaosoft.com/lpreview/l/').replace(".jpg", '.png');
      else event.target.src = 'https://static.ff14pvp.top/icon/icon/placeholder.png'
    },
    // 鼠标离开时隐藏图片
    hideImage() {
      this.show = false;
      this.imageUrl = '';
      this.id = null;
    }
  }
};
</script>

<style scoped>
/* 可以添加一些样式 */
</style>
