import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App';
import store from './store';

import './index.css';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();


// import { LinkedList, Node } from './tsClasses'

// const wordList = new LinkedList()

// wordList.setTop(new Node('word'))

// wordList.top.next = new Node('wword')
// wordList.top.next.next = new Node('wwword')