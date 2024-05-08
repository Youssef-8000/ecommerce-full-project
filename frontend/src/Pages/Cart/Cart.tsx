import { Box, Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [error, setError] = useState<any>(false);
  const storedDataString: any = localStorage.getItem("Cart");
  const storedData = JSON.parse(storedDataString);
  console.log(storedData);
  const PaymentLogic = (Cart:any) => {
    console.log("Cart", Cart)
    const path = `/api/payment/${localStorage.getItem("userId")}`;
    const data = {
      userId: localStorage.getItem("userId"),
      total: parseInt(Cart.price),
    }
    const orderData = {
      userId: localStorage.getItem("userId"),
      productIds: parseInt(Cart.name),
    }
    console.log(data)
    axios.post("http://localhost:5003" + path, data).then((response) => {
      console.log("Payment",response)
      axios.post("http://localhost:5006/order",orderData).then((response) => {
        console.log("Orders",response)
        navigate("/Orders");
      }).catch((error)=>{
        console.log(error)
        setError("Orders is Down")
      });
    }).catch((error)=>{
      console.log(error)
      setError("Payment is Down")
    });
    
  }
  return (
    <>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: "14px",
        }}
      >
        <Box sx={{ fontSize: "2rem" }}>Cart</Box>
        <Box>You will find all of your Carts here!</Box>
      </Grid>
      {storedData.product ? <Grid container justifyContent="center">
        {storedData.product && (
          <Grid item lg={3} md={3}>
            <Box
              margin={"7px"}
              sx={{
                background: "#cccccc",
                borderRadius: "14px",
                padding: "14px",
                height: "80%",
              }}
            >
              <Box mb={"5px"}>{`Product Name: ${storedData.product.name}`}</Box>
              <Box mb={"5px"}>{`Product Price: ${storedData.product.price}`}</Box>
              <Box
                mb={"5px"}
              >{`Product description: ${storedData.product.description}`}</Box>
              <Button variant="contained" onClick={() => PaymentLogic(storedData.product)}>
                Pay Now
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>:<div style={{textAlign: "center"}}>API Has failed!</div>}
      {error && <div style={{ width: "fit-content", margin: "auto" }}>service {`${error}`}</div>}
    </>
  );
}

export default Cart;
