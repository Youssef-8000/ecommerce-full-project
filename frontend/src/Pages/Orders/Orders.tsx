import { Box, Button, Grid, Icon } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";

function Orders({setIsAuthenticated}:any) {
  const baseURL = "http://localhost:5006";
  const userId = localStorage.getItem("userId");
  const [orders, setOrders] = useState<any>(undefined);
  const getOrdersFromUserID = () => {
    const path = `/api/order/${userId}`;
    axios.get(baseURL + path).then((response) => {
      setOrders(response.data.data);
    });
  };
  useEffect(() => {
    getOrdersFromUserID();
  }, []);

  const convertDate = (unformattedDate: string) => {
    const date = new Date(unformattedDate);
    const formattedDate = date.toLocaleDateString("en-US");
    return formattedDate;
  };

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
        <Box sx={{ fontSize: "2rem" }}>Orders</Box>
        <Box>You will find all your orders here!</Box>
      </Grid>
      {orders ? <Grid container justifyContent="center">
        {orders &&
          orders?.map((order: any, index: any) => {
            console.log(order);
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
                  <Box mb={"5px"}>{`Order ID: ${order._id}`}</Box>
                  <Box mb={"5px"}>
                    {`Order Date: ${convertDate(order.createdAt)}`}{" "}
                  </Box>
                  <Box>
                    <Box
                      mb={"7px"}
                      sx={{ fontSize: "1.25rem", textAlign: "center" }}
                    >
                      Purchased Products
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {order.productIds.length != 0 ? (
                        order.productIds.map((product: any, index: any) => {
                          return (
                            <Box width={"50%"}>
                              {
                                <CircleIcon
                                  sx={{ fontSize: "0.5rem", color: "blue" }}
                                ></CircleIcon>
                              }
                              {" " + product}
                            </Box>
                          );
                        })
                      ) : (
                        <Box>No Products???</Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
      </Grid>: <div style={{textAlign: "center"}}>API Has failed!</div>}
    </>
  );
}

export default Orders;
