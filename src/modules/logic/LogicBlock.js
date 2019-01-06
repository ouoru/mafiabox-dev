import React from 'react'
import './logic.css'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import ReactTooltip from 'react-tooltip'

import { defaultLogic, logicType } from './types'

import * as helpers from '../common/helpers'
import * as maptool from './maptool'

import LogicErrors from './components/LogicErrors'
import LogicNewVars from './components/LogicNewVars'
import LogicType from './components/LogicType';
import LogicDownArrow from './components/LogicDownArrow';
//import LogicOptions from './components/LogicOptions'
import LogicRightArrow from './components/LogicRightArrow';
import LogicPanels from './components/LogicPanels';
import LogicObject from './form/LogicObject';

class LogicBlock extends React.Component{
    constructor(props) {
        super(props)
        this.rng = helpers.genUID('rng')
    }

    render() {
        let { fieldKey, pageInfo, pageRepo, value, index, vars } = this.props
        if (!pageInfo) return null
        if (!value) {
            value = defaultLogic
        }
        
        const rows = [index]
        let pointer = value[index] && value[index].down

        while(pointer) {
            if (!value[pointer]) break
            rows.push(pointer)
            pointer = value[pointer].down
        }
        
        return (
            <Droppable
                droppableId={`CIRCUIT/${pageInfo.pageKey}/${fieldKey}/${index}/${this.rng}`}
                type={`ROW/${index}`}
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                    >
                        {rows.map((item, index) => {
                            const logicInfo = value[item]
                            if (!logicInfo) return null

                            const errors = maptool.compile(item, value)
                            const collapsed = logicInfo.collapsed
                            const iprops = {
                                item,
                                logicInfo,
                                field: fieldKey,
                                pageInfo,
                                vars,
                            }
                            
                            const newVars = logicInfo.logicType === logicType.function.key &&
                                logicInfo.data && pageRepo[logicInfo.data].vars
                                
                            return <Draggable key={item} draggableId={item} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        className="row-nowrap"
                                        key={index}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            ...provided.draggableProps.style,
                                            marginTop: index ? 10 : 0,
                                            marginBottom: 'auto',
                                            cursor: 'pointer',
                                            userSelect: 'none',
                                        }}
                                    >
                                        <div>
                                            <div className="row-nowrap">
                                                <LogicType {...iprops}/>
                                                <LogicPanels {...iprops}/>
                                            </div>
                                            <LogicNewVars {...iprops} newVars={newVars}/>
                                            <LogicObject {...iprops}/>
                                            <div className="row" style={{ textAlign: 'center' }}>
                                                <LogicDownArrow {...iprops}/>
                                                <LogicErrors errors={errors}/>
                                            </div>
                                        </div>
                                        {/*<LogicOptions {...iprops}/>*/}
                                        <LogicRightArrow {...iprops}/>
                                        {!collapsed && logicInfo.right && 
                                            <LogicBlock 
                                                {...this.props}
                                                index={logicInfo.right}
                                                vars={{
                                                    ...vars,
                                                    ...newVars
                                                }}
                                            />
                                        }
                                        <ReactTooltip place="right"/>
                                    </div>
                                )}
                            </Draggable>
                        })}
                    </div>
                )}
            </Droppable>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    })
)(LogicBlock)