import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
/*import CreateOrder from './components/CreateOrder';
import MyOrders from './components/MyOrders';
import OrderDetails from './components/OrderDetails';
import AssignedOrders from './components/AssignedOrders';*/
/*<Route path="/create-order" element={<CreateOrder />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/order-details/:orderId" element={<OrderDetails />} />
          <Route path="/assigned-orders" element={<AssignedOrders />} />    </Routes>*/
function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
