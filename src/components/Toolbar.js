import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { IconButton, InputBase, Toolbar, Tooltip, Typography, withStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
//import RestoreIcon from "@material-ui/icons/Restore";
//import FilterListIcon from "@material-ui/icons/FilterList";

import toolbarStyles from "./StyledPanel";

const TableToolbar = (props) => {
  const { classes, searchText, onSearchChanged} = props;
  
  return (
    <Toolbar className={classNames(classes.root, classes.highlight)}    >
      <Typography className={classes.title} variant="h6" color="inherit" noWrap>
        Accounts Dataset
      </Typography> 
      <div className={classes.spacer} />
      <div className={classes.search}>

      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        value={searchText}
        onChange={onSearchChanged}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
      </div>
      
     {/* <div className={classes.actions} >
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset">
          <IconButton aria-label="Restore">
            <RestoreIcon />
          </IconButton>
        </Tooltip> 
      </div> */}

      
    </Toolbar>
    )
};

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  onSearchChanged: PropTypes.func.isRequired,
};

export default withStyles(toolbarStyles)(TableToolbar);