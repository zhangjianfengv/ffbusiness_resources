<template>
  <li>
    <div
        @click="toggle"
        @dblclick="makeFolder">
      <!--      <img-->
      <!--          src="{{  window.location.protocol + '//' + window.location.host + '/icon/' + item.itemId + '.png?eo-img.resize=w/32/h/32'}}"-->
      <!--          width="32" height="32" alt="icon">&nbsp;-->

      <span style="font-size: large">  {{
          item.amount ? (item.itemName + 'X' + item.amount) : item.itemName
        }}</span>
      &nbsp;{{ item.craftJobName ? item.craftJobName : '' }}
      <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <Tree
          class="item"
          v-for="(child, index) in item.detail"
          :key="index"
          :item="child"
          @make-folder="$emit('make-folder', $event)"
          @add-item="$emit('add-item', $event)"
      ></Tree>
    </ul>
  </li>
</template>

<script>
export default {
  name: "Tree", props: {
    item: Object
  },
  data: function () {
    return {
      isOpen: true
    };
  },
  computed: {
    isFolder: function () {
      return Array.isArray(this.item.detail) && this.item.detail.length;
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    makeFolder: function () {
      if (!this.isFolder) {
        this.$emit("make-folder", this.item);
        this.isOpen = true;
      }
    },
  }
}
</script>

<style scoped>
body {
  font-family: Menlo, Consolas, monospace;
  color: #444;
}

.item {
  cursor: pointer;
}

ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}

</style>