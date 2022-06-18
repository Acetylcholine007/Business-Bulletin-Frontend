import { Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  allowBusiness,
  allowUser,
  deleteTag,
  fetchBusinesses,
  fetchUsers,
  initializePage,
  saveTag,
  verifyBusiness,
} from "../../../store/actions/dashboardActions";
import { dashboardActions } from "../../../store/slices/DashboardSlice";
import BusinessViewerDialog from "../components/BusinessViewerDialog";
import DashboardTable from "../components/DashboardTable";
import TagEditorDialog from "../components/TagEditorDialog";
import UserViewerDialog from "../components/UserViewerDialog";

const DashboardPage = () => {
  const {
    initialized,
    businesses,
    users,
    tags,
    businessPage,
    userPage,
    businessTotalItems,
    userTotalItems,
    businessQuery,
    userQuery,
    businessQueryTarget,
    userQueryTarget,
    isShowBusinessDialog,
    isShowUserDialog,
    isShowTagDialog,
    selectedTag,
    selectedUser,
    selectedBusiness,
  } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializePage("", 1, ""));
  }, []);

  useEffect(() => {
    if (initialized) {
      dispatch(fetchBusinesses(businessQuery, businessPage, businessQueryTarget));
    }
  }, [businessPage, businessQuery, businessQueryTarget]);

  useEffect(() => {
    if (initialized) {
      dispatch(fetchUsers(userQuery, userPage, userQueryTarget));
    }
  }, [userPage, userQuery, userQueryTarget]);

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
              setPage={(val) => dispatch(dashboardActions.setBusinessPage(val))}
              count={businessTotalItems}
              selectHandler={(val) =>
                dispatch(
                  dashboardActions.setSelectedBusiness({
                    business: val,
                    status: true,
                  })
                )
              }
              parentQuery={businessQuery}
              setParentQuery={(val) =>
                dispatch(dashboardActions.setBusinessQuery(val))
              }
              queryTarget={businessQueryTarget}
              setQueryTarget={(val) =>
                dispatch(dashboardActions.setBusinessQueryTarget(val))
              }
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
              setPage={(val) => dispatch(dashboardActions.setUserPage(val))}
              count={userTotalItems}
              selectHandler={(val) =>
                dispatch(
                  dashboardActions.setSelectedUser({ user: val, status: true })
                )
              }
              parentQuery={userQuery}
              queryTarget={userQueryTarget}
              setQueryTarget={(val) =>
                dispatch(dashboardActions.setUserQueryTarget(val))
              }
              setParentQuery={(val) =>
                dispatch(dashboardActions.setUserQuery(val))
              }
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
              selectHandler={(val) =>
                dispatch(
                  dashboardActions.setSelectedTag({ tag: val, status: true })
                )
              }
              callback={() => dispatch(dashboardActions.setShowTagDialog(true))}
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
                  action: (tagId) => dispatch(deleteTag(tagId)),
                },
              ]}
            />
          )}
        </Grid>
      </Grid>
      <TagEditorDialog
        open={isShowTagDialog}
        handleClose={() =>
          dispatch(
            dashboardActions.setSelectedTag({ tag: null, status: false })
          )
        }
        saveHandler={(tagId, name) => dispatch(saveTag(tagId, name))}
        selectedTag={selectedTag}
      />
      <BusinessViewerDialog
        open={isShowBusinessDialog}
        handleClose={() =>
          dispatch(
            dashboardActions.setSelectedBusiness({ tag: null, status: false })
          )
        }
        allowHandler={(status, businessId) =>
          dispatch(allowBusiness(status, businessId))
        }
        verifyHandler={(isVerified, businessId) =>
          dispatch(verifyBusiness(isVerified, businessId))
        }
        selectedBusiness={selectedBusiness}
      />
      <UserViewerDialog
        open={isShowUserDialog}
        handleClose={() =>
          dispatch(
            dashboardActions.setSelectedUser({ tag: null, status: false })
          )
        }
        allowHandler={(status, userId) => dispatch(allowUser(status, userId))}
        selectedUser={selectedUser}
      />
    </Container>
  );
};

export default DashboardPage;
