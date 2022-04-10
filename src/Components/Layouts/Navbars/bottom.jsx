import {
  AccountCircle,
  Favorite,
  Home,
  Inventory,
  LocationOn,
  Notifications,
  ReceiptLong,
  Restore,
} from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const basePage = "admin";

const listNavigations = [
  {
    label: "Home",
    value: basePage,
    icon: <Home />,
  },
  {
    label: "History",
    value: basePage + "/history",
    icon: <ReceiptLong />,
  },
  {
    label: "Stock",
    value: basePage + "/stock",
    icon: <Inventory />,
  },
  {
    label: "My Account",
    value: basePage + "/account",
    icon: <AccountCircle />,
  },
];

const BottomNavbar = () => {
  const router = useRouter();
  const path = router.pathname;
  const [value, setValue] = useState(router.pathname?.substring(1) || "admin");

  const handleChange = (e, newValue) => {
    setValue(newValue);
    router.push(`/${newValue}`);
  };
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        {listNavigations.map((item, index) => (
          <BottomNavigationAction
            key={index}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavbar;
