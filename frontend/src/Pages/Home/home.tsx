import { Box, Button, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function home() {
  const baseURL = "http://localhost:5002";
  const [products, setProducts] = useState<any>(undefined);
  const getProducts = () => {
    console.log("entered")
    const path = `/api/products`;
    axios.get(baseURL + path).then((response) => {
      setProducts(response.data.data);
      console.log(response.data.data)
    });
  };
  useEffect(() => {
    getProducts();
  }, []);

  const navigate = useNavigate();

  const addToCart = (product:any) => {
    console.log("product", product)
    const path = `/api/cart`;
    const data = {
      userId: localStorage.getItem("userId"),
      price: product.price,
      productId:product._id
    }
    const localStorageData = {
      product:product
    }
    axios.post("http://localhost:5001" + path, data).then((response) => {
      console.log(response)
      const dataString = JSON.stringify(localStorageData);
      localStorage.setItem("Cart", dataString)
      navigate("/Cart");
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
        <Box sx={{ fontSize: "2rem" }}>Products</Box>
        <Box>You will find all the Products you need here!</Box>
      </Grid>
      {products? <Grid container justifyContent="center">
        {products &&
          products?.map((product: any, index: any) => {
            console.log(product);
            return (
              <Grid
                item
                lg={3}
                md={3}
              >
                <Box margin={"7px"} sx={{
                  background: "#cccccc",
                  borderRadius: "14px",
                  padding: "14px",
                  height: "80%"
                }}>
                  <Box mb={"5px"}>{`Product Name: ${product.name}`}</Box>
                  <Box mb={"5px"}>{`Product Price: ${product.price}`}</Box>
                  <Box mb={"5px"}>{`Product description: ${product.description}`}</Box>
                  <Button variant="contained" onClick={() => addToCart(product)}>Order Now</Button>
                </Box>
              </Grid>
            );
          })}
      </Grid>: <div style={{textAlign: "center"}}>API Has failed!</div>}
    </>
  )
}

export default home