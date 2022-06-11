import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import { styled } from "@mui/material/styles";
import { Card, IconButton } from "@mui/material";
import TablePaginationActions from "./TablePaginationActions";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { useState } from "react";
import { BlockSharp, CheckCircleSharp, DeleteSharp } from "@mui/icons-material";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DashboardTable = ({
  tableTitle,
  headCells,
  rows,
  page,
  setPage,
  count,
  fullList,
  selectHandler,
  callback,
}) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(headCells[0].id);
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(fullList ? rows.length : 5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    selectHandler(row);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <EnhancedTableToolbar
        numSelected={selected.length}
        tableTitle={tableTitle}
        callback={callback}
      />
      <TableContainer sx={{ flexGrow: 1 }}>
        <Table
          stickyHeader
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={headCells}
          />
          <TableBody sx={{ scrollY: "auto", flexGrow: 1 }}>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <StyledTableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    {headCells.map((col) => (
                      <>
                        {col.image && (
                          <StyledTableCell align={col.align}>
                            <img
                              src={row[col.id]}
                              alt="brand logo"
                              style={{
                                height: "2rem",
                                width: "2rem",
                                objectFit: "cover",
                              }}
                            />
                          </StyledTableCell>
                        )}
                        {!col.image && !col.button && (
                          <StyledTableCell align={col.align}>
                            {`${
                              col.id === "owner"
                                ? row.owner.firstname + " " + row.owner.lastname
                                : row[col.id]
                            }`}
                          </StyledTableCell>
                        )}
                        {col.button && col.id !== "action" && (
                          <StyledTableCell align={col.align}>
                            <IconButton onClick={() => col.action(row[col.id])}>
                              {row[col.id] ? (
                                <CheckCircleSharp color="success" />
                              ) : (
                                <BlockSharp color="error" />
                              )}
                            </IconButton>
                          </StyledTableCell>
                        )}
                        {col.button && col.id === "action" && (
                          <StyledTableCell align={col.align}>
                            <IconButton onClick={() => col.action(row._id)}>
                              <DeleteSharp />
                            </IconButton>
                          </StyledTableCell>
                        )}
                      </>
                    ))}
                  </StyledTableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!fullList && (
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      )}
    </Card>
  );
};

export default DashboardTable;
