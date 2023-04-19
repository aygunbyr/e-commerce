import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import "./App.css";
import Profile from "./pages/Profile";
import Basket from "./pages/Basket";
import { useAuth } from "./contexts/AuthContext";
import Error404 from "./pages/Error404";
import Admin from "./pages/Admin";
import AdminHome from "./pages/Admin/Home";
import AdminOrders from "./pages/Admin/Orders";
import AdminProducts from "./pages/Admin/Products";

function App() {
  const { loggedIn, user } = useAuth();

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
            {loggedIn && (
              <>
                <Route path="/basket" element={<Basket />} />
                <Route path="/profile" element={<Profile />} />
                {user?.role === "admin" && (
                  <Route path="/admin" element={<Admin />} admin={true}>
                    <Route index element={<AdminHome />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="products" element={<AdminProducts />} />
                  </Route>
                )}
              </>
            )}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
