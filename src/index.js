import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Apptable from './Apptable';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Apptable />, document.getElementById('root'));
registerServiceWorker();
