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
    saveTagHandler,
    allowBusinessHandler,
    allowUserHandler,
    verifyBusinessHandler,
    deleteTagHandler,
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
              parentQuery={businessQuery}
              setParentQuery={setBusinessQuery}
              queryTarget={businessQueryTarget}
              setQueryTarget={setBusinessQueryTarget}
              queryTargets={["Name", "Address", "ContactNo."]}
              headCells={[
                {
                  id: "logoUri",
                  sortable: false,
                  label: "Brand",
                  align: "center",
                  type: "image",
                },
                {
                  id: "name",
                  sortable: true,
                  label: "Business Name",
                  align: "left",
                  type: "text",
                },
                {
                  id: "owner",
                  sortable: true,
                  label: "Business Owner",
                  align: "left",
                  type: "text",
                },
                {
                  id: "address",
                  sortable: true,
                  label: "Business Address",
                  align: "left",
                  type: "text",
                },
                {
                  id: "contactNo",
                  sortable: true,
                  label: "Business Contact",
                  align: "left",
                  type: "text",
                },
                {
                  id: "isVerified",
                  sortable: false,
                  label: "Verified",
                  align: "center",
                  type: "icon",
                },
                {
                  id: "status",
                  sortable: false,
                  label: "Status",
                  align: "center",
                  type: "icon",
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
              parentQuery={userQuery}
              queryTarget={userQueryTarget}
              setQueryTarget={setUserQueryTarget}
              setParentQuery={setUserQuery}
              queryTargets={[
                "First name",
                "Last name",
                "Address",
                "ContactNo.",
              ]}
              headCells={[
                {
                  id: "profileUri",
                  sortable: false,
                  label: "Profile Image",
                  align: "center",
                  type: "image",
                },
                {
                  id: "firstname",
                  sortable: true,
                  label: "First Name",
                  align: "left",
                  type: "text",
                },
                {
                  id: "lastname",
                  sortable: true,
                  label: "Last Name",
                  align: "left",
                  type: "text",
                },
                {
                  id: "address",
                  sortable: true,
                  label: "User Address",
                  align: "left",
                  type: "text",
                },
                {
                  id: "contactNo",
                  sortable: true,
                  label: "User Contact",
                  align: "left",
                  type: "text",
                },
                {
                  id: "isVerified",
                  sortable: false,
                  label: "Verified",
                  align: "center",
                  type: "icon",
                },
                {
                  id: "status",
                  sortable: false,
                  label: "Status",
                  align: "center",
                  type: "icon",
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
                  type: "text",
                },
                {
                  id: "action",
                  sortable: false,
                  label: "Action",
                  align: "center",
                  type: "button",
                  action: deleteTagHandler,
                },
              ]}
            />
          )}
        </Grid>
      </Grid>
      <TagEditorDialog
        open={tagDialogOpen}
        handleClose={closeTagHandler}
        saveHandler={saveTagHandler}
        selectedTag={selectedTag}
      />
      <BusinessViewerDialog
        open={businessDialogOpen}
        handleClose={closeBusinessHandler}
        allowHandler={allowBusinessHandler}
        verifyHandler={verifyBusinessHandler}
        selectedBusiness={selectedBusiness}
      />
      <UserViewerDialog
        open={userDialogOpen}
        handleClose={closeUserHandler}
        allowHandler={allowUserHandler}
        selectedUser={selectedUser}
      />
    </Container>
  );
};

export default DashboardPage;
