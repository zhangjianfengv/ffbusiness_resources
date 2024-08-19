<template>
  <div>
    <div aria-hidden="true" aria-labelledby="note" class="modal fade" id="collectModal" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content" style="max-width: 380px">
          <div class="modal-header">
            <h5 class="modal-title" id="myModalLabel" style="margin: 0 auto">{{ modalTitle }}</h5>
          </div>
          <div class="modal-body">
            <b-form-checkbox-group v-model="selectedCollections">
              <b-form-checkbox v-for="collection in collections" :key="collection.id" :value="collection.id">
                {{ collection.listName }}({{ collection.count }})
              </b-form-checkbox>
            </b-form-checkbox-group>
            <b-button @click="showNewCollectionInput = true" v-if="!showNewCollectionInput">新建收藏夹</b-button>
            <div v-if="showNewCollectionInput">
              <b-form-input v-model="newCollectionName" placeholder="最多可输入20个字"></b-form-input>
              <b-button @click="createCollection">新建</b-button>
            </div>
          </div>
          <div class="modal-footer">
            <b-button @click="addItemsOrDel">确定</b-button>
          </div>
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
      showNewCollectionInput: false,
      newCollectionName: '',
      modalTitle: '添加到收藏夹',
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
    addItemsOrDel() {
      if (localStorage.getItem("collected") === 'true') $.ajax({
        url: "/ffbusiness/listItem/update",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({listIds: this.selectedCollections, itemId: localStorage.getItem("operatingItem")}),
        success: (data) => {
          $('#collectModal').modal('toggle');
          this.$emit('modal-hide');
        }
      });
      else $.ajax({
        url: "/ffbusiness/listItem/add",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({listIds: this.selectedCollections, itemId: localStorage.getItem("operatingItem")}),
        success: (data) => {
          $('#collectModal').modal('toggle');
          this.$emit('modal-hide');
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
        url: "/ffbusiness/listItem/itemInList",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({itemId: localStorage.getItem("operatingItem")}),
        success: (data) => {
          this.showNewCollectionInput = false;
          this.collections = data;
        }
      });
    },
    onModalShow() {
      this.$emit('modal-show');
    },
    showModal() {
      let item = localStorage.getItem('operatingItemName');
      this.modalTitle = localStorage.getItem('collected') === 'true' ? '选择在哪些收藏夹保留' + item : '添加' + item + '到收藏夹';
      $('#collectModal').modal('toggle');
    },
    setDefaultSelection() {
      if (localStorage.getItem('collected') === 'true') {
        const ids = this.collections
            .filter(item => item.inList)
            .map(item => item.id);
        this.selectedCollections = ids;
      } else {
        const defaultCollection = this.collections.find(
            collection => collection.listName === '默认收藏夹'
        );
        if (defaultCollection) {
          this.selectedCollections = [defaultCollection.id];
        } else if (this.collections.length > 0) {
          this.selectedCollections = [this.collections[0].id];
        }
      }
    }
  },
  mounted() {
    const modalElement = document.getElementById('collectModal');
    modalElement.addEventListener('show.bs.modal', this.onModalShow);
  }
}
</script>

<style>
/* 可选的样式 */
</style>