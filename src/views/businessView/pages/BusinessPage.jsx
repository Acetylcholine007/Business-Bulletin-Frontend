import {
  ChevronLeftSharp,
  ChevronRightSharp,
  SearchSharp,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  Typography,
  Toolbar,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import React from "react";
import { businessController } from "../controllers/businessController";

const BusinessPage = () => {
  const {
    selectedIndex,
    setSelectedIndex,
    tabIndex,
    setTabIndex,
    page,
    totalItems,
    setQuery,
    queryTarget,
    setQueryTarget,
    entity,
    changeEntity,
    displayMode,
    setDisplayMode,
    searchBoxRef,
  } = businessController();

  return (
    <Container
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <TextField
                inputRef={searchBoxRef}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchSharp />
                    </InputAdornment>
                  ),
                }}
                placeholder="Search"
              />
              <Button
                variant="contained"
                onClick={() => {
                  setQuery(searchBoxRef.current.value);
                  searchBoxRef.current.value = "";
                }}
              >
                Search
              </Button>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TextField
                size="small"
                select
                value={entity}
                onChange={(e) => changeEntity(e.target.value)}
              >
                {["Business", "Product", "Service"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                size="small"
                select
                value={queryTarget}
                onChange={(e) => setQueryTarget(e.target.value)}
              >
                {(entity === "Business"
                  ? ["Name", "Owner", "Product", "Service"]
                  : entity === "Product"
                  ? ["Name"]
                  : ["Name"]
                ).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Stack>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={displayMode}
              onChange={(e, val) => setDisplayMode(val)}
              variant="fullWidth"
            >
              <Tab label="List Mode" />
              <Tab label="Map Mode" />
            </Tabs>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
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
              paddingLeft: 1,
              paddingRight: 1,
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
                    accusamus, iure nemo repellendus maiores voluptatem!
                    Molestiae aperiam nemo aliquam, vero expedita facilis!
                  </Typography>
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
            <Typography variant="h6">{`Page ${page} of ${totalItems}`}</Typography>
            <IconButton onClick={() => {}}>
              <ChevronRightSharp />
            </IconButton>
          </Stack>
        </Grid>
        <Grid
          item
          xs={0}
          md={6}
          sx={{ height: "100%", display: { xs: "none", md: "block" } }}
        >
          <Card
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            elevation={4}
          >
            <Typography variant="h5">{`Business Name`}</Typography>
            <Typography variant="h6">Business Tagline</Typography>
            <Box sx={{ borderBottom: 1, borderTop: 1, borderColor: "divider" }}>
              <Tabs
                value={tabIndex}
                onChange={(e, val) => setTabIndex(val)}
                variant="fullWidth"
              >
                <Tab label="Products" />
                <Tab label="Services" />
              </Tabs>
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ height: "100%" }}>
                {tabIndex === 0 && (
                  <List>
                    {[1, 2, 3].map((item, index) => (
                      <ListItem alignItems="flex-start" key={index}>
                        <ListItemAvatar>
                          <Avatar alt="Product Image" src="url('')" />
                        </ListItemAvatar>
                        <ListItemText
                          primary="Product Name"
                          secondary={
                            <>
                              <Typography variant="p" color="text.primary">
                                Price: Php 100
                              </Typography>
                              <Typography variant="body2">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Fuga voluptatum molestiae
                                animi tempora fugit saepe optio, laborum ipsum
                                atque, dolore beatae maiores aspernatur dolor
                                impedit vitae illum nihil! Esse, pariatur!
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
                {tabIndex === 1 && (
                  <List>
                    {[1, 2, 3].map((item, index) => (
                      <ListItem alignItems="flex-start" key={index}>
                        <ListItemAvatar>
                          <Avatar alt="Product Image" src="url('')" />
                        </ListItemAvatar>
                        <ListItemText
                          primary="Service Name"
                          secondary={
                            <>
                              <Typography variant="p" color="text.primary">
                                Price: Php 100
                              </Typography>
                              <Typography variant="body2">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Fuga voluptatum molestiae
                                animi tempora fugit saepe optio, laborum ipsum
                                atque, dolore beatae maiores aspernatur dolor
                                impedit vitae illum nihil! Esse, pariatur!
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BusinessPage;
