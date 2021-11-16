import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import SmsIcon from "@mui/icons-material/Sms";
import { getComments, getUsers } from "../../api";

const ProductCard = ({ title, body, id, userId, onProductClicked }) => {
  const [productComments, setProductComments] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getCommentsByProductId();
    getUserById(userId);
  }, []);

  const getCommentsByProductId = () => {
    getComments().then((comments) => {
      setProductComments(
        comments.filter((comment) => comment.productId === id)
      );
    });
  };

  const getUserById = (uId) => {
    getUsers().then((users) => {
      const _user = users.find((user) => user.id === uId);
      setUser(_user);
    });
  };

  return (
    <Pcard
      sx={{
        "&:hover": { cursor: "pointer" },
      }}
      onClick={() => onProductClicked(id)}
    >
      <CardHeader
        action={
          <BadgeBox>
            <SmsIcon sx={{ mr: 1, color: "#fff", fontSize: 12 }} />{" "}
            <Badge>{productComments.length}</Badge>
          </BadgeBox>
        }
        title={title}
        subheader={user.username ? "@" + user.username : ""}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Pcard>
  );
};

const Pcard = styled(Card)((props) => ({
  backgroundColor: "#fff",
  height: "100%",
}));

const Badge = styled("p")({
  fontSize: "13px",
  color: "#fff",
  fontWeight: 600,
  fontFamily: "Poppins",
});

const BadgeBox = styled("div")({
  padding: "0px 8px",
  height: "20px",
  borderRadius: "4px",
  backgroundColor: "rgb(109 54 244)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default ProductCard;
