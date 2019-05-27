import React from 'react'
import './Header.css'
import '../../board/board.css'
import { connect } from 'react-redux'

import { navigate } from '../../navigation/NavReducer'

import HeaderSearch from './HeaderSearch';
import HeaderAddStory from './HeaderAddStory';
import { Row } from '../../components/Common'

function HeaderView(props) {
    const { location } = props
    const { pathname } = location
    
    const paths = pathname.split('/')

    const onPathClick = (index) => {
        let newPath = paths.slice(0, index + 1).join('/')
        props.navigate(newPath)
    }

    return (
        <div className="header">
            <Row style={{marginRight: 'auto'}}>
                {paths.map((item, index) => (
                    <div key={index} className="row-centered path-view">
                        {index > 1 ?
                            <div className="path-separator">/</div>
                            :<div style={{width: 2}}/>
                        }
                        {item &&
                            <div className="path-button"
                                onClick={() => onPathClick(index)}
                            >
                                {item}
                            </div>
                        }
                    </div>
                ))}
            </Row>
            <HeaderSearch/>
            <HeaderAddStory/>
        </div>
    )
}

export default connect(
    null,
    {
        navigate,
    }
)(HeaderView)