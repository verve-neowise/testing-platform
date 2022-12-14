import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './ui/login/Login';
import Register from './ui/register/Register';
import Home from './ui/home/Home'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

  );
}

export default App;