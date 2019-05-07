import { rssMap } from '../common/defaults'

export const START_CHAR = '('
export const END_CHAR = ')'
export const WILD_CHAR = '@'

export const START_REGEX = /\(/g
export const END_REGEX = /\)/g

//input => "(rss)(lobby)((choices)(user))"
//ouput => ["rss", "lobby", "(choices)(user)"]
export function separateField(prefix="") {
    //make sure string is valid
    const a = (prefix.match(START_REGEX)||[]).length,
          b = (prefix.match(END_REGEX)||[]).length,
          fields = [];
          
    if (a !== b) {
        console.warn('String should have the same amount of ( and ), proptool.js')
        return fields;
    }

    let counter = 0,
        pointer = 0;

    for (var i=0; i<prefix.length; i++) {
        const c = prefix.charAt(i)
        
        if (c === START_CHAR) {
            if(counter === 0) {
                pointer = i + 1;
            }
            counter++;
        } else if (c === END_CHAR) {
            if (counter === 1) {
                fields.push(prefix.substring(pointer, i))
            }
            counter--;
        }
    }

    return fields;
}

export function concatField(a="", b="") {return a + START_CHAR + b + END_CHAR}
export function combineFields(fields=[]) {return START_CHAR + fields.join(END_CHAR + START_CHAR) + END_CHAR}

//returns properties of prefix existing in rssMap
export function getSubfields(prefix) {
    const parts = separateField(prefix),
          fields = [];
          
    for (var key in rssMap) {
        let match = true;
        const fieldInfo = rssMap[key];

        //if fieldInfo is a subfield, it's length will be 1 greater than the prefix
        if (fieldInfo.fieldLength !== parts.length + 1) continue

        //compare fieldInfo to the prefix parts, does not need to check the last field of fieldInfo
        for (var i=0; i<parts.length; i++) {
            //if field doesn't match, and field isn't a wildcard, it is not a match
            if (fieldInfo.fields[i] !== parts[i] && fieldInfo.fields[i] !== WILD_CHAR) {
                match = false
                break
            }
        }

        if (match) {
            fields.push(fieldInfo)
        }
    }
    
    return fields;
}

//returns the proper update config to LogicExpandable using prefix
export function getUpdateConfig(prefix) {
    const parts = separateField(prefix)

    for (var ref in rssMap) {
        let match = true;
        const fieldInfo = rssMap[ref];

        //if fieldInfo is a match, it's length will be equal to prefix
        if (fieldInfo.fieldLength !== parts.length) continue

        //if a field doesn't match, set match to false and leave loop
        for (var i=0; i<parts.length; i++) {
            if (fieldInfo.fields[i] !== parts[i] && fieldInfo.fields[i] !== WILD_CHAR) {
                match = false
                break
            }
        }

        //if field is a match, return fieldInfo
        if (match) {
            return fieldInfo;
        }
    }

    return {}
}

//display the variable in proper javascript
//input => (rss)(lobby)((choices)(user))(dead)
//ouput => rss.lobby[choices.user].dead
export function parseJS(string) {
    if (!string) return ""

    const fields = separateField(string)
    let str = fields[0]

    for (var i=1; i<fields.length; i++) {
        if (fields[i].charAt(0) === START_CHAR && fields[i].charAt(fields[i].length - 1) === END_CHAR) {
            str += '[' + parseJS(fields[i]) +']'
        } else {
            str += '.' + fields[i]
        }
    }
       
    return str
}