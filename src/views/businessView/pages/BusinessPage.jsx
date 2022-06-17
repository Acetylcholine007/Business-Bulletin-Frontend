import {
  Container,
  Grid,
  Card,
  CardHeader,
  ButtonGroup,
  Button,
  CardContent,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBusinesses,
  initializePage,
} from "../../../store/actions/businessActions";
import { businessActions } from "../../../store/slices/BusinessSlice";
import DetailsPane from "../components/DetailsPane";
import ListPane from "../components/ListPane";
import MapPane from "../components/MapPane";
import SearchArea from "../components/SearchArea";

const BusinessPage = () => {
  const dispatch = useDispatch();
  const searchAreaRef = useRef();
  const {
    query,
    page,
    queryTarget,
    entity,
    presentationTabIndex,
    initialized,
  } = useSelector((state) => state.business);

  useEffect(() => {
    dispatch(initializePage(query, page, queryTarget, entity));
  }, []);

  useEffect(() => {
    if (initialized) {
      dispatch(fetchBusinesses(query, page, queryTarget, entity));
    }
  }, [entity, page, query, queryTarget]);

  return (
    <Container
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <SearchArea searchAreaRef={searchAreaRef} />
      <Grid
        container
        spacing={2}
        sx={{
          paddingTop: 2,
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
          <Card
            elevation={4}
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardHeader
              sx={{ backgroundColor: "primary.light" }}
              title="Businesses"
              action={
                <ButtonGroup
                  variant="outlined"
                  sx={{ backgroundColor: "white" }}
                >
                  <Button
                    variant={
                      presentationTabIndex === 0 ? "contained" : "outlined"
                    }
                    onClick={() =>
                      dispatch(businessActions.setPresentationTabIndex(0))
                    }
                  >
                    List
                  </Button>
                  <Button
                    variant={
                      presentationTabIndex === 1 ? "contained" : "outlined"
                    }
                    onClick={() =>
                      dispatch(businessActions.setPresentationTabIndex(1))
                    }
                  >
                    Map
                  </Button>
                </ButtonGroup>
              }
            />
            <CardContent
              sx={{
                p: presentationTabIndex === 0 ? 2 : 0,
                paddingBottom: "0px !important",
                flexGrow: 1,
              }}
            >
              {presentationTabIndex === 0 && <ListPane />}
              {presentationTabIndex === 1 && <MapPane />}
            </CardContent>
          </Card>
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
          <DetailsPane />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BusinessPage;
