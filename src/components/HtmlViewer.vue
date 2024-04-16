<template>
  <div v-html="htmlContent"></div>
</template>

<script>
export default {
  data() {
    return {
      htmlContent: ''
    };
  },
  mounted() {
    this.loadHtmlFile();
  },
  methods: {
    async loadHtmlFile() {
      try {
        // 假设要加载的 HTML 文件在 /public 目录下的 example.html
        const response = await fetch('/bench.html');
        if (response.ok) {
          this.htmlContent = await response.text();
        } else {
          throw new Error('Failed to load HTML file');
        }
      } catch (error) {
        console.error('Error loading HTML file:', error);
      }
    }
  }
};
</script>
