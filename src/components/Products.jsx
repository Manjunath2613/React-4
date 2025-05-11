import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ConfirmationDialog from './ConfirmationDialog';

export default function Products() {
  const { products, loading } = useProducts();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowDialog(true);
  };

  const handleConfirm = () => {
    setShowDialog(false);
    navigate(`/products/${selectedProduct.id}`);
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  if (loading) return <div style={styles.loading}>Loading products...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Products List</h2>
        <Link to="/products/add" style={styles.addLink}>
          + Add Product
        </Link>
      </div>
      
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.headerCell}>Product Name</th>
              <th style={styles.headerCell}>Stock</th>
              <th style={styles.headerCell}>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={styles.row}>
                <td style={styles.cell}>
                  <button 
                    onClick={() => handleProductClick(product)} 
                    style={styles.productButton}
                  >
                    {product.ProductName}
                  </button>
                </td>
                <td style={styles.cell}>{product.Quantity}</td>
                <td style={styles.cell}>${product.Price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDialog && (
        <ConfirmationDialog
          message="Are you sure you want to view the details?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#666'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px'
  },
  title: {
    margin: 0,
    fontSize: '24px',
    color: '#333'
  },
  addLink: {
    display: 'inline-block',
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#45a049'
    }
  },
  tableContainer: {
    overflowX: 'auto',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white'
  },
  headerRow: {
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #e9ecef'
  },
  headerCell: {
    padding: '16px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#495057',
    fontSize: '15px'
  },
  row: {
    borderBottom: '1px solid #e9ecef',
    ':hover': {
      backgroundColor: '#f8f9fa'
    }
  },
  cell: {
    padding: '16px',
    textAlign: 'left',
    verticalAlign: 'middle',
    color: '#212529'
  },
  productButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    padding: 0,
    textAlign: 'left',
    fontWeight: '500',
    fontSize: '15px',
    transition: 'color 0.2s',
    ':hover': {
      color: '#0056b3',
      textDecoration: 'underline'
    }
  }
};