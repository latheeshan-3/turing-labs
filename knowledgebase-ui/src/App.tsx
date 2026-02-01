import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Documents from './pages/Documents';
import Prompts from './pages/Prompts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Documents />} />
          <Route path="prompts" element={<Prompts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
