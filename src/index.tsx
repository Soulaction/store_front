import {createContext} from 'react';
import ReactDOM from 'react-dom';
import {ContextAppModel} from "./model/ContextApp";
import App from "./App";
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache()
})


export const ContextApp = createContext<ContextAppModel | null>(null)

ReactDOM.render(
    <ContextApp.Provider value={ContextAppModel.ContextAppModel()}>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </ContextApp.Provider>,
    document.getElementById('root')
);

