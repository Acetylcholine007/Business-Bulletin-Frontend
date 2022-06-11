import { Container, Grid } from "@mui/material";
import React from "react";
import BusinessViewerDialog from "../components/BusinessViewerDialog";
import DashboardTable from "../components/DashboardTable";
import TagEditorDialog from "../components/TagEditorDialog";
import UserViewerDialog from "../components/UserViewerDialog";
import { dashboardController } from "../controllers/dashboardController";

const DashboardPage = () => {
  const {
    businesses,
    users,
    tags,
    businessPage,
    setBusinessPage,
    userPage,
    setUserPage,
    businessTotalItems,
    userTotalItems,
    businessQuery,
    setBusinessQuery,
    userQuery,
    setUserQuery,
    businessQueryTarget,
    setBusinessQueryTarget,
    userQueryTarget,
    setUserQueryTarget,
    businessDialogOpen,
    userDialogOpen,
    tagDialogOpen,
    setTagDialogOpen,
    selectedBusiness,
    selectBusinessHandler,
    selectedUser,
    selectUserHandler,
    selectedTag,
    selectTagHandler,
    closeUserHandler,
    closeBusinessHandler,
    closeTagHandler,
  } = dashboardController();

  return (
    <Container sx={{ height: "100%" }}>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          sx={{ height: "50%", display: "flex", flexDirection: "column" }}
        >
          {businesses && (
            <DashboardTable
              tableTitle="Businesses"
              rows={businesses}
              page={businessPage - 1}
              setPage={setBusinessPage}
              count={businessTotalItems}
              selectHandler={selectBusinessHandler}
              headCells={[
                {
                  id: "logoUri",
                  sortable: false,
                  label: "Brand",
                  align: "center",
                  image: true,
                },
                {
                  id: "name",
                  sortable: true,
                  label: "Business Name",
                  align: "left",
                  image: false,
                },
                {
                  id: "owner",
                  sortable: true,
                  label: "Business Owner",
                  align: "left",
                  image: false,
                },
                {
                  id: "address",
                  sortable: true,
                  label: "Business Address",
                  align: "left",
                  image: false,
                },
                {
                  id: "contactNo",
                  sortable: true,
                  label: "Business Contact",
                  align: "left",
                  image: false,
                },
                {
                  id: "isVerified",
                  sortable: false,
                  label: "Verified",
                  align: "center",
                  image: false,
                  button: true,
                  action: (val) => {
                    console.log(!val);
                  },
                },
                {
                  id: "status",
                  sortable: false,
                  label: "Status",
                  align: "center",
                  image: false,
                  button: true,
                  action: (val) => {
                    console.log(!val);
                  },
                },
              ]}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ height: "50%", display: "flex", flexDirection: "column" }}
        >
          {users && (
            <DashboardTable
              tableTitle="Users"
              rows={users}
              page={userPage - 1}
              setPage={setUserPage}
              count={userTotalItems}
              selectHandler={selectUserHandler}
              headCells={[
                {
                  id: "profileUri",
                  sortable: false,
                  label: "Profile Image",
                  align: "center",
                  image: true,
                },
                {
                  id: "firstname",
                  sortable: true,
                  label: "First Name",
                  align: "left",
                  image: false,
                },
                {
                  id: "lastname",
                  sortable: true,
                  label: "Last Name",
                  align: "left",
                  image: false,
                },
                {
                  id: "address",
                  sortable: true,
                  label: "User Address",
                  align: "left",
                  image: false,
                },
                {
                  id: "contactNo",
                  sortable: true,
                  label: "User Contact",
                  align: "left",
                  image: false,
                },
                {
                  id: "status",
                  sortable: false,
                  label: "Status",
                  align: "center",
                  image: false,
                  button: true,
                  action: (val) => {
                    console.log(!val);
                  },
                },
              ]}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ height: "50%", display: "flex", flexDirection: "column" }}
        >
          {tags && (
            <DashboardTable
              tableTitle="Tags"
              rows={tags}
              page={0}
              setPage={(e) => {}}
              count={tags.length}
              selectHandler={selectTagHandler}
              callback={setTagDialogOpen}
              fullList
              headCells={[
                {
                  id: "name",
                  sortable: true,
                  label: "Name",
                  align: "left",
                  image: false,
                },
                {
                  id: "action",
                  sortable: false,
                  label: "Action",
                  align: "center",
                  image: false,
                  button: true,
                  action: (val) => {
                    console.log(val);
                  },
                },
              ]}
            />
          )}
        </Grid>
      </Grid>
      <TagEditorDialog
        open={tagDialogOpen}
        handleClose={closeTagHandler}
        saveHandler={(type, val) => {
          console.log(type, val);
        }}
        selectedTag={selectedTag}
      />
      <BusinessViewerDialog
        open={businessDialogOpen}
        handleClose={closeBusinessHandler}
        allowHandler={() => {}}
        verifiedHandler={() => {}}
        selectedBusiness={selectedBusiness}
      />
      <UserViewerDialog
        open={userDialogOpen}
        handleClose={closeUserHandler}
        allowHandler={() => {}}
        verifiedHandler={() => {}}
        selectedUser={selectedUser}
      />
    </Container>
  );
};

export default DashboardPage;
