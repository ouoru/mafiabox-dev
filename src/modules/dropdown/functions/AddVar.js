import React from 'react'
import * as helpers from '../../common/helpers'

import { variableType } from '../../logic/types'

class AddVar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value: ''
        }
    }

    _onChange = e => {
        this.setState({
            value: e.target.value
        })
    }

    _onKeyDown = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                this._confirm()
                break
            default:
        }
    }

    _confirm = () => {
        const { attachVar } = this.props
        const { value } = this.state

        const tagKey = helpers.genUID('var', attachVar)
        
        this.props.updatePage(tagKey, {
            key: tagKey,
            name: value,
            variableType: variableType.any.key,
        })
        this.props.showDropdown()
    }

    render() {
        return (
            <div>
                <input
                    className="tag-input"
                    value={this.state.value}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    placeholder="Untitled"
                    type='text'
                    autoFocus
                />
                <div className="-sep"/>
                <div className="drop-down-menu-option" onClick={this._confirm}>
                    <i className={`drop-down-menu-icon ion-md-checkbox`}></i>
                    Create
                </div>
            </div>
        )
    }
}

export default AddVar