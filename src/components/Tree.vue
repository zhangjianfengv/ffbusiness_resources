<template>
  <div>
    <ul>
      <tree-node :tree-data="treeData" :data="treeData"></tree-node>
    </ul>
  </div>
</template>

<script>
import TreeNode from "@/components/TreeNode.vue";

export default {
  components:  {
    'tree-node': TreeNode // 注册树状图组件
  },
  data() {
    return {
      treeData: {}
    }
  }
};
</script>
