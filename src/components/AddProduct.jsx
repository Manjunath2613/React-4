import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { nanoid } from 'nanoid';

export default function AddProduct() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    ProductName: Yup.string().required('Required').min(3, 'Too short!'),
    Quantity: Yup.number().required('Required').min(1, 'Must be at least 1'),
    Price: Yup.number().required('Required').min(0.01, 'Must be > 0'),
    Description: Yup.string().required('Required').min(10, 'Too short!')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const newProduct = { ...values, id: nanoid() };
    const success = await addProduct(newProduct);
    setSubmitting(false);
    if (success) navigate('/products');
  };

  return (
    <div style={styles.container}>
      <h2>Add New Product</h2>
      <Formik
        initialValues={{ ProductName: '', Quantity: '', Price: '', Description: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={styles.form}>
            <div style={styles.formGroup}>
              <label>Product Name</label>
              <Field type="text" name="ProductName" style={styles.input} />
              <ErrorMessage name="ProductName" component="div" style={styles.error} />
            </div>

            <div style={styles.formGroup}>
              <label>Quantity</label>
              <Field type="number" name="Quantity" style={styles.input} />
              <ErrorMessage name="Quantity" component="div" style={styles.error} />
            </div>

            <div style={styles.formGroup}>
              <label>Price</label>
              <Field type="number" name="Price" step="0.01" style={styles.input} />
              <ErrorMessage name="Price" component="div" style={styles.error} />
            </div>

            <div style={styles.formGroup}>
              <label>Description</label>
              <Field as="textarea" name="Description" rows="4" style={styles.input} />
              <ErrorMessage name="Description" component="div" style={styles.error} />
            </div>

            <button type="submit" disabled={isSubmitting} style={styles.submitButton}>
              {isSubmitting ? 'Adding...' : 'Add Product'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  form: { maxWidth: '500px' },
  formGroup: { marginBottom: '15px' },
  input: { width: '100%', padding: '8px' },
  error: { color: 'red', fontSize: '14px' },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};