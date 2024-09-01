<template>


  <div>
    <!-- 第一个 modal -->
    <b-modal
        id="first-modal"
        ref="firstModal"
        :title=modalTitle
        ok-title="确定"
        cancel-title="取消"
        @ok="addItemsOrDel"
    >
      <b-form-checkbox-group v-model="selectedCollections">
        <b-form-checkbox v-for="collection in collections" :key="collection.id" :value="collection.id">
          {{ collection.listName }}({{ collection.count }}) <span @click="showDelModal(collection)"><i
            class="bi bi-x-square" style="font-size: 0.6rem"></i></span>
        </b-form-checkbox>
      </b-form-checkbox-group>
      <b-button @click="showNewCollectionInput = true" v-if="!showNewCollectionInput">新建收藏夹</b-button>
      <div v-if="showNewCollectionInput">
        <b-form-input v-model="newCollectionName" placeholder="最多可输入20个字"></b-form-input>
        <b-button @click="createCollection">确认新建</b-button>
      </div>
    </b-modal>

    <b-modal
        id="delete-confirmation"
        ref="deleteModal"
        title="确认删除"
        cancel-title="取消"
        ok-title="确定"
        style="z-index: 1050 !important; position: fixed;"
        @ok="confirmDelete"
    >
      <p class="my-4">确定要删除收藏夹<b>{{ listToDelete.listName }}</b>？</p>
    </b-modal>
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
      collections: [],
      listToDelete: {id: 0, listName: ''}
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
    showDelModal(list) {
      this.listToDelete = list;
      // 当第一个 modal 确认按钮被点击时，显示第二个 modal
      this.$refs.firstModal.hide(); // 可选：关闭第一个 modal
      this.$refs.deleteModal.show(); // 显示第二个 modal
    },
    confirmDelete() {
      $.ajax({
        url: "/ffbusiness/userList/del",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({listId: this.listToDelete.id}),
        success: (data) => {
          this.listCollection();
        }
      });
    },
    onModalShow() {
      this.$emit('modal-show');
    },
    showModal() {
      let item = localStorage.getItem('operatingItemName');
      this.modalTitle = localStorage.getItem('collected') === 'true' ? '选择在哪些收藏夹保留 ' + item : '添加 ' + item + ' 到收藏夹';
      this.$refs.firstModal.show();
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