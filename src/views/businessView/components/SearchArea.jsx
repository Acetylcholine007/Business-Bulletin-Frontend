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
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { businessActions } from "../../../store/slices/BusinessSlice";

const SearchArea = ({ searchAreaRef }) => {
  const { entity, tags, selectedTags, presentationTabIndex } = useSelector(
    (state) => state.business
  );
  const searchBoxRef = useRef();
  const dispatch = useDispatch();

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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch(businessActions.setQuery(searchBoxRef.current.value));
              }
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              dispatch(businessActions.setQuery(searchBoxRef.current.value));
              // searchBoxRef.current.value = "";
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
          onChange={(e) =>
            dispatch(businessActions.setEntity({ entity: e.target.value }))
          }
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
        {tags && (
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
    </Grid>
  );
};

export default SearchArea;
