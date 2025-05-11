import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div style={styles.container}>
      <h2>Product Details</h2>
      <div style={styles.backLink}>
        <Link to="/products" style={styles.link}>← Back to Products</Link>
      </div>
      <div style={styles.details}>
        <h3 style={styles.title}>{product.ProductName}</h3>
        <p><strong>Description:</strong> {product.Description}</p>
        <p><strong>Quantity in Stock:</strong> {product.Quantity}</p>
        <p><strong>Price:</strong> ${product.Price.toFixed(2)}</p>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  backLink: { marginBottom: '20px' },
  link: { color: '#0066cc', textDecoration: 'none' },
  details: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '20px',
    maxWidth: '500px',
    backgroundColor: '#f9f9f9'
  },
  title: { marginTop: 0 }
};