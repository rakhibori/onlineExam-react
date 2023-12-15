import React from 'react';
import ReactDOM from 'react-dom';
import App from './App1'
import '../src/fonts/farsi-fonts/iran-sans-500.woff'

import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <BrowserRouter>
        <App/>
    </BrowserRouter>
)