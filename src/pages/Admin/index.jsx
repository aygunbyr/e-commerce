import { Link, Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import styles from "./styles.module.css";

function Admin() {
  return (
    <div>
      <nav>
        <ul className={`${styles["admin-menu"]}`}>
          <li>
            <Link to={`/admin`}>Home</Link>
          </li>
          <li>
            <Link to={`/admin/orders`}>Orders</Link>
          </li>
          <li>
            <Link to={`/admin/products`}>Products</Link>
          </li>
        </ul>
      </nav>

      <Box mt="10">
        <Outlet />
      </Box>
    </div>
  );
}

export default Admin;
