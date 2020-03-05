import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import { LocaleProvider,ConfigProvider } from 'antd';
import fa_IR from 'antd/lib/locale-provider/fa_IR';
import 'moment/locale/fa';
import registerServiceWorker from './registerServiceWorker';
import  App from './components/App'

import { PersistGate } from 'redux-persist/integration/react'
import store,{persistor} from 'redux/store/store'

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} direction="rtl">
            <BrowserRouter>
                <ConfigProvider locale={fa_IR}>
                    <Route name="App" path="/" render={(props) => <App {...props} />} />
                </ConfigProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker(); 
