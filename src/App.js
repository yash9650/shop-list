import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShopList from './Components/ShopList';
import Header from './Components/Header';
import AddShop from './Components/AddShop';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<ShopList />} />
        <Route path='/add-shop' element={<AddShop />} />
      </Routes>
    </Router>
  );
}

export default App;
