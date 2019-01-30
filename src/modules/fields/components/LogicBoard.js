import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import * as helpers from '../../common/helpers'
import { getCode } from '../../logic/LogicReducer'

import LogicBlock from '../../logic/LogicBlock'
import LogicArgs from '../../logic/components/LogicArgs';
import CodeField from './CodeField'

class LogicBoard extends React.Component{
    render() {
        const { fieldInfo, value } = this.props
        
        const origin = _.findKey(value, i => !i.source)
        const code = this.props.getCode(origin, value)
        const vars = helpers.swapVarFormat(fieldInfo.vars, true)
        
        if (!value) return null
        
        return (
            <div className="logic-board">
                <LogicArgs vars={vars}/>
                <div style={{ margin: '8px 6px' }}>
                    <LogicBlock
                        {...this.props}
                        value={value}
                        indexKey={origin}
                        vars={vars}
                    />
                </div>
                <CodeField
                    code={code}
                    options={{
                        readOnly: 'nocursor',
                    }}
                />
            </div>
        )
    }
}

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    }),
    {
        getCode,
    }
)(LogicBoard)