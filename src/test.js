import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import {Button as Button1} from "ishow"; 
import Button from "ishow/lib/Button"; 

//import Button from "../lib/Button"; 
//import registerServiceWorker from './registerServiceWorker';

class App extends Component {
    render() {
      return (
        <div className="App">
          <header className="App-header">
            
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            开始, edit <code>src/App.js</code> and save to reload.22
            <Button1 type="warning">警告</Button1>
            <Button type="success">成功</Button>
          
          </p>
        </div>
      );
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
