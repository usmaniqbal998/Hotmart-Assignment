import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { getUsers, getProducts } from "../../api";
import Loader from "../loader";
import ProductCard from "../Products/ProductCard";
import UserCard from "./UserCard";
import { useNavigate } from "react-router";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setLoading(true);
    getAllUsersAndProducts();
  }, []);

  const getAllUsersAndProducts = async () => {
    try {
      const users_products = await Promise.all([getUsers(), getProducts()]);
      setUsers(users_products[0]);
      setProducts(users_products[1]);
      setLoading(false);
      setSelectedUser(users_products[0][0].id);
    } catch (error) {
      console.log(error); // error handling logic layer
      setLoading(false);
    }
  };

  const getProductsById = (id) => {
    console.log(products.length);
    if (products) return products.filter((product) => product.userId === id);
    else return [];
  };

  const getSelectedUserName = () => {
    const user = users.find((el) => el.id === selectedUser);
    if (user) {
      return user.name;
    }
    return "";
  };

  const userSelectedCallback = (id) => {
    setSelectedUser(id);
  };

  const onProductClickedCallback = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 4, color: "#333" }}>
        All Users
      </Typography>

      <Grid container spacing={2}>
        {loading
          ? Array.from(Array(4).keys()).map((n) => (
              <Grid key={n} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <Loader />
              </Grid>
            ))
          : users.map((user) => (
              <Grid key={user.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <Box>
                  <UserCard
                    id={user.id}
                    products={getProductsById(user.id)}
                    name={user.name}
                    username={user.username}
                    email={user.email}
                    active={selectedUser === user.id}
                    onUserSelected={userSelectedCallback}
                  />
                </Box>
              </Grid>
            ))}
      </Grid>

      <Typography variant="h4" sx={{ mt: 4, mb: 4, color: "#333" }}>
        Products by{" "}
        <span style={{ textDecoration: "underline" }}>
          {getSelectedUserName()}
        </span>
      </Typography>

      <Grid container spacing={2}>
        {getProductsById(selectedUser).map((product) => (
          <Grid
            alignItems="stretch"
            key={product.id}
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
          >
            <Box>
              <ProductCard
                id={product.id}
                title={product.title}
                body={product.body}
                userId={product.userId}
                onProductClicked={onProductClickedCallback}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Users;
