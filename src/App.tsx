import * as React from 'react'
import { connect } from 'react-redux'
import { setMessage, saveMessage } from './actions/TextActions'
import { State, LinkedList } from './tsClasses'

import Body from './components/Body'

import './App.css';

interface Props {
  saveMessage(): void
  setMessage(message: string): void
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
    this.saveMessage = this.saveMessage.bind(this)
    this.state = {
      lines: []
    }
  }

  componentWillMount() {
    this.props.saveMessage()
    this.generateLines()
  }

	saveMessage = (e: any) => {
    this.props.saveMessage()
    this.generateLines()
  }

	handleTextChange(e: any) {
    this.props.setMessage(e.target.value)
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
            <p>Start with: </p>
            <ul className="list-group">
              <li className="list-group-item"><var>#, ##, ###</var> => for headers</li>
              <li className="list-group-item"><var>*</var> => for unordered lists</li>
              <li className="list-group-item"><var>1., 2. ...</var> => for ordered lists</li>
            </ul>
          </div>
        </header>
        <div className="d-flex flex-column align-items-start container px-0 mt-2">
          <textarea className="form-control" id="inputTextArea" rows={8} onChange={ this.handleTextChange } defaultValue={ this.props.textReducer.message } />
          <button className="btn btn-primary my-2 align-self-center" onClick={ this.saveMessage }>Force compile</button>
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
	saveMessage: () => dispatch(saveMessage()),
	setMessage: (message: string) => dispatch(setMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);