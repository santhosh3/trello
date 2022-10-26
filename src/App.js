
import Navbar from './components/Navbar';
import Boards from './components/Boards';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
          <Route exact path="/" element={<Boards/>} />
          {/* <Route exact path="/:id"  /> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
