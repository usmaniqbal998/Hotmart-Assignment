import {
  Card,
  Grid,
  Typography,
  CardContent,
  CardHeader,
  Avatar,
  Skeleton,
  CardMedia,
  Box,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PlaceholderImg from "../../assets/placeholder.png";

import { getProducts, getComments, getUsers } from "../../api";
import { lineHeight } from "@mui/system";

const ProductDetails = () => {
  let { productId } = useParams();
  const [product, setProduct] = useState({});
  const [productComments, setProductComments] = useState([]);
  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);
    getAllProducts();
  }, []);

  React.useEffect(() => {
    if (product.userId) {
      getUserByProductId();
    }
  }, [product]);

  const getAllProducts = async () => {
    try {
      const allProducts = await getProducts();
      const product = allProducts.find(
        (product) => product.id === parseInt(productId)
      );
      console.log(product);
      if (product) setProduct(product);
      getCommentsByProductId();
    } catch (error) {
      console.log(error); // error handling logic layer
      setLoading(false);
    }
  };

  const getCommentsByProductId = () => {
    getComments().then((comments) => {
      setProductComments(
        comments.filter((comment) => comment.productId === parseInt(productId))
      );
      setLoading(false);
    });
  };

  const getUserByProductId = () => {
    getUsers().then((users) => {
      setUser(users.find((user) => user.id === product.userId));
    });
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 4, color: "#333" }}>
        Product Details
      </Typography>
      <Grid container alignItems="center" justifyContent="center">
        <Card sx={{ minWidth: 345 }}>
          <CardHeader
            avatar={
              loading ? (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
              ) : (
                <Avatar>{user?.name?.charAt(0)?.toUpperCase()}</Avatar>
              )
            }
            title={
              loading ? (
                <Skeleton animation="wave" height={14} width="80%" />
              ) : (
                user.name
              )
            }
            subheader={
              loading ? (
                <Skeleton animation="wave" height={14} width="20%" />
              ) : (
                "@" + user.username
              )
            }
          />
          <CardMedia
            component="img"
            image={PlaceholderImg}
            alt="Paella dish"
            height={200}
            width={200}
          />
          <CardContent sx={{ maxWidth: 345 }}>
            <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
              {loading ? <Skeleton /> : product.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              {loading ? <Skeleton /> : product.body}
            </Typography>
          </CardContent>
          <TextField
            sx={{ width: "100%" }}
            id="outlined-textarea"
            placeholder="Add New Comment"
            variant="filled"
          />
          {productComments.map((comment) => (
            <Box
              key={comment.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                mt: 1,
                p: 1,
                width: 345,
              }}
            >
              <Avatar>{comment.email?.charAt(0)?.toUpperCase()}</Avatar>
              <Box
                sx={{
                  width: 270,
                }}
              >
                <Typography variant="body1">{comment.email}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {comment.body}
                </Typography>
              </Box>
            </Box>
          ))}
        </Card>
      </Grid>
    </>
  );
};

export default ProductDetails;
