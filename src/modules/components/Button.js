import React from 'react';

const getFontSize = (size) => {
    switch(size) {
        case 'small':       return 14
        case 'large':       return 18
        default:            return 14
    }
}

const getColor = (theme) => {
    switch(theme) {
        default:            return '#fff'
    }
}

const getBackground = (theme) => {
    switch(theme) {
        case 'lightgrey':   return '#424650'
        case 'grey':        return '#424650'
        case 'darkgrey':    return '#424650'
        case 'red':         return '#db4757'
        case 'clear':       return 'transparent'
        default:            return '#282b30'
    }
}

export default function Button(props) {
    const {
        children,
        onClick,
        className = "",
        size = 'medium',
        theme = 'black',
        styles,
    } = props

    const fontSize          = getFontSize(size)
    const color             = getColor(theme)
    const backgroundColor   = getBackground(theme)

    const classes = [
        'accessibilityOutline',
        '--button',
        className,
    ].join(" ")

    const buttonStyle = {
        font: `700 ${fontSize}px Segoe UI`,
        letterSpacing: -0.4,
        color,
        backgroundColor,
        ...styles,
    }
    
    return (
        <button
            className={classes}
            style={buttonStyle}
            onClick={event => onClick && onClick({ event })}
        >
            {children}
        </button>
    )
}