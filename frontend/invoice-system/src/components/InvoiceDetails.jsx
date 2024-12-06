import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../utils/axios';

export const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await apiUrl(`/getInvoiceDetails.php?InvoiceID=${id}`);
        setInvoice(response.data);
      } catch (error) {
        console.error('Error fetching invoice details', error);
      }
    };

    fetchInvoice();
  }, [id]);

  if (!invoice) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Invoice Details</h2>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <p><strong>Invoice ID:</strong> {invoice.InvoiceID}</p>
              <p><strong>Customer ID:</strong> {invoice.CustomerID}</p>
              <p><strong>Date:</strong> {new Date(invoice.Date).toLocaleString()}</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p><strong>Status:</strong> 
                <span 
                  className={`badge ${invoice.Status === 'Paid' ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {invoice.Status}
                </span>
              </p>
              <h4 className="mt-3">
                <strong>Total:</strong> ${parseFloat(invoice.Total).toFixed(2)}
              </h4>
            </div>
          </div>

          <h4 className="mt-4">Products</h4>
          <ul className="list-group list-group-flush">
            {invoice.Details.map((detail) => (
              <li 
                key={detail.DetailID} 
                className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{detail.ProductName}</strong>
                  <p className="mb-0 text-muted">Product ID: {detail.ProductID}</p>
                </div>
                <div className="text-end">
                  <span>{detail.Quantity} x ${parseFloat(detail.Price).toFixed(2)}</span>
                  <br />
                  <span className="fw-bold text-primary">
                    ${parseFloat(detail.Quantity * detail.Price).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 text-end">
            <a href="/" className="btn btn-outline-primary">
              Back to Invoices
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
