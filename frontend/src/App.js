import { Routes, Route, Link } from 'react-router-dom';

import './assets/css/main.css';

import Todos from './pages/Todos';

import Banners from './pages/Banner';

function NotFound() {
  return (
    <>
      <main>
        <h2>404</h2>
        <p>Page not found</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/banners" element={<Banners />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
