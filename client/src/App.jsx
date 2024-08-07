import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';         
import 'primeicons/primeicons.css';                      
import 'primeflex/primeflex.css';
import Login from "./pages/Login";
import './index.css'
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import PostLocation from './pages/PostLocation';
import { UserContextProvider } from './components/UserContext';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import LocationPage from './pages/LocationPage';
function App() {

  return (
    <>
    <UserContextProvider>
     <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/postlocation' element={<PostLocation />} />
        <Route path='/postlocation/update/:id' element={<PostLocation />} />
        <Route path='/location/:id' element={<LocationPage />} />
      </Routes>
    </Router>
    </UserContextProvider>
    </>
  )
}

export default App
