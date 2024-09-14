import {createContext} from 'react';
import ReactDOM from 'react-dom';
import {ContextAppModel} from "./model/programm-types/ContextApp";
import App from "./App";
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {ConfigProvider} from "antd";
import ruRU from 'antd/locale/ru_RU';

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache()
})


export const ContextApp = createContext<ContextAppModel | null>(null)

ReactDOM.render(
    <ContextApp.Provider value={ContextAppModel.ContextAppModel()}>
        <ApolloProvider client={client}>
            <ConfigProvider locale={ruRU}></ConfigProvider>
            <App/>
        </ApolloProvider>
    </ContextApp.Provider>,
    document.getElementById('root')
);

