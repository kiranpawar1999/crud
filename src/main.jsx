
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router';

import { Provider } from 'react-redux';
import Store from './Redux/Store.jsx';

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
       <Provider store={Store}>
         <App/>
       </Provider>
    </BrowserRouter>

)
