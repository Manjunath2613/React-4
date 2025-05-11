import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <ul style={styles.list}>
        <li>
          <Link to="/" style={styles.link}>About</Link>
        </li>
        <li>
          <Link to="/products" style={styles.link}>Products</Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: { 
    backgroundColor: '#333',
    padding: '15px',
    marginBottom: '20px'
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: 0,
    padding: 0
  },
  link: { 
    color: 'white',
    textDecoration: 'none'
  }
};