import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import "./App.css";
import Profile from "./pages/Profile";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { loggedIn } = useAuth();

  return (
    <Router>
      <div>
        <Navbar />
        <div id="content">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route
              path="product/:product_id"
              exact
              element={<ProductDetail />}
            />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            {loggedIn ? <Route path="/profile" element={<Profile />} /> : null}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
