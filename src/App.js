import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Linechart from './components/Linechart';
import { Fragment } from 'react';
import Cards from './components/Cards';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route exact path= '/covid-tracker' element={
            <Fragment>
              <Cards/>
              <Linechart/>
            </Fragment>
          }/>
          {/* <Route exact path='/about' element={<About/>}/> */}
          <Route exact path='/search' element={<Home/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
