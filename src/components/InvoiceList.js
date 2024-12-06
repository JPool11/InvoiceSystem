import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await api.get('/getInvoices.php');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices', error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="container">
      <h2>Invoices</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.InvoiceID}>
              <td>{invoice.InvoiceID}</td>
              <td>{invoice.CustomerID}</td>
              <td>{invoice.Total}</td>
              <td>{invoice.Status}</td>
              <td>
                <Link to={`/invoice/${invoice.InvoiceID}`} className="btn btn-info">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceList;
