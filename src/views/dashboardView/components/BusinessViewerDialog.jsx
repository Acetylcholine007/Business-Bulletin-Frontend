import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function BusinessViewerDialog({
  open,
  handleClose,
  selectedBusiness,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={true}
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Business Viewer</DialogTitle>
      {selectedBusiness && (
        <DialogContent sx={{minHeight: '50vh'}}>
          <Typography variant="h5">{selectedBusiness.name}</Typography>
          <Typography variant="h6">{selectedBusiness.description}</Typography>
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
          <CardContent sx={{ flexGrow: 1, overflowY: "auto" }}>
            {tabIndex === 0 && (
              <List>
                {selectedBusiness.products.map((product, index) => (
                  <ListItem alignItems="flex-start" key={index}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Product Image"
                        src={`url('${product.imagesUri[0]}')`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={product.name}
                      secondary={
                        <>
                          <Typography variant="p" color="text.primary">
                            {product.price}
                          </Typography>
                          <Typography component={"div"} variant="body2">
                            {product.description}
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
                {selectedBusiness.services.map((service, index) => (
                  <ListItem alignItems="flex-start" key={index}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Product Image"
                        src={`url('${service.imagesUri[0]}')`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={service.name}
                      secondary={
                        <>
                          <Typography variant="p" color="text.primary">
                            {service.price}
                          </Typography>
                          <Typography component={"div"} variant="body2">
                            {service.description}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </DialogContent>
      )}
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          UNVERIFY
        </Button>
        <Button onClick={handleClose} autoFocus>
          BAN
        </Button>
      </DialogActions>
    </Dialog>
  );
}
