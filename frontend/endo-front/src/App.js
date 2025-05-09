import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Extended from './pages/Extended';
import Result from './pages/Result';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sobre' element={<About />} />
        <Route path='/extendido' element={<Extended />} />
        <Route path='/resultado' element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
