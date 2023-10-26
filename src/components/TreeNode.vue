<template>
  <li>
    {{ data.itemName }}
    <ul v-if="Array.isArray(data.detail)">
      <tree-node v-for="child in data.detail" :key="child.itemName" :data="child"></tree-node>
    </ul>
  </li>
</template>

<script>
import TreeNode from "@/components/TreeNode.vue";

export default {
  components: {
    'tree-node': TreeNode // 注册树状图组件
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>
