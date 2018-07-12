import  * as React from 'react'
import { connect } from 'react-redux'
import { setText } from './actions/TextActions'
import { State, LinkedList } from './tsClasses'

import Body from './components/Body'

import './App.css';

interface Props {
  setText(message: string): void
  textReducer?: {
    text?: LinkedList,
    message?: string
  }
}

class App extends React.Component<Props> {
  
  constructor(props: Props) {
    super(props)
    this.generateLines = this.generateLines.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.state = {
      lines: []
    }
  }

  componentWillMount() {
    this.generateLines()
  }

  /**
   * 
   * @param e event from input
   */
	handleTextChange(e: React.FormEvent<HTMLTextAreaElement>) {
    console.log(e.currentTarget.value)
    this.props.setText(e.currentTarget.value)
    this.generateLines()
  }
  
  generateLines() {
    let cur = this.props.textReducer.text.top
    const lines = []
    while(cur) {
      lines.push(cur.value)
      cur = cur.next
    }
    this.setState({
      lines: lines
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container px-0">
            <h1>WYSIWYG - Editor</h1>
            <p>Style text with: </p>
            <ul className="list-group">
              <li className="list-group-item"><var>#, ##, ###, ####, #####, ######</var> => for headers</li>
              <li className="list-group-item"><var>*</var> => for unordered lists</li>
              <li className="list-group-item"><var>1., 2. ...</var> => for ordered lists</li>
            </ul>
          </div>
        </header>
        <div className="d-flex flex-column align-items-start container px-0 my-2">
          <textarea className="form-control" id="inputTextArea" rows={10} onChange={ this.handleTextChange } defaultValue={ this.props.textReducer.message } />
        </div>
        <Body lines={ this.props.textReducer.text } />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  ...state
})

const mapDispatchToProps = (dispatch: any) => ({
	setText: (message: string) => dispatch(setText(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);