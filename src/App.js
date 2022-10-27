
import Navbar from './components/Navbar';
import Boards from './components/Boards';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import BasicUsage from './components/BasicUsage';
import List from './components/List';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
          <Route exact path="/" element={<Boards/>} />
          <Route exact path="/:id" element={<List/>}/>
          <Route exact path="BasicUsage" element={<BasicUsage/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
