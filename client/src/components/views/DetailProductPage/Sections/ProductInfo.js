import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";
import Button from "@material-ui/core/Button";

function ProductInfo(props) {
  const [product, setproduct] = useState([]);
  useEffect(() => {
    setproduct(props.detail);
  }, [props.detail]);

  const addToCartHandler = () => {
    props.addToCart(props.detail._id);
  };
  return (
    <div>
      <Descriptions title="Product info">
        <Descriptions.Item label="Price">{product.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{product.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{product.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {product.description}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          // className={classes.button}
          onClick={addToCartHandler}
          style={{ borderRadius: 20 }}
          color="secondary"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
