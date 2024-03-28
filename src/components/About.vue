<script setup>

</script>

<template>
  <div>
    <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
          caption="o(〃＾▽＾〃)o"
          img-src="/1.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
          caption="o(〃＾▽＾〃)o"
          img-src="/2.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
          caption="o(〃＾▽＾〃)o"
          img-src="/3.jpg"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  }
}
</script>
<style scoped>

</style>