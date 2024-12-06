import React, { useState } from 'react';
import { apiUrl } from '../utils/axios';
import { Link } from 'react-router-dom';

export const InvoiceForm = () => {
  const [customerID, setCustomerID] = useState('');
  const [products, setProducts] = useState([{ productID: '', quantity: '' }]);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ type: '', message: '' });

  const validateForm = () => {
    const newErrors = {};

    if (!customerID.trim()) {
      newErrors.customerID = 'Customer ID is required';
    }

    products.forEach((product, index) => {
      if (!product.productID.trim()) {
        newErrors[`productID-${index}`] = 'Product ID is required';
      }
      if (!product.quantity || isNaN(product.quantity) || Number(product.quantity) <= 0) {
        newErrors[`quantity-${index}`] = 'Quantity must be a positive number';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addProduct = () => {
    setProducts([...products, { productID: '', quantity: '' }]);
  };

  const removeProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const dataToSend = {
      CustomerID: customerID,
      Products: products.map(product => ({
        ProductID: product.productID,
        Quantity: product.quantity,
      })),
    };

    try {
      console.log('Data to send:', dataToSend); // Verifica los datos antes de enviarlos

      const response = await apiUrl.post('/createInvoice.php', dataToSend);

      if (response.status === 200) {
        setAlert({ type: 'success', message: 'Invoice created successfully!' });
        setCustomerID('');
        setProducts([{ productID: '', quantity: '' }]);
        setErrors({});
      } else {
        setAlert({ type: 'danger', message: 'Error creating invoice' });
      }
    } catch (error) {
      setAlert({ type: 'danger', message: 'Error creating invoice' });
      console.error(error);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <header className="bg-primary text-white text-center py-3 w-100">
        <h1>Create Invoice</h1>
      </header>

      <div className="container mt-4">
        {alert.message && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.message}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setAlert({ type: '', message: '' })}
            ></button>
          </div>
        )}

        <div className="card shadow mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            <h4 className="card-title text-center mb-4">Invoice Form</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Customer ID</label>
                <input
                  type="text"
                  className={`form-control ${errors.customerID ? 'is-invalid' : ''}`}
                  value={customerID}
                  onChange={(e) => setCustomerID(e.target.value)}
                />
                {errors.customerID && <div className="invalid-feedback">{errors.customerID}</div>}
              </div>
              <h5 className="mb-3">Products</h5>
              {products.map((product, index) => (
                <div key={index} className="row g-3 align-items-end mb-3">
                  <div className="col">
                    <label className="form-label">Product ID</label>
                    <input
                      type="text"
                      className={`form-control ${errors[`productID-${index}`] ? 'is-invalid' : ''}`}
                      placeholder="Enter Product ID"
                      value={product.productID}
                      onChange={(e) =>
                        handleProductChange(index, 'productID', e.target.value)
                      }
                    />
                    {errors[`productID-${index}`] && (
                      <div className="invalid-feedback">{errors[`productID-${index}`]}</div>
                    )}
                  </div>
                  <div className="col">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className={`form-control ${errors[`quantity-${index}`] ? 'is-invalid' : ''}`}
                      placeholder="Enter Quantity"
                      value={product.quantity}
                      onChange={(e) =>
                        handleProductChange(index, 'quantity', e.target.value)
                      }
                    />
                    {errors[`quantity-${index}`] && (
                      <div className="invalid-feedback">{errors[`quantity-${index}`]}</div>
                    )}
                  </div>
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeProduct(index)}
                      title="Remove Product"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary w-100 mb-3"
                onClick={addProduct}
              >
                Add Product
              </button>
              <button type="submit" className="btn btn-primary w-100">
                Create Invoice
              </button>
            </form>
            {/* Botón de regresar al listado de facturas */}
            <Link to="/" className="btn btn-light w-100 mt-3">
              Back to Invoice List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
