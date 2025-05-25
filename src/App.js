import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import fiddleLeafFig from './assets/fiddleLeafFig.jpg';
import monstera from './assets/monstera.jpg';
import succulentMix from './assets/succulentMix.jpg';
import aloeVera from './assets/aloeVera.jpg';
import spiderPlant from './assets/spiderPlant.jpg';
import peaceLily from './assets/peaceLily.jpg';
import rubberPlant from './assets/rubberPlant.jpg';
import echeveria from './assets/echeveria.jpg';
import arecaPalm from './assets/arecaPalm.jpg';
import zzPlant from './assets/zzPlant.jpg';
import haworthia from './assets/haworthia.jpg';
import dracaena from './assets/dracaena.jpg';
import jadePlant from './assets/jadePlant.jpg';
import snakePlant from './assets/snakePlant.jpg';
import calathea from './assets/calathea.jpg';
import bostonFern from './assets/bostonFern.jpg';
import pothos from './assets/pothos.jpg';
import croton from './assets/croton.jpg';
import parlorPalm from './assets/parlorPalm.jpg';
import anthurium from './assets/anthurium.jpg';
import oxalis from './assets/oxalis.jpg';
import philodendron from './assets/philodendron.jpg';
import kalanchoe from './assets/kalanchoe.jpg';
import bananaPlant from './assets/bananaPlant.jpg';
import nurseryImage from './assets/Nursery.jpg';

const plantsData = [
  { id: 1, name: "Fiddle Leaf Fig", category: "Indoor", price: 30, img: fiddleLeafFig },
  { id: 2, name: "Snake Plant", category: "Indoor", price: 20, img: snakePlant },
  { id: 3, name: "Monstera", category: "Indoor", price: 25, img: monstera },
  { id: 4, name: "Succulent Mix", category: "Succulents", price: 15, img: succulentMix },
  { id: 5, name: "Aloe Vera", category: "Succulents", price: 18, img: aloeVera },
  { id: 6, name: "Spider Plant", category: "Air Purifiers", price: 22, img: spiderPlant },
  { id: 7, name: "Peace Lily", category: "Air Purifiers", price: 28, img: peaceLily },
  { id: 8, name: "Rubber Plant", category: "Indoor", price: 35, img: rubberPlant },
  { id: 9, name: "Echeveria", category: "Succulents", price: 12, img: echeveria },
  { id: 10, name: "Areca Palm", category: "Indoor", price: 40, img: arecaPalm },
  { id: 11, name: "ZZ Plant", category: "Air Purifiers", price: 26, img: zzPlant },
  { id: 12, name: "Haworthia", category: "Succulents", price: 10, img: haworthia },
  { id: 13, name: "Dracaena", category: "Indoor", price: 32, img: dracaena },
  { id: 14, name: "Jade Plant", category: "Succulents", price: 14, img: jadePlant },
  { id: 15, name: "Calathea", category: "Indoor", price: 29, img: calathea },
  { id: 16, name: "Boston Fern", category: "Air Purifiers", price: 21, img: bostonFern },
  { id: 17, name: "Pothos", category: "Indoor", price: 17, img: pothos },
  { id: 18, name: "Croton", category: "Indoor", price: 23, img: croton },
  { id: 19, name: "Parlor Palm", category: "Indoor", price: 30, img: parlorPalm },
  { id: 20, name: "Anthurium", category: "Indoor", price: 27, img: anthurium },
  { id: 21, name: "Oxalis", category: "Succulents", price: 13, img: oxalis },
  { id: 22, name: "Philodendron", category: "Indoor", price: 24, img: philodendron },
  { id: 23, name: "Kalanchoe", category: "Succulents", price: 16, img: kalanchoe },
  { id: 24, name: "Banana Plant", category: "Indoor", price: 36, img: bananaPlant },
];

function Header({ cartCount }) {
  return (
    <header style={styles.header}>
      <nav>
        <Link to="/" style={styles.navLink}>Landing</Link>{" | "}
        <Link to="/products" style={styles.navLink}>Products</Link>{" | "}
        <Link to="/cart" style={styles.navLink}>
          Cart 🛒 <span style={styles.cartCount}>{cartCount}</span>
        </Link>
      </nav>
    </header>
  );
}

function LandingPage() {
  return (
    <div style={styles.landing}>
      <div style={styles.overlay}>
        <div style={styles.overlayContent}>
          <h1 style={styles.landingTitle}>Paradise Nursery</h1>
          <p style={styles.landingText}>
            Discover a paradise of greenery. From elegant indoor plants to air purifiers, we have the perfect plant for every space.
          </p>
          <Link to="/products">
            <button style={styles.button}>Shop Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductListingPage({ plants, addToCart }) {
  const categories = [...new Set(plants.map((p) => p.category))];
  const [modalImage, setModalImage] = useState(null);

  const openModal = (img) => setModalImage(img);
  const closeModal = () => setModalImage(null);

  return (
    <div>
      {categories.map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <div style={styles.productsGrid}>
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => (
                <div key={plant.id} style={styles.productCard}>
                  <img
                    src={plant.img}
                    alt={plant.name}
                    style={styles.thumbnail}
                    onClick={() => openModal(plant.img)}
                  />
                  <h3>{plant.name}</h3>
                  <p>${plant.price.toFixed(2)}</p>
                  <button onClick={() => addToCart(plant)} style={styles.button}>
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
      {modalImage && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Plant Large" style={styles.modalImage} />
            <button onClick={closeModal} style={styles.modalCloseButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ShoppingCartPage({ cart, updateQuantity, removeFromCart }) {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCost = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>Total plants: {totalItems}</p>
      <p>Total cost: ${totalCost.toFixed(2)}</p>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      {cart.map((item) => (
        <div key={item.id} style={styles.cartItem}>
          <img src={item.img} alt={item.name} style={styles.thumbnailSmall} />
          <div style={{ flex: 1 }}>
            <h3>{item.name}</h3>
            <p>Unit Price: ${item.price.toFixed(2)}</p>
            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            <div>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                -
              </button>
              <span style={{ margin: "0 10px" }}>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <button onClick={() => removeFromCart(item.id)} style={{ marginTop: "10px", color: "red" }}>
              Delete
            </button>
          </div>
        </div>
      ))}
      <div style={{ marginTop: "20px" }}>
        <Link to="/products">
          <button style={{ ...styles.button, marginRight: "10px" }}>Continue Shopping</button>
        </Link>
        <button style={styles.button} onClick={() => alert("Checkout not implemented")}>
          Checkout
        </button>
      </div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (plant) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === plant.id);
      if (existing) {
        return prev.map((item) =>
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...plant, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <Header cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/products"
            element={<ProductListingPage plants={plantsData} addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <ShoppingCartPage
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
  },
  header: {
    padding: "15px",
    backgroundColor: "green",
    color: "white",
    textAlign: "center",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    margin: "0 10px",
  },
  cartCount: {
    backgroundColor: "white",
    color: "green",
    borderRadius: "50%",
    padding: "2px 8px",
    fontSize: "14px",
    verticalAlign: "middle",
  },
  landing: {
    position: "relative",
    width: "100%",
    height: "85vh",
    backgroundImage: `url(${nurseryImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "8px",
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlayContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    textAlign: "center",
    padding: "0 20px",
  },
  landingTitle: {
    fontSize: "3rem",
    marginBottom: "0.5rem",
  },
  landingText: {
    fontSize: "1.2rem",
    marginBottom: "1.5rem",
  },
  button: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "10px 15px",
    fontSize: "1rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
  productsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
  },
  productCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    width: "calc(33% - 10px)",
    boxSizing: "border-box",
    cursor: "pointer",
    textAlign: "center",
  },
  thumbnail: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
    padding: "10px 0",
  },
  thumbnailSmall: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "5px",
    marginRight: "15px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "90%",
    maxHeight: "90%",
    textAlign: "center",
  },
  modalImage: {
    maxWidth: "100%",
    maxHeight: "80vh",
  },
  modalCloseButton: {
    marginTop: "10px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default App;
