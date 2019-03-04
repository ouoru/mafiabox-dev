import React from 'react'

import { dropdownType, StatefulSourceId } from '../../../dropdown/types'

export default function EventRecipients(props) {
    const { selectedEvent, eventIndex } = props
    const { showTo, hideFrom } = selectedEvent

    //showing only to selected uid's
    const exclusive = Object.keys(showTo || {}).length > 0
    const inclusive = Object.keys(hideFrom || {}).length > 0
    
    return (
        <div
            className="row-nowrap"
            style={{
                padding: '0px 10px',
                color: '#a6a6a6',
            }}
        >
            {!exclusive && <div
                className="cute-button app-onclick"
                menu-type={dropdownType.pickRecipient}
                stateful-source={StatefulSourceId.editEvent}
                app-onclick-props={JSON.stringify({
                    selectionType: 'showTo',
                    eventIndex,
                })}
            >
                everyone
            </div>}
            {exclusive && <div
                className="cute-button app-onclick"
                menu-type={dropdownType.pickRecipient}
                stateful-source={StatefulSourceId.editEvent}
                app-onclick-props={JSON.stringify({
                    selectionType: 'showTo',
                    eventIndex,
                })}
            >
                {Object.keys(showTo).filter(i => showTo[i]).join(', ')}
            </div>}
            {!exclusive && <div
                className="row cute-button app-onclick"
                empty="true"
                menu-type={dropdownType.pickRecipient}
                stateful-source={StatefulSourceId.editEvent}
                app-onclick-props={JSON.stringify({
                    selectionType: 'hideFrom',
                    eventIndex,
                })}
                style={{
                    marginLeft: 6,
                }}
            >
                except
                {inclusive && <div style={{ marginLeft: 6, color: '#a6a6a6',  }}>
                    {Object.keys(hideFrom).filter(i => hideFrom[i]).join(', ')}
                </div>}
            </div>}
        </div>
    )
}