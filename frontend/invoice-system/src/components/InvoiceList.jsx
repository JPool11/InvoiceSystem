import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../utils/axios';

export const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(5);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const response = await apiUrl('/getInvoices.php');
        setInvoices(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching invoices', error);
        setError('Failed to load invoices. Please try again later.');
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const getStatusBadge = (status) => {
    const statusMap = {
      Paid: 'success',
      Pending: 'warning',
      Overdue: 'danger',
    };
    return <span className={`badge bg-${statusMap[status] || 'secondary'}`}>{status}</span>;
  };

  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading invoices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
        <h2 className="text-danger">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  const totalPages = Math.ceil(invoices.length / invoicesPerPage);

  return (
    <div className="min-vh-100 bg-light">
      <header className="bg-primary text-white text-center py-3 d-flex justify-content-between align-items-center">
        <h1 className="mb-0">Invoice List</h1>
        <Link
          to="/create"
          className="btn btn-light btn-sm d-flex align-items-center"
        >
          <i className="bi bi-file-earmark-plus me-2"></i> Create Invoice
        </Link>
      </header>
      <div className="container my-5">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Invoices</h2>
            <div className="table-responsive">
              <table className="table table-hover table-bordered">
                <thead className="table-light text-center">
                  <tr>
                    <th>ID</th>
                    <th>Customer ID</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentInvoices.map((invoice) => (
                    <tr key={invoice.InvoiceID}>
                      <td className="text-center">{invoice.InvoiceID}</td>
                      <td className="text-center">{invoice.CustomerID}</td>
                      <td className="text-center">${invoice.Total}</td>
                      <td className="text-center">{getStatusBadge(invoice.Status)}</td>
                      <td className="text-center">
                        <Link
                          to={`/invoice/${invoice.InvoiceID}`} // Redirige a los detalles con el ID de la factura
                          className="btn btn-sm btn-outline-primary"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
