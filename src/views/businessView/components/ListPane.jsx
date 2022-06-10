import { ChevronLeftSharp, ChevronRightSharp } from "@mui/icons-material";
import {
  Card,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const ListPane = ({
  selectedIndex,
  setSelectedIndex,
  page,
  totalItems,
  businesses,
}) => {
  if (businesses.length !== null) {
    return (
      <>
        <List
          disablePadding
          sx={{
            height: "100%",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          {businesses.map((business, index) => (
            <Card sx={{ marginBottom: 2 }} key={index} elevation={4}>
              <ListItemButton
                sx={{
                  display: "block",
                  "&.Mui-selected": {
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: 1,
                  },
                }}
                selected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
              >
                <Typography variant="h5">{business.name}</Typography>
                <Typography variant="h6">{`${business.owner.firstname} ${business.owner.lastname}`}</Typography>
                <Divider />
                <Typography variant="p">{business.description}</Typography>
              </ListItemButton>
            </Card>
          ))}
        </List>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <IconButton onClick={() => {}}>
            <ChevronLeftSharp />
          </IconButton>
          <Typography variant="body1">{`Page ${page} of ${totalItems}`}</Typography>
          <IconButton onClick={() => {}}>
            <ChevronRightSharp />
          </IconButton>
        </Stack>
      </>
    );
  } else {
    return <CircularProgress />;
  }
};

export default ListPane;
