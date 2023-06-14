import Vue from "vue";
import $ from "jquery";

Vue.component('bt-select', {
    props: ['options', 'value'],
    template: "<select class='selectpicker' multiple data-live-search='true'" +
        " data-live-search-placeholder='搜索'><option" +
        " :value='option.typeId' v-for='option in options'>{{option.typeName}}</option></select>",
    mounted: function () {
        const vm = this;
        $.ajax({
            url: "/ffbusiness/itemType/all",
            async: true,
            method: "post",
            contentType: "application/json",
            success: function (data) {
                const map = {};
                const parentMap = {};
                for (let i = 0; i < data.length; i++) {
                    let datum = data[i];
                    map[datum.typeId] = datum;
                    if (!datum.isParent && datum.parentType) {
                        if (parentMap[datum.parentType]) parentMap[datum.parentType].push(datum.typeId);
                        else {
                            parentMap[datum.parentType] = [];
                            parentMap[datum.parentType].push(datum.typeId);
                        }
                    }
                }
                let $itemType = $('#itemType');
                for (let i = 0; i < data.length; i++) {
                    $itemType.append("<option value='" +
                        data[i].typeId + "'>" +
                        data[i].typeName + "</option>");
                }
                $itemType.selectpicker('refresh');
                $itemType.on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
                    vm.$emit('input', $itemType.val());
                    // if (typeof (vm.method) != 'undefined') {
                    //     vm.method(vm.index, vm.childidx, vm.value);
                    // }
                    let selectedValues = $itemType.val();
                    let oldSelected = previousValue;
                    let newSelectedValues = [];
                    for (let i = 0; i < selectedValues.length; i++) {
                        let number = parseInt(selectedValues[i]);
                        let exists = false;
                        if (oldSelected && oldSelected.length > 0) {
                            for (let oldSelectedElement of oldSelected) {
                                if (number === oldSelectedElement) exists = true;
                            }
                        }
                        if (map[number].isParent) {
                            let element = parentMap[number];
                            if (!exists) {
                                for (let e of element) {
                                    newSelectedValues.push(e);
                                }
                            }
                        }
                        newSelectedValues.push(number);
                    }
                    if (oldSelected) {
                        let rmValS = [];
                        for (let oldSelectedElement of oldSelected) {
                            let exist = false;
                            for (let newSelectedValue of newSelectedValues) {
                                if (newSelectedValue === oldSelectedElement) {
                                    exist = true;
                                    break;
                                }
                            }
                            if (!exist)
                                rmValS.push(oldSelectedElement);
                        }
                        if (rmValS) {
                            let rmLength = rmValS.length;
                            for (let rmVal of rmValS) {
                                let parentMapElement = parentMap[rmVal];
                                if (parentMapElement) {
                                    for (let parentMapElementKey in parentMapElement) {
                                        rmValS.push(parentMapElement[parentMapElementKey]);
                                    }
                                }
                            }
                            rmValS.splice(0, rmLength);
                            let rmIndex = []
                            for (let i = 0; i < newSelectedValues.length; i++) {
                                for (let rmVal of rmValS) {
                                    if (rmVal === newSelectedValues[i]) rmIndex.push(i);
                                }
                            }
                            let values = [];
                            for (let i = 0; i < newSelectedValues.length; i++) {
                                let shouldRm = false;
                                for (let index of rmIndex) {
                                    if (index === i) {
                                        shouldRm = true;
                                        break;
                                    }
                                }
                                if (!shouldRm)
                                    values.push(newSelectedValues[i]);
                            }
                            newSelectedValues = values;
                        }
                    }
                    this.itemTypes = newSelectedValues;
                    $itemType.val(newSelectedValues);
                    vm.$emit('input', newSelectedValues);
                    $itemType.selectpicker('refresh');

                });
                // $itemType.on('show.bs.select', function () {
                //     if (typeof (vm.load) != 'undefined') {
                //         vm.load(vm.index, vm.childidx);
                //     }
                // })
            }
        });

    },
    watch: {
        //value(newV) {
        // $(this.$el).selectpicker('val', newV);
        // }
    },
    updated: function () {
        this.$nextTick(function () {
            $(this.$el).selectpicker('refresh');
        })
    },
    destroyed: function () {
        $(this.$el).selectpicker('destroy');
    }
})