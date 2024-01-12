import { Provider } from 'react-redux';
import './App.css';
import React from 'react';
import { store } from './service/store/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Overview from './pages/Overview';
import Detail from './pages/Detail';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header></Header>
          <Routes>
            <Route path='/header' element={<Header></Header>}></Route>
            <Route path='/overview' element={<Overview></Overview>}></Route>
            <Route path='/detail' element={<Detail></Detail>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
