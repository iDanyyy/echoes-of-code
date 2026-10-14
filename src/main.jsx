import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MarketOverview from '../MarketOverview.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MarketOverview />
  </StrictMode>,
);
