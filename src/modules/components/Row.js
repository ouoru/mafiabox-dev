import React from 'react';
import { palette, padding, alignX, justifyY } from './Standards'

const getPadding = (size) => {
    switch(size) {
        case 'xs':          return '8px 12px'
        case 's':           return '10px 14px'
        case 'l':           return '12px 16px'
        case 'xl':          return '12px 16px'
        case 'xxl':         return '12px 16px'
        default:            return '0px 0px'
    }
}

export default function Row(props) {
    const {
        children,
        size                = '',
        sizes               = '',
        y                   = '',
        x                   = '',
        className           = '',
        style,
        wrap                = 'wrap',
        color,
        bg,
        onClick,
    } = props

    const bodyStyle = {
        justifyContent: alignX(x),
        alignItems: justifyY(y),
        padding: size ? getPadding(size) : sizes && padding(sizes),
        backgroundColor: bg && palette(bg),
        color: palette(color || 'whitish'),
        flexWrap: wrap,
        display: 'flex',
        flexDirection: 'row',
        minHeight: 20,
        ...style,
    }

    return (
        <div
            className={className}
            style={bodyStyle}
            onClick={event => onClick && onClick(event)}
        >
            {children}
        </div>
    )
}