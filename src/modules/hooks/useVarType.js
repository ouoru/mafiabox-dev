import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import {
    WILD_CHAR,
} from '../logic/proptool';
import {
    VARTYPE_FILTER,
} from '../common/arrows'

/*used to filter related vars from a variable type(s)
    tame variables are ready to use, wild variables contain a wildcard
    
    function example() {
        const [tame, wild] = useVarType(variableType = '', variables = {})
        ...
    }
*/
export default (type, vars) => {
    const [results, setResults] = useState([[], []])
    const { rssMap } = useSelector(state => state.page)

    useEffect(() => {
        const typeFilter = VARTYPE_FILTER(type)
        
        const relatedVars = _.filter(vars, typeFilter)
        const groupedRSSVars = _(rssMap)
            .filter(typeFilter)
            .groupBy(i => i.value.includes(WILD_CHAR))
            .value()

        setResults([
            [...relatedVars, ...(groupedRSSVars.false||[])],
            (groupedRSSVars.true||[]),
        ])
    }, [vars])
    
    return results
}