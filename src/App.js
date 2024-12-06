import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import InvoiceDetails from './components/InvoiceDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/create" element={<InvoiceForm />} />
          <Route path="/invoice/:id" element={<InvoiceDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
