import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Test from './components/Test';
import Locations from './components/Locations';
import Community from './components/Community';
import { useState } from 'react';
import ProductsAndTreatments from './components/ProductsAndTreatments';

function App() {

  const [selectedItem, setSelectedItem] = useState('link1');

  function handleUpdateSelectedItem(newSelectedItem) {
    setSelectedItem(newSelectedItem);
  }

  return (
    <Router>
      <div className='App'>
          <Navbar selectedItem={selectedItem} />
      <Routes>
          <Route exact path='/' element={<Home handleUpdateSelectedItem={handleUpdateSelectedItem}/>} />
          <Route path='/profile' element={<Profile handleUpdateSelectedItem={handleUpdateSelectedItem}/>} />
          <Route path='/test' element={<Test/>} />
          <Route path='/products&treatments' element={<ProductsAndTreatments />} />
          <Route path='/locations' element={<Locations handleUpdateSelectedItem={handleUpdateSelectedItem}/>} />
          <Route path='/community' element={<Community handleUpdateSelectedItem={handleUpdateSelectedItem}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
