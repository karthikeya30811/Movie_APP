import logo from './logo.svg';
import './App.css';
import HomePage from './components/Home/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MovieReview } from './components/Movie/MovieReview';
import SignIn from './components/NavBar/SignIn';
import SignUp from './components/NavBar/SignUp';
import { WatchList } from './components/WatchList/WatchList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/watchlist' element={<WatchList />} />
        <Route path='/movie/:id' element={<MovieReview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
