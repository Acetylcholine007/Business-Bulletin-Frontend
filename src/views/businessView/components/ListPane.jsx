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
import { useDispatch, useSelector } from "react-redux";
import { businessActions } from "../../../store/slices/BusinessSlice";

const ListPane = () => {
  const { selectedIndex, page, totalItems, businesses } = useSelector(
    (state) => state.business
  );
  const dispatch = useDispatch();

  if (businesses) {
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
                onClick={() =>
                  dispatch(businessActions.setSelectedIndex(index))
                }
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
