import * as React from 'react';

const Body = (props: any) => {

    const lines:any[] = []
    const getLineType = (line: string) => {

        if(!line) return false
        if(line.length == 0) return 'LINE-BREAK'
        if(parseInt(line.charAt(0)) && line.charAt(1) == '.' && line.charAt(2) == ' ') return 'ORDERED_LIST'
        return line.substring(0,line.indexOf(' '))
    }

    for(let i: number = 0; i < props.lines.length; i++) {

        const line = props.lines[i]
        const lineType = getLineType(line)
        let PREVIOUS_I:number
        let listItems: any[] = []

        switch(lineType) {
            case '#':
                lines.push(<h1 key={i}>{line.substring(1)}</h1>)
                break

            case '##':
                lines.push(<h2 key={i}>{line.substring(2)}</h2>)
                break

            case '###':
                lines.push(<h3 key={i}>{line.substring(3)}</h3>)
                break
                
            case '*':
                listItems = []
                PREVIOUS_I = i
                while(getLineType(props.lines[i]) == '*')
                    listItems.push(<li key={ PREVIOUS_I + '_' +  (i - PREVIOUS_I) }>{ props.lines[i++].substring(1) }</li>)
                lines.push(<ul className="my-3" key={PREVIOUS_I}>{ listItems }</ul>)
                break

            case 'ORDERED_LIST':
                listItems = []
                PREVIOUS_I = i
                while(getLineType(props.lines[i]) == 'ORDERED_LIST')
                    listItems.push(<li key={ PREVIOUS_I + '_' +  (i - PREVIOUS_I) }>{ props.lines[i++].substring(2) }</li>)
                lines.push(<ol className="my-3" key={PREVIOUS_I}>{ listItems }</ol>)
                break

            case 'LINE-BREAK':
                lines.push(<br/>)
                break
            
            default:
                lines.push(<p className='m-0' key={i}>{line}</p>)
                break


        }        
    }

    return <div className='container border text-container text-left py-2'>{ lines }</div>
}

export default Body