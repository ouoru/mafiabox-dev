import React from 'react'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc';

import { showModal } from '../../../modal/ModalReducer'
import { dropdownType } from '../../../dropdown/types'

const PatchGridItem = SortableElement((props) => {
    const { storyKey, storyRepo } = props
    const storyInfo = storyRepo[storyKey] || {}

    const { boardType, title } = storyInfo
    
    const handleClick = () => {
        props.onClick(storyKey)
    }

    const handlePropagate = e => e.stopPropagation();

    return (
        <div
            className="patch-item"
            onClick={handleClick}
        >
            <div className="patch-item-title">
                {title || 'Untitled'}
            </div>
            <div className="patch-item-footer" onClick={handlePropagate}>
                <div
                    className="patch-item-option app-onclick"
                    menu-type={dropdownType.storyShowMore}
                    app-onclick-props={JSON.stringify({
                        boardType,
                        mapKey: storyKey,
                    })}
                >
                    <i className="mdi mdi-dots-horizontal"></i>
                </div>
            </div>
        </div>
    )
})

export default connect(
    state => ({
        storyRepo: state.page.storyRepo,
    }),
    {
        showModal,
    }
)(PatchGridItem)