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
        let suits = $('#suits');
        $.ajax({
            url: "/ffbusiness/itemNew/suits/all",
            async: true,
            method: "get",
            contentType: "application/json",
            success: function (data) {
                vm.suits = data.suits;
                for (let i = 0; i < data.length; i++) {
                    suits.append("<option value='" + data[i] + "'>" + data[i] + "</option>");
                }
                suits.selectpicker('val', ['710骑士']);
                suits.selectpicker('refresh');
            }
        });
        suits.on('changed.bs.select', function () {
            vm.$emit('input', suits.val());
            suits.selectpicker('refresh');
        })
    },
    watch: {},
    updated: function () {
        this.$nextTick(function () {
            $(this.$el).selectpicker('refresh');
        })
    },
    destroyed: function () {
        $(this.$el).selectpicker('destroy');
    }
})
