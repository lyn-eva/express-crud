import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import Signin from './components/Signup';
import Nav from './components/Nav';
import LogIn from './components/LogIn';
import Home from './components/Home';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex min-h-screen flex-col bg-blue-300 px-[5vw]'>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path='/signup' element={<Signin />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
