import { SearchSharp } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import React from "react";
import DetailsPane from "../components/DetailsPane";
import ListPane from "../components/ListPane";
import SearchArea from "../components/SearchArea";
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
    searchAreaRef,
    tags,
    selectedTags,
    setSelectedTags,
  } = businessController();

  return (
    <Container
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <SearchArea
        searchAreaRef={searchAreaRef}
        searchBoxRef={searchBoxRef}
        selectedTags={selectedTags}
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
        setQuery={setQuery}
        entity={entity}
        changeEntity={changeEntity}
        tags={tags}
      />
      <Grid
        container
        spacing={2}
        sx={{
          height: `calc(100% - ${
            searchAreaRef.current ? searchAreaRef.current.clientHeight : "177"
          }px)`,
          boxSizing: "border-box",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ListPane
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            page={page}
            totalItems={totalItems}
          />
        </Grid>
        <Grid
          item
          xs={0}
          md={6}
          sx={{
            height: "100%",
            display: { xs: "none", md: "block" },
          }}
        >
          <DetailsPane tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BusinessPage;
