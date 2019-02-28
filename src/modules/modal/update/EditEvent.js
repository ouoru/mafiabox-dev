import React from 'react'

import StringDashboard from '../../strings/StringDashboard';
import ModalOptions from '../components/ModalOptions'

export default function EditEvent(props) {
    let handleSave = () => {
        const { isTrigger } = props

        if (isTrigger) {
            props.popModalBy(1)
            props.onAttach()
        } else {
            props.onSave()
            props.popModalBy(1)
        }
    }
    
    return (
        <div
            cancel-appclick="true"
            style={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 600,
                width: '75vw',
            }}
        >
            <StringDashboard {...props}/>
            <ModalOptions
                onSave={handleSave}
                onClose={props.onClose}
            />
        </div>
    )
}