import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

function InvoiceDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await api.get(`/getInvoiceDetails.php?InvoiceID=${id}`);
        setInvoice(response.data);
      } catch (error) {
        console.error('Error fetching invoice details', error);
      }
    };

    fetchInvoice();
  }, [id]);

  if (!invoice) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Invoice Details</h2>
      <p>Invoice ID: {invoice.InvoiceID}</p>
      <p>Customer ID: {invoice.CustomerID}</p>
      <p>Total: {invoice.Total}</p>
      <p>Status: {invoice.Status}</p>
      <h4>Products</h4>
      <ul>
        {invoice.Details.map((detail) => (
          <li key={detail.DetailID}>
            {detail.ProductName} - {detail.Quantity} x ${detail.Price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InvoiceDetails;
