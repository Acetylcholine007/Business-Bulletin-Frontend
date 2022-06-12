import { alpha } from "@mui/material/styles";
import { AddSharp, SearchSharp } from "@mui/icons-material";
import {
  InputAdornment,
  TextField,
  Tooltip,
  IconButton,
  Typography,
  Toolbar,
  Stack,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

const EnhancedTableToolbar = ({
  numSelected,
  tableTitle,
  callback,
  parentQuery,
  queryTarget,
  setQueryTarget,
  queryTargets,
  setParentQuery,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(parentQuery);
  }, []);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography
        sx={{ flex: "1" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {tableTitle}
      </Typography>

      {tableTitle === "Tags" ? (
        <Tooltip title="Add Tag">
          <IconButton onClick={callback}>
            <AddSharp />
          </IconButton>
        </Tooltip>
      ) : (
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            select
            value={queryTarget}
            onChange={(e) => {
              setQueryTarget(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Look for: </InputAdornment>
              ),
            }}
          >
            {queryTargets.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            value={query}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchSharp />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setParentQuery(query);
              }
            }}
            placeholder="Query"
          />
        </Stack>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
