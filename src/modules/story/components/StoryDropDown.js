import React from 'react'
import { connect } from 'react-redux'

import { showModalByKey } from '../../modal/ModalReducer'

import { modalType } from '../../modal/modalConfig'

class StoryDropDown extends React.Component{
    _onDelete = () => {
        this.props.hideMenu()
        this.props.showModalByKey(modalType.deleteStory, {
            storyIndex: this.props.storyIndex,
        })
    }

    render() {
        return (
            <div>
                <div className="drop-down-menu-option">
                    <i className={`drop-down-menu-icon ion-ios-git-merge`}></i>
                    Merge
                </div>
                <div className="drop-down-menu-option" onClick={this._onDelete}>
                    <i className={`drop-down-menu-icon ion-ios-trash`}></i>
                    Delete
                </div>
                <div className="drop-down-menu-separator"/>
                <div className="drop-down-menu-option">
                    <i className={`drop-down-menu-icon ion-ios-flag`}></i>
                    Flag
                </div>
                <div className="drop-down-menu-option">
                    <i className={`drop-down-menu-icon ion-ios-bug`}></i>
                    Bug Report
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {
        showModalByKey,
    }
)(StoryDropDown)