import './App.css';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './User' 
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/user' element={<User />} />
        </Routes>
      </BrowserRouter>
      
    
      
    </div>
  )
}

export default App
