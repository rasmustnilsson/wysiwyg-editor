import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'react-materialize'
import { setMessageAction, saveMessageAction } from './actions/TextActions'

import Body from './components/Body'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props)
    this.generateLines = this.generateLines.bind(this)
    this.state = {
      lines: []
    }
  }

  componentWillMount() {
    this.props.saveMessageAction()
    this.generateLines()
  }

	saveMessage = (e) => {
    this.props.saveMessageAction()
    this.generateLines()
  }

	handleTextChange(e) {
    this.props.setMessageAction(e.target.value);
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
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">To get started, edit <code>src/App.js</code> and save to reload.</p>
        <div className="d-flex flex-column align-items-center">
          <textarea rows="8" cols="100" onChange={ e => this.handleTextChange(e) } defaultValue={ this.props.textReducer.message }></textarea>
          <button className="btn btn-primary my-2" onClick={ this.saveMessage }>Save message</button>
        </div>
        {/* <Body lines={ this.props.textReducer.text } /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
	saveMessageAction: () => dispatch(saveMessageAction()),
	setMessageAction: (value) => dispatch(setMessageAction(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);