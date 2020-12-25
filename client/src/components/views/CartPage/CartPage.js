import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem } from "../../../_actions/user_actions";
import UserCartBlock from "./Sections/UserCartBlock";
import { Result, Empty } from "antd";
import Axios from "axios";

function CartPage(props) {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0)
  const [showTotal, setshowTotal] = useState(false)
  const [showSuccess, setshowScuccess] = useState(false)
  useEffect(() => {
    let cartItems = [];
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, props.user.userData.cart));
        console.log(props.user.cartDetail)
      }
    }

  }, [props.user.userData]);

  useEffect(() => {
    if (props.user.cartDetail && props.user.cartDetail.length > 0) {
      console.log(props.user.cartDetail)
      calculateTotalPrice(props.user.cartDetail)
    }
  }, [props.user.cartDetail, Total])

  const calculateTotalPrice = (cartDetail) => {
    let total = 0
    cartDetail.map(item => (
      total += parseInt(item.price, 10) * item.quantity
    ))

    setTotal(total)
    console.log(total)
    setshowTotal(true)
  }

  const reomveFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then(() => {
      Axios.get('/api/users/userCartInfo').then((response) => {
        console.log(response)
        if (response.data.success) {
          if (response.data.cartDetail.length <= 0) {
            setshowTotal(false)
          } else {
            calculateTotalPrice(response.data.cartDetail)
          }
        } else {
          alert('failed to get cart Item')
        }
      })
    })
  }
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        <UserCartBlock
          product={props.user.cartDetail}
          removeItem={reomveFromCart}
        />


        {
          showTotal ?
            <div style={{ marginTop: "3rem" }}>
              <h2>Total Amount: $ {Total}</h2>
            </div>
            :

            showSuccess ? <Result
              status="success"
              title="Successfully Purchased Items"
            />
              :
              <div style={{ display: "flex", width: "100%", flexDirection: "column", justifyContent: "center" }}>
                <br />
                <Empty
                  description={false}
                />
                <p>No Items in the Cart</p>
              </div>
        }


      </div>
    </div>
  )
}

export default CartPage;
