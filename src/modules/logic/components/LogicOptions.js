import React from 'react'
import { connect } from 'react-redux'

import { dropdownType } from '../../dropdown/types'

import { toggleCollapse } from '../../fields/FieldReducer'

class LogicOptions extends React.Component{
    _toggleCollapse = () => {
        const { item, field, pageInfo } = this.props
        const { pageKey } = pageInfo

        this.props.toggleCollapse(item, pageKey, field)
    }

    render() {
        const { item, value, field, pageInfo } = this.props
        const collapsed = value[item].collapsed

        return (
            <div style={{ textAlign: 'center' }}>
                <i 
                    className="ion-md-close logic-option menu-onclick"
                    menu-type={dropdownType.deleteLogic}
                    field-key={field}
                    index-key={item}
                    page-key={pageInfo.pageKey}
                />
                <i 
                    className={`${collapsed ? "ion-md-expand" : "ion-md-contract"} logic-option`}
                    data-tip={collapsed ? "Expand." : "Collapse"}
                    onClick={this._toggleCollapse}
                />
            </div>
        )
    }
}

export default connect(
    null,
    {
        toggleCollapse,
    }
)(LogicOptions)