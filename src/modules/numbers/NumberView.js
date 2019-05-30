import React from 'react'
import './NumberView.css'
import { useDispatch } from 'react-redux'

import { DEFAULT_ASSIGN } from '../logic/defaults';

import { usePath } from '../hooks/Hooks';
import { genUID } from '../common/helpers';
import { updateGeneral } from '../page/PageReducer'

import PlaygroundDrop from './dnd/PlaygroundDrop';
import NumberDetailer from './components/NumberDetailer';
import {
    Separator,
} from '../components/Common';

/* LOCATIONS where user can edit numbers
    AssignNumber
    EditNumber
    
VISUALS
    mathType=value
        |[value]|
    mathType=operator
        |[value] (operator) [value]|
*/
export default function NumberView({path}){
    const dispatch = useDispatch();
    const {
        byId: mathRepo,
        source,
    } = usePath(path)

    //clear all math
    const clearSlate = () => {
        dispatch(updateGeneral(path, {
            byId: "",
            source: "",
        }))
    }

    //dropping something into PlaygroundDrop
    const initValue = (item) => {
        const newKey = genUID('math', mathRepo)

        dispatch(updateGeneral(path, {
            byId: {
                [newKey]: {
                    ...DEFAULT_ASSIGN,
                    key: newKey,
                    ...item,
                }
            },
            source: newKey,
        }))
    }

    //dropping BasicOp onto BasicOp
    const changeValue = (mathKey, item) => {
        dispatch(updateGeneral([...path, 'byId', mathKey], {
            ...DEFAULT_ASSIGN,
            key: mathKey,
            ...item,
        }))
    }

    //wrapping (everything) with a BasicOp
    const wrapValue = (item, position) => {
        const newKey = genUID('math', mathRepo)

        dispatch(updateGeneral(path, {
            source: newKey,
            byId: {
                ...mathRepo,
                [newKey]: {
                    ...DEFAULT_ASSIGN,
                    ...item,
                    key: newKey,
                    [position]: source,
                },
            },
        }))
    }

    //dropping something into ValueDrop inside a BasicOp
    const nestValue = (restItem, dragItem, position) => {
        const newKey = genUID('math', mathRepo)
        
        dispatch(updateGeneral([...path, 'byId'], {
            [restItem.key]: {
                ...restItem,
                [position]: newKey,
            },
            [newKey]: {
                ...DEFAULT_ASSIGN,
                key: newKey,
                ...dragItem,
            },
        }))
    }

    const mainProps = {
        mathRepo,
        source,
        path,
        clearSlate,
        initValue,
        changeValue,
        nestValue,
        wrapValue,
    }

    return (
        <>
            <PlaygroundDrop {...mainProps}/>
            <Separator></Separator>
            <NumberDetailer {...mainProps}/>
        </>
    )
}