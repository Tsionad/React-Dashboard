//import dependencies
import React from 'react';
import _ from 'lodash'
import PropTypes from "prop-types";

//import mui components
import TablePagination from "@material-ui/core/TablePagination";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
//import {Table, TablePagination, TableBody, TableCell, TableRow} from @material-ui/core 

//import component
import TableHeader from "./TableHeader";
import TableToolbar from './Toolbar';

import { onLoad } from './Utils/fetch-accounts';
import config from './Utils/config';

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
  },

  tableHeaders:{
  fontSize: 30,
  },

  table: {
    minWidth: 1020,
  },

  tableWrapper: {
    overflowX: "auto"
  }
});

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const onSort = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

//For a more stable sort results, use lodash Collection.sortBy() 
//or a comparator wrapper around default JS sort method (in place of “key” access) 

const onStableSort = (array, comp) => {
  const stabilizedResults = array.map((item, index) => [item, index]);
  stabilizedResults.sort((a, b) => {
    const order = comp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedResults.map(item => item[0]);
}

class App extends React.Component {
	constructor() {
    super()
    
		this.state = {
      loading: false,
      error: null,
			accounts: [],
      renderData: [],
      searchText: '', 
      order: "asc",
      orderBy: "name",
      page: 0,
      rowsPerPage: 10,
    }

	}
  
	componentDidMount() {
    //Load and Initialize the JavaScript client library.
	  window.gapi.load("client", () => {
      window.gapi.client
        .init({
          apiKey: config.apiKey,
          // Your API key will be automatically added to the Discovery Document URLs.
          discoveryDocs: config.discoveryDocs
        })
        .then(() => {
        // Initialize and make the API request.
          onLoad((data, error) => {
			      if (data) {
              let accounts = data.accounts
            //set up the global state
				      this.setState({ loading: false, accounts })
			      } else {
			        this.setState({ error });
			      }
			    })
		    })
      });
  }		
//define sort direction/order

handleSortRequest = (e, prop) => {
  const orderBy = prop;
  let order = "desc";
  if (this.state.orderBy === prop && this.state.order === "desc") {
    order = "asc";
  }
  this.setState({ order, orderBy });
};

//   //handle any page changes  
  handleChangePage = (e, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (e) => {
    this.setState({ rowsPerPage: e.target.value });
  };

  //handle changes to search bar
  handleSearchRequest = (e) => {
    let searchText = e.target.value
    if (!searchText.length) {
      this.setState({ accounts: this.state.accounts || [], searchText: '' })
    } else {
    //   let searchResults = this.state.accounts.filter((item)=>{
    //   for (let key in item) {
    //     let searchText = item[key] && item[key].toString().toLowerCase();
    //     if (searchText && searchText.indexOf(searchText.toLowerCase()) !== -1 ) {
    //       return true;
    //     }
    //   }
    //   return false;
    // });
      const regex = new RegExp(_.escapeRegExp(this.state.searchText), 'gi')
      const searchResults = _.filter(this.state.accounts, account => 
        (regex.test(account.name) || regex.test(account.type) || regex.test(account.location)))
        this.setState({
          searchText: e.target.value,
          renderData: searchResults,
        })
    }
  }

  render() { 
    const { classes } = this.props;
    const { accounts, searchText, rowsPerPage, page, renderData, order, orderBy } = this.state;
    const displayData = (_.isEmpty(renderData) && !searchText) ? accounts : renderData;

    return (
      <Paper className={classes.root}>
          <TableToolbar
            value={searchText}
            displayData={displayData}
            //renderData={renderData}
            onSearchChanged={this.handleSearchRequest}
            onResetTable={this.onResetTable}
          />
          <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleSortRequest}
              rowCount={accounts.length}
            />
            <TableBody>
              {onStableSort(displayData, onSort(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((displayData, index) => {
                  return (
                    <TableRow
                      tabIndex={-1}
                      key={index}
                      style={{ fontSize: 16,  paddingRight: 10  }}
                    >
                    <TableCell component="th" scope="row" >
                        {displayData.name}
                    </TableCell>
                      <TableCell align="left">{
                        displayData.location}</TableCell>
                      <TableCell align="left">
                        {displayData.public}
                      </TableCell>
                      <TableCell align="left">
                        {displayData.author}
                      </TableCell>
                      <TableCell align="center">
                        {displayData.type}
                      </TableCell>
                      <TableCell align="left">{displayData.tags}</TableCell>
                    </TableRow>
                  );
                })}
              
            </TableBody>
          </Table>
        </div>     
          <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={displayData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
