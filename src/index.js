import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');  //find the div marked as rood in index.html and save it as a variable
const root = ReactDOM.createRoot(container); //pass in the div container we just found and create a DOM node to render components
root.render( //insert react componets into the DOM. App is what contains our code that will be printed to the DOM
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
