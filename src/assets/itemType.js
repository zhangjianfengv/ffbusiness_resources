let itemTypes = {};
let oldSelected;
import $ from "jquery";

export function handleType() {
    return function
        (data) {
        const map = {};
        var parentMap = {};
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
        itemTypes = map;
        let $itemType = $('#itemType');
        for (let i = 0; i < data.length; i++) {
            $itemType.append("<option value='" +
                data[i].typeId + "'>" +
                data[i].typeName + "</option>");
        }
        $itemType.selectpicker('refresh');
        $itemType.on('changed.bs.select', function () {
            let selectedValues = $itemType.val();
            let newSelectedValues = [];
            for (let i = 0; i < selectedValues.length; i++) {
                let number = parseInt(selectedValues[i]);
                let exists = false;
                if (oldSelected && oldSelected.length > 0) {
                    for (let oldSelectedElement of oldSelected) {
                        if (number === oldSelectedElement) exists = true;
                    }
                }
                if (itemTypes[number].isParent) {
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
            oldSelected = newSelectedValues;
            $itemType.val(newSelectedValues);
            $itemType.selectpicker('refresh');
        });
    };
}

// function getFilter() {
//     let $itemType = $('#itemType');
//     const val = $itemType.val();
//     let filterVal = [];
//     for (let valKey of val) {
//         filterVal.push(parseInt(valKey));
//     }
//     return filterVal;
// }