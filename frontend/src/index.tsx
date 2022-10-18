import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const basePath = process.env.REACT_APP_BASEPATH ?? '/';

ReactDOM.render(
    <React.StrictMode>
        <App basePath={basePath}/>
    </React.StrictMode>,
    document.getElementById('root')
);


