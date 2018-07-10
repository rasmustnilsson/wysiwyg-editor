import * as React from 'react'
const urlRegex =  require('url-regex')

interface Props {
    line: string
}

export default class Line extends React.Component<Props, {}> {

    /**
     * 
     * @param line line to look for and inject urls to
     * @returns finished element containing links
     */
    parseURLs(line: string): JSX.Element {
        // puts all urls in array
        const urls: string[] = line.match(urlRegex())
        if(!urls) return <React.Fragment>{ line }</React.Fragment>

        let i = 0
        const parts: JSX.Element[] = []

        // adds text before url and url to parts
        for(const url of urls) {
            parts.push(<React.Fragment key={parts.length}>{ line.substring(i, line.indexOf(url)) }</React.Fragment>,
                <a key={parts.length + 1} href={url}>{ url }</a>)
            i = line.indexOf(url) + url.length
        }

        // adds text after last url
        parts.push(<React.Fragment key={parts.length}>{ line.substring(i) }</React.Fragment>)
        return <React.Fragment>{ parts }</React.Fragment>
    }

    render() {
        return this.parseURLs(this.props.line)
    }
    
}