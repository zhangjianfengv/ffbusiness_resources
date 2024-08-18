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
                {{ collection.listName }}
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
import $ from "jquery";

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
      collections: []
    }
  },
  watch: {
    collections(newVal) {
      if (newVal.length) {
        this.setDefaultSelection();  // collections有新值时重新设置默认选项
      }
    }
  },
  methods: {
    addItemsToCollections() {
      $.ajax({
        url: "/ffbusiness/listItem/add",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({listIds: this.selectedCollections, itemId: localStorage.getItem("operatingItem")}),
        success: (data) => {
          $('#collectModal').modal('toggle');
        }
      });
    },
    createCollection() {
      $.ajax({
        url: "/ffbusiness/userList/add",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({listName: this.newCollectionName}),
        success: (data) => {
          this.listCollection();
        }
      });
    },
    listCollection() {
      $.ajax({
        url: "/ffbusiness/userList/list",
        method: "get",
        contentType: "application/json",
        data: null,
        success: (data) => {
          this.collections = data;
        }
      });
    },
    setDefaultSelection() {
      const defaultCollection = this.collections.find(
          collection => collection.listName === '默认收藏夹'
      );
      if (defaultCollection) {
        this.selectedCollections = [defaultCollection.id];
      } else if (this.collections.length > 0) {
        this.selectedCollections = [this.collections[0].id];
      }
    }
  },
  mounted() {
    this.listCollection();
  }
}
</script>

<style>
/* 可选的样式 */
</style>