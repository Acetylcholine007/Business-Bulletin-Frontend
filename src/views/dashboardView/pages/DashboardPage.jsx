import { Container, Grid } from "@mui/material";
import React from "react";
import DashboardTable from "../components/DashboardTable";

const DashboardPage = () => {
  return (
    <Container sx={{ height: "100%" }}>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          sx={{ height: "50%", display: "flex", flexDirection: "column" }}
        >
          <DashboardTable tableTitle="Businesses" />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ height: "50%", display: "flex", flexDirection: "column" }}
        >
          <DashboardTable tableTitle="Users" />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ height: "50%", display: "flex", flexDirection: "column" }}
        >
          <DashboardTable tableTitle="Tags" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
