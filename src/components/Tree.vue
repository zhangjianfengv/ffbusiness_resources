<template>
  <li>
    <div
        @click="toggle"
        @dblclick="makeFolder">
      <span style="font-size: large">
         <a class="black-link-style" target="_blank" :href="'/#/item?id='+item.itemId">{{ item.itemName }}</a>{{
          item.amount ? ('X' + item.amount) : ''
        }}
       </span>
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