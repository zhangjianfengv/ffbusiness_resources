import Vue from "vue";
import $ from "jquery";

Vue.component('su-select', {
    data: function () {
        return {}
    },
    props: ['suits', 'value'],
    template: "<select  class='suitsPicker' data-live-search='true' data-live-search-placeholder='搜索套装' data-none-selected-text='预置套装'><option" +
        " :value='suit' v-for='suit in suits'>{{option}}</option></select>",
    mounted: function () {
        const vm = this;
        $.ajax({
            url: "/ffbusiness/itemNew/suits/all",
            async: true,
            method: "get",
            contentType: "application/json",
            success: function (data) {
                vm.suits = data.suits;
            }
        })
    }
})