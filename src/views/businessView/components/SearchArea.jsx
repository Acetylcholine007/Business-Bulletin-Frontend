import { SearchSharp } from "@mui/icons-material";
import {
  Box,
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

const SearchArea = ({
  searchAreaRef,
  searchBoxRef,
  selectedTags,
  displayMode,
  setDisplayMode,
  setQuery,
  entity,
  changeEntity,
  tags
}) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ boxSizing: "border-box" }}
      ref={searchAreaRef}
    >
      <Grid item xs={12} align="center">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
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
            placeholder="Query"
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
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          size="small"
          select
          fullWidth
          value={entity}
          onChange={(e) => changeEntity(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Looking for: </InputAdornment>
            ),
          }}
        >
          {["Business", "Product", "Service"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={9}>
        {entity === "Business" && (
          <Autocomplete
            sx={{ flexGrow: 1 }}
            multiple
            size="small"
            options={tags}
            getOptionLabel={(option) => option.name}
            defaultValue={selectedTags}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Tags"
                size="small"
                fullWidth
              />
            )}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={displayMode}
            onChange={(e, val) => setDisplayMode(val)}
            variant="fullWidth"
          >
            <Tab label="List View" />
            <Tab label="Map View" />
          </Tabs>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SearchArea;
