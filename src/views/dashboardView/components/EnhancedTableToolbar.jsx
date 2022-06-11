import PropTypes from "prop-types";
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

const EnhancedTableToolbar = ({ numSelected, tableTitle, callback }) => {
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
            value={"Business"}
            onChange={(e) => {}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Look for: </InputAdornment>
              ),
            }}
          >
            {["Business", "Product", "Service"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
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
        </Stack>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
