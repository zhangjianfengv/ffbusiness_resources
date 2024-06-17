<template>
  <div>
    <div aria-hidden="true" aria-labelledby="note" class="modal fade" id="collectModal" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content" style="max-width: 380px">
          <div class="modal-header">
            <h5 class="modal-title" id="myModalLabel" style="margin: 0 auto">添加到收藏夹</h5>
          </div>
          <div class="modal-body">

            <b-form-checkbox-group v-model="selectedCollections">
              <b-form-checkbox v-for="collection in collections" :key="collection.id" :value="collection.id">
                {{ collection.name }} ({{ collection.count }}/{{ collection.limit }})
              </b-form-checkbox>
            </b-form-checkbox-group>

            <b-button @click="showNewCollectionInput = true" v-if="!showNewCollectionInput">新建收藏夹</b-button>
            <div v-if="showNewCollectionInput">
              <b-form-input v-model="newCollectionName" placeholder="最多可输入20个字"></b-form-input>
              <b-button @click="createCollection">新建</b-button>
            </div>
          </div>
          <b-button @click="addItemsToCollections">确定</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {BButton, BFormCheckbox, BFormCheckboxGroup, BFormInput, BModal} from 'bootstrap-vue'

export default {
  components: {
    BButton,
    BModal,
    BFormCheckboxGroup,
    BFormCheckbox,
    BFormInput
  },
  data() {
    return {
      showModal: false,
      showNewCollectionInput: false,
      newCollectionName: '',
      selectedCollections: [],
      collections: [
        {id: 1, name: '默认收藏夹', count: 82, limit: 1000},
        {id: 2, name: '手动稍后再看', count: 7, limit: 1000},
        {id: 3, name: '认真', count: 7, limit: 1000},
        {id: 4, name: '收藏夹', count: 84, limit: 1000}
      ]
    }
  },
  methods: {
    addItemsToCollections() {
      // 调用后端接口传入需要添加进去的收藏夹列表
      // 示例代码，实际需替换为真实后端接口
      this.$http.post('/api/addToCollections', {collections: this.selectedCollections})
          .then(response => {
            console.log('Items added to collections:', response.data)
            this.showModal = false
          })
          .catch(error => {
            console.error('Error adding items to collections:', error)
          })
    },
    createCollection() {
      // 调用后端接口创建新收藏夹
      // 示例代码，实际需替换为真实后端接口
      this.$http.post('/api/createCollection', {name: this.newCollectionName})
          .then(response => {
            console.log('Collection created:', response.data)
            this.collections.push({
              id: response.data.id,
              name: this.newCollectionName,
              count: 0,
              limit: 1000
            })
            this.showNewCollectionInput = false
            this.newCollectionName = ''
          })
          .catch(error => {
            console.error('Error creating collection:', error)
          })
    }
  }
}
</script>

<style>
/* 可选的样式 */
</style>