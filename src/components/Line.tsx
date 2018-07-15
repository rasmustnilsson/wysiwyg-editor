import * as React from 'react'
const urlRegex =  require('url-regex')

interface Props {
    line: string
}

export default class Line extends React.Component<Props, {}> {

    /**
     * is recursive
     * @param line potentially containing * or __
     * @returns finished line
     */
    parseStyle(line: string): JSX.Element {

        // finds first and second case of * or __
        const OPENING_BOLD = line.indexOf('*') // index of first occurrence
        const CLOSNING_BOLD = line.substring(OPENING_BOLD + 1).indexOf('*') + OPENING_BOLD + 1 // index of last occurrence
        const OPENING_ITALIC = line.indexOf('__') // index of first occurrence
        const CLOSNING_ITALIC = line.substring(OPENING_ITALIC + 2).indexOf('__') + OPENING_ITALIC + 2 // index of last occurrence
        const parts: JSX.Element[] = []

        //checks if bold and strong syntax exists, runs first if appearing first
        if(OPENING_BOLD > -1 && CLOSNING_BOLD != OPENING_BOLD && (OPENING_BOLD < OPENING_ITALIC || OPENING_ITALIC == -1)) {
            
            //only runs if there is text before bold text
            if(OPENING_BOLD != 0) parts.push(<React.Fragment>{this.parseStyle(line.substring(0,OPENING_BOLD))}</React.Fragment>)
            // adds bold text
            parts.push(<strong >{this.parseStyle(line.substring(OPENING_BOLD + 1, CLOSNING_BOLD))}</strong>)
            // adds text after bold text
            parts.push(<React.Fragment>{this.parseStyle(line.substring(CLOSNING_BOLD + 1))}</React.Fragment>)

        } else if(OPENING_ITALIC > - 1 && CLOSNING_ITALIC != OPENING_ITALIC) {

            //only runs if there is text before italic text
            if(OPENING_ITALIC != 0) parts.push(<React.Fragment>{this.parseStyle(line.substring(0,OPENING_ITALIC))}</React.Fragment>)
            // adds italic text
            parts.push(<em>{this.parseStyle(line.substring(OPENING_ITALIC + 2, CLOSNING_ITALIC) + ' ')}</em>)
            // adds text after italic text
            parts.push(<React.Fragment>{this.parseStyle(line.substring(CLOSNING_ITALIC + 2))}</React.Fragment>)

        } else {
            parts.push(<React.Fragment>{ this.parseLine(line) }</React.Fragment>)
        }

        return <React.Fragment>{ parts }</React.Fragment>
    }

    /**
     * 
     * @param line potentially containing links
     * @returns returns element containing a tag
     */
    parseLine(line: string): JSX.Element {
        const lineParts: string[] = line.split(' ')
        const parts: JSX.Element[] = []

        // goes through every word in line
        for(const part of lineParts) {
            if(urlRegex().test(part)) { // finds urls
                parts.push(<a key={parts.length} href={part}>{ part  + ' '}</a>)
                break
            }
            else { // adds regular words as is
                parts.push(<React.Fragment key={parts.length}>{ part + ' ' }</React.Fragment>)
            }
        }

        return <React.Fragment>{ parts }</React.Fragment>
    }

    render() {
        return this.parseStyle(this.props.line)
    }
    
}