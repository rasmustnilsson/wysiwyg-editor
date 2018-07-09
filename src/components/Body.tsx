import * as React from 'react';
import { connect } from 'react-redux';
import { State as StateClass, LinkedList } from '../tsClasses'

interface Props {
    lines: LinkedList
}

export class Body extends React.Component<Props> {
    getLineType(line: string): string {
        if(!line) return null
        if(line.length == 0) return 'LINE-BREAK'
        if(parseInt(line.charAt(0)) && line.charAt(1) == '.' && line.charAt(2) == ' ') return 'ORDERED_LIST'
        return line.substring(0,line.indexOf(' '))
    }

    render() {
        const lines: LinkedList = new LinkedList()
        let cur = this.props.lines.top
        let i:number = 0
        if(!cur || !cur.value) return <pre>No text</pre>
        while(cur) {
            let line = cur.value
            const lineType = this.getLineType(line)
            let subIndex:number
            let listItems: any[] = []
            switch(lineType) {
                case '#':
                    lines.addElement(<h1 key={i++}>{line.substring(1)}</h1>)
                    break
    
                case '##':
                    lines.addElement(<h2 key={i++}>{line.substring(2)}</h2>)
                    break
    
                case '###':
                    lines.addElement(<h3 key={i++}>{line.substring(3)}</h3>)
                    break
                    
                case '*':
                    listItems = []
                    subIndex = 0
                    while(this.getLineType(line) == '*') {
                        listItems.push(<li key={ i + '_' + subIndex++ }>{ line.substring(1) }</li>)
                        cur = cur.next
                        line = cur.value
                    }
                    lines.addElement(<ul className="my-3" key={i++}>{ listItems }</ul>)
                    break
    
                case 'ORDERED_LIST':
                    listItems = []
                    subIndex = 0
                    while(this.getLineType(line) == 'ORDERED_LIST') {
                        listItems.push(<li key={ i + '_' + subIndex++ }>{ line.substring(2) }</li>)
                        cur = cur.next
                        line = cur.value
                    }
                    lines.addElement(<ol className="my-3" key={i++}>{ listItems }</ol>)
                    break
    
                case 'LINE-BREAK':
                    lines.addElement(<br/>)
                    break
                
                default:
                    lines.addElement(<p className='m-0' key={i++}>{line}</p>)
                    break
            }
            cur = cur.next 
        }
        return (
            <React.Fragment>
                <div className='container border text-container text-left py-2'>{ lines.getElement() }</div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: StateClass) => ({
    ...state
})
  
const mapDispatchToProps = (dispatch: any) => ({

})
  
export default connect(mapStateToProps, mapDispatchToProps)(Body);