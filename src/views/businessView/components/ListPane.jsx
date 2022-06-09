import { ChevronLeftSharp, ChevronRightSharp } from "@mui/icons-material";
import {
  Card,
  Divider,
  IconButton,
  List,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const ListPane = ({ selectedIndex, setSelectedIndex, page, totalItems }) => {
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
        {[1, 2, 3, 4, 5, 6].map((business, index) => (
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
              <Typography variant="h5">{`Business ${business}`}</Typography>
              <Typography variant="h6">Business Tagline</Typography>
              <Divider />
              <Typography variant="p">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit obcaecati sit ullam odit consequuntur quia ex fuga
                accusamus, iure nemo repellendus maiores voluptatem! Molestiae
                aperiam nemo aliquam, vero expedita facilis!
              </Typography>
            </ListItemButton>
          </Card>
        ))}
      </List>
      <Stack direction="row" alignItems="center" justifyContent="space-evenly">
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
};

export default ListPane;
