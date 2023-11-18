
import './index.css';
import AddNote from './components/AddNote';
import Create from './components/Create';
import Update from './components/Update';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    < >
    <BrowserRouter>
     <Routes>
      <Route path='/' element ={<AddNote/>} />
      <Route path='/create' element ={<Create/>} />
      <Route  path='/update/:id' element={<Update />} />
     </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
