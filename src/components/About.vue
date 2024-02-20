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
      <!-- Text slides with image -->
      <!--      <b-carousel-slide-->
      <!--          caption="站长本人"-->
      <!--          text="Nulla vitae elit libero, a pharetra augue mollis interdum."-->
      <!--          img-src="https://picsum.photos/1024/480/?image=52"-->
      <!--      ></b-carousel-slide>  -->
      <b-carousel-slide
          caption="站长本人"
          img-src="/1.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
          caption="站长本人"
          img-src="/2.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
          caption="站长本人"
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