import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { updatePage } from '../../page/PageReducer'
import { addItemBelowOf, deleteItem } from '../../fields/FieldReducer'

import { logicType } from '../../logic/types'

class PickOperator extends React.Component{
    _renderItem = (item) => {
        const { currentValue } = this.props
        
        const chosen = item.key === currentValue

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._select.bind(this, item.key)}
                style={{
                    backgroundColor: chosen && item.color,
                }}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                {chosen && <i className="ion-md-checkmark"/>}
            </div>
        )
    }

    _select = (newValue) => {
        const { pageKey, fieldKey, indexKey, pageRepo } = this.props
        
        let valueClone = Object.assign({}, pageRepo[pageKey][fieldKey])

        valueClone[indexKey].logicType = newValue
        switch(newValue) {
            case logicType.operator.key:
            case logicType.update.key:
            case logicType.transient.key:
                valueClone[indexKey].data = {}
                break
            default:
                valueClone[indexKey].data = ''
        }
        
        this.props.updatePage(pageKey, fieldKey, valueClone)
        this.props.showDropdown()
    }

    _addItemBelow = () => {
        const { pageKey, fieldKey, indexKey } = this.props
        
        this.props.addItemBelowOf(indexKey, pageKey, fieldKey)
        this.props.showDropdown()
    }

    _deleteItem = () => {
        const { pageKey, fieldKey, indexKey } = this.props
        
        this.props.deleteItem(indexKey, pageKey, fieldKey)
        this.props.showDropdown()
    }

    render() {
        const data = _.orderBy(logicType, i => i.index)

        return (
            <div>
                {data.map(this._renderItem)}
                <div className="drop-down-menu-separator"/>
                <div className="drop-down-menu-option" onClick={this._addItemBelow}>
                    <i className={`drop-down-menu-icon ion-ios-bulb`}></i>
                    Add Logic Below
                </div>
                <div className="drop-down-menu-option" onClick={this._deleteItem}>
                    <i className={`drop-down-menu-icon ion-md-close`}></i>
                    Delete
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        updatePage,
        addItemBelowOf,
        deleteItem,
    }
)(PickOperator)