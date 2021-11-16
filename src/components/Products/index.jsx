import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { getProducts, getComments } from "../../api";
import Loader from "../loader";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setLoading(true);
    getAllProductsAndComments();
  }, []);

  const getAllProductsAndComments = async () => {
    try {
      const products_comments = await Promise.all([
        getProducts(),
        getComments(),
      ]);
      const allProducts = products_comments[0];
      const allComments = products_comments[1];
      sortProductsByComments(allProducts, allComments); //sort by comments

      setProducts(allProducts);
      setLoading(false);
    } catch (error) {
      console.log(error); // error handling logic layer
      setLoading(false);
    }
  };

  const sortProductsByComments = (allProducts, allComments) => {
    allProducts.sort((prodA, prodB) => {
      if (
        getCommentsByProductId(prodA, allComments).length >
        getCommentsByProductId(prodB, allComments).length
      )
        return -1;
      if (
        getCommentsByProductId(prodA, allComments).length <
        getCommentsByProductId(prodB, allComments).length
      )
        return 1;

      return 0;
    });
  };

  const getCommentsByProductId = (id, allComments) => {
    return allComments.filter((comment) => comment.productId === id);
  };

  const onProductClickedCallback = (id) => {
    navigate(`${id}`);
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 4, color: "#333" }}>
        All Products
      </Typography>

      <Grid container spacing={2}>
        {loading
          ? Array.from(Array(4).keys()).map((n) => (
              <Grid key={n} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <Loader />
              </Grid>
            ))
          : products.map((product) => (
              <Grid key={product.id} item xs={12} sm={12} md={6} lg={4}>
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

export default Products;
