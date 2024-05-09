import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";
import { sendCartData } from "./store/cart-slice";

let isFirstRender = true
function App() {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  useEffect(() => {
    if(isFirstRender) {
      isFirstRender = false
      return
    }
    dispatch(sendCartData(cart))
  }, [cart, dispatch])

  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message} />}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
