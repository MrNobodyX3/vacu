import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
// import About from './components/About';
// import Products from './components/Products';
// import HireMe from './components/HireMe';

function App() {
  return (
    <Router>
      <div className="App flex flex-col">
        <Header className="h-10" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/hire-me" element={<HireMe />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
