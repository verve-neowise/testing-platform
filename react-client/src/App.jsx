import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Login from './ui/login/Login';
import Register from './ui/register/Register';
import Home from './ui/home/Home'
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthProtector from './wrappers/AuthProtector';
import Editor from './ui/editor/Editor';
import Admin from './ui/admin/Admin';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={ 
            <Navigate replace to='/lectures/1'/>
          } />
          
          <Route path='/lectures/:id' element={ 
            <AuthProtector>
              <Home/>
            </AuthProtector> 
          } />

          <Route path='/task/:id' element={ 
            <AuthProtector>
              <Editor/>
            </AuthProtector> 
          } />

          <Route path='/admin' element={
            <AuthProtector adminRequired={true}>
              <Admin/>
            </AuthProtector>
          }/>

          <Route path='/login' element={<Login />} />
          
          <Route path='/register' element={<Register />} />

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

  );
}

export default App;
