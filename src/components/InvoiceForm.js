import React, { useState } from 'react';
import api from '../api/api';

function InvoiceForm() {
  const [customerID, setCustomerID] = useState('');
  const [products, setProducts] = useState([{ productID: '', quantity: '' }]);
  const [errors, setErrors] = useState({});

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

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await api.post('/createInvoice.php', {
        CustomerID: customerID,
        Products: products,
      });
      alert('Invoice created successfully!');
      console.log(response.data);
    } catch (error) {
      alert('Error creating invoice');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Create Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer ID</label>
          <input
            type="text"
            className={`form-control ${errors.customerID ? 'is-invalid' : ''}`}
            value={customerID}
            onChange={(e) => setCustomerID(e.target.value)}
          />
          {errors.customerID && <div className="invalid-feedback">{errors.customerID}</div>}
        </div>
        <div>
          <h4>Products</h4>
          {products.map((product, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                className={`form-control ${errors[`productID-${index}`] ? 'is-invalid' : ''}`}
                placeholder="Product ID"
                value={product.productID}
                onChange={(e) =>
                  handleProductChange(index, 'productID', e.target.value)
                }
              />
              {errors[`productID-${index}`] && (
                <div className="invalid-feedback">{errors[`productID-${index}`]}</div>
              )}
              <input
                type="number"
                className={`form-control ${errors[`quantity-${index}`] ? 'is-invalid' : ''}`}
                placeholder="Quantity"
                value={product.quantity}
                onChange={(e) =>
                  handleProductChange(index, 'quantity', e.target.value)
                }
              />
              {errors[`quantity-${index}`] && (
                <div className="invalid-feedback">{errors[`quantity-${index}`]}</div>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-secondary" onClick={addProduct}>
            Add Product
          </button>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Invoice
        </button>
      </form>
    </div>
  );
}

export default InvoiceForm;
