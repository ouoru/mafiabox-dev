import React from 'react'

import {
    dropdownType,
    variableType,
} from '../../common/types'

import { VARTYPE_IS_OBJ } from '../../common/arrows';
import {
    useVarType,
} from '../../hooks/Hooks'

import {
    DropEmpty,
    DropItem,
    DropParent,
    DropTitle,
} from '../components/Common'
import Types from '../types/index';

export default function PickVarWithType(props){
    const {
        slate,
        variableTypes,
        scopedVars,
        pickVarClick,
        showDropdown,
    } = props

    //must have a reference variable
    if (!variableTypes) {
        return (
            <>
                <DropTitle>error</DropTitle>
                <DropEmpty text="select a variable first ..."/>
            </>
        )
    }

    const renderItem = (item) => {
        const chosen = slate.value === item.key

        if (VARTYPE_IS_OBJ(item)) {
            return (
                <DropParent
                    key={item.key}
                    dropdown={dropdownType.pickVarSubfield}
                    showDropdown={showDropdown}
                    params={{
                        prefix: item.key,
                        pickVarClick,
                    }}
                    text={item.key}
                />
            )
        }

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => pickVarClick(item)}
                rightCheck
                text={item.key}
            />
        )
    }
    
    const renderType = (type) => {
        switch(type) {
            case variableType.number.key:
                return <Types.PickTypeNumber key={type} {...props}/>
            case variableType.boolean.key:
                return <Types.PickTypeBool key={type} {...props}/>
            case variableType.object.key:
            case variableType.uidObject.key:
            case variableType.array.key:
            case variableType.function.key:
            case variableType.global.key:
            case variableType.key.key:
            case variableType.time.key:
            case variableType.uid.key:
            case variableType.string.key:
            default:
                return null;
        }
    }
    
    const [tameVars, wildVars] = useVarType(variableTypes, scopedVars)
    return (
        <>
            <DropTitle>vars with same type</DropTitle>
            {tameVars.map(renderItem)}
            <DropEmpty list={tameVars} text="no variables found"></DropEmpty>
            <DropTitle>incomplete vars</DropTitle>
            {wildVars.map(renderItem)}
            <DropEmpty list={wildVars} text="no variables found"></DropEmpty>
            {variableTypes.map(renderType)}
        </>
    )
}