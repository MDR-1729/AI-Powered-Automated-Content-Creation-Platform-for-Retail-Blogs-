import logo from './logo.svg';
import './App.css';

//Importing all the components at the top
import Navigation from './components/Navigation' 
import Home from './components/Home' 
import ProductDescription from './components/ProductDescription' 
import LoginSignup from './components/LoginSignup';

import{ BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
      <Navigation/>

      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/Product-Description" element={<ProductDescription/>} />
        <Route path="/" element={<LoginSignup/>}/>
      </Routes>

      </div>
    </Router>
  );
}

export default App;
