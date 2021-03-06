import React from 'react'

import ModalOptions from '../components/ModalOptions'
import StringView from '../../strings/StringView';
import { Body } from '../../components/Common'

export default function EditToast(props) {
    const { path, scopedVars } = props

    return (
        <Body
            style={{
                minWidth: 600,
                width: '75vw',
                height: '60vh',
            }}
        >
            <StringView
                path={path}
                scopedVars={scopedVars}
            />
            <ModalOptions/>
        </Body>
    )
}