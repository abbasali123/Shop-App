import React, { useState, useEffect } from 'react'
import Button from "@material-ui/core/Button";

function UserCartBlock(props) {


    const renderCartItems = () => {
        const serverUrl = require('../../../Config')
        return (
            props.product && props.product.map(item =>
                (
                    <tr key={item._id}>
                        <td>
                            <img style={{ width: "70px", }} alt="product" src={serverUrl.serverUrl + '/' + item.images[0]} />
                        </td>
                        <td>{item.quantity} EA</td>
                        <td>$ {item.price}</td>
                        <td>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                // className={classes.button}
                                onClick={() => props.removeItem(item._id)}
                                style={{ borderRadius: 20 }}
                                color="secondary"
                            >
                                Remove
                    </Button>
                        </td>
                    </tr>
                )
            )
        )

        // const serverUrl = require('../../../Config')

    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCartItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCartBlock
