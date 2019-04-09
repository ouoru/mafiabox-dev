import React from 'react'
import _ from 'lodash'

import {
    updateType,
    boolUpdateType,
    variableType,
    VAR_DEFAULTS,
} from '../../logic/types'

import {
    DropItem,
    DropTitle,
 } from '../components/Common';

export default function PickBoolean(props) {
    const { currentValue } = props

    //defaults => update: true, mutate: false
    const updateValue = {
        update: currentValue.update === undefined ? true : currentValue.update,
        mutate: currentValue.mutate === undefined ? true : currentValue.mutate,
    }

    const handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            ...updateValue,
            value: item.key,
            display: item.key,
            updateType: updateType.boolean,
            variableTypes: [variableType.boolean.key],
        })
        props.showDropdown()
    }

    const renderItem = (item) => {
        const chosen = currentValue.value === item.key
        
        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                leftIcon={item.icon}
                rightIcon="mdi mdi-check"
            >
                {item.title}
            </DropItem>
        )
    }

    const items = _.sortBy(boolUpdateType, i => i.index)
    return (
        <>
            <DropTitle>boolean type</DropTitle>
            {items.map(renderItem)}
        </>
    )
}