import { Avatar, Card, CardHeader } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import RedeemIcon from "@mui/icons-material/Redeem";

const UserCard = ({
  name,
  username,
  email,
  id,
  products,
  active,
  onUserSelected,
}) => {
  return (
    <Ucard
      sx={{
        "&:hover": { cursor: "pointer" },
      }}
      active={active}
      onClick={() => onUserSelected(id)}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">{name.charAt(0).toUpperCase()}</Avatar>
        }
        action={
          <BadgeBox>
            <RedeemIcon sx={{ mr: 1, color: "#fff", fontSize: 12 }} />{" "}
            <Badge>{products.length}</Badge>
          </BadgeBox>
        }
        title={name}
        subheader={"@" + username}
      />
    </Ucard>
  );
};

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

const Ucard = styled(Card)((props) => ({
  backgroundColor: props.active ? "#f1f1f1" : "#fff",
  "&:hover": { cursor: "pointer", backgroundColor: "#f1f1f1" },
  border: props.active && "1px solid #eee",
}));

export default UserCard;
