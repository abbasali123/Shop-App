import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { addToCart } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

function DetailProductPage(props) {
  const dispatch = useDispatch();
  const [product, setproduct] = useState([]);
  useEffect(() => {
    const productId = props.match.params.productId;
    Axios.get(`/api/product/product_by_Id?id=${productId}&type=single`).then(
      (response) => {
        setproduct(response.data[0]);
      }
    );
  }, []);

  const addToCartHandler = (productId) => {
    dispatch(addToCart(productId));
  };
  return (
    <div className="postPage" style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{product.title}</h1>
      </div>
      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <ProductImage detail={product} />
        </Col>

        <Col lg={12} xs={24}>
          <ProductInfo detail={product} addToCart={addToCartHandler} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
