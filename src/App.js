import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Overview from './pages/Overview';
import Detail from './pages/Detail';
import { QueryClient, QueryClientProvider } from 'react-query';
import SimilarRegionModal from './components/SimilarRegionModal';
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <Header></Header>
          {/* <SimilarRegionModal></SimilarRegionModal> */}
          <Routes>
            <Route path='/' element={<div style={{ display: "flex", justifyContent: "center", fontSize: "2rem", fontWeight: "600" }}>Welcome</div>}></Route>
            <Route path='/overview' element={<Overview></Overview>}></Route>
            <Route path='/detail' element={<Detail></Detail>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
