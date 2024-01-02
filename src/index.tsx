import {createContext} from 'react';
import ReactDOM from 'react-dom';
import {ContextAppModel} from "./model/ContextApp";
import App from "./App";


export const ContextApp = createContext<ContextAppModel | null>(null)

ReactDOM.render(
  <ContextApp.Provider value={ContextAppModel.ContextAppModel()}>
    <App />
  </ContextApp.Provider>,
  document.getElementById('root')
);

