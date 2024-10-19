import {createRoot} from 'react-dom/client';
import App from "./App";
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {ConfigProvider} from "antd";
import ruRU from 'antd/locale/ru_RU';
import {Provider} from "react-redux";
import {store} from "./store";

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache()
})

const rootElement = document.getElementById('root');
const root = createRoot(rootElement)

root.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <ConfigProvider locale={ruRU}></ConfigProvider>
            <App/>
        </ApolloProvider>
    </Provider>
);

