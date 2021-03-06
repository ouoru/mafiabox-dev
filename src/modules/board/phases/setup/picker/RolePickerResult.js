import React from 'react'
import { connect } from 'react-redux';

import { updateGeneral } from '../../../../page/PageReducer';

import {
    Text,
    Row,
    Icon,
    Bubble,
} from '../../../../components/Common';

function RolePickerResult(props) {
    const { item, path, draftInfo } = props
    const { key, title } = item
    const { roles } = draftInfo

    const currentCount = (roles && roles[key]) || 0

    const onRemove = () => {
        if (currentCount === 0) return;
        props.updateGeneral({
            path: [...path, 'roles', key],
            update: currentCount - 1,
        })
    }
    const onAdd = () => {
        props.updateGeneral({
            path: [...path, 'roles', key],
            update: currentCount + 1,
        })
    }

    return (
        <Bubble className="--slide-right" bg={!!currentCount ? "blue" : "blackish"} style={{margin: 4}}>
            <Row y="c">
                <Text size="s" style={{marginRight: 10}}>{title}</Text>
                <Icon size="xl" icon="minus-circle" onClick={onRemove}></Icon>
                <Text style={{margin: '0px 2px'}}>{currentCount}</Text>
                <Icon size="xl" icon="plus-circle" onClick={onAdd}></Icon>
            </Row>
        </Bubble>
    )
}

export default connect(
    null,
    {
        updateGeneral,
    }
)(RolePickerResult)