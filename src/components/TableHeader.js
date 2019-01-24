import React from "react";
import PropTypes from "prop-types";

import {TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from "@material-ui/core"

const headers = [
  {
    index: "name",
    label: "Account Name"
  },
  {
    index: "country",
    label: "Location"
  },
  {
    index: "public",
    label: "Publication Count"
  },
  {
    index: "author",
    label: "Author Count"
  },
  {
    index: "type",
    label: "Account Type"
  },
  {
    index: "tags",
    label: "Tags"
  }
];


class TableHeader extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy} = this.props;

    return (
      <TableHead>
        <TableRow>
          {headers.map(
            row => (
              <TableCell 
                key={row.index}
                align={row.numeric ? "right" : "left"}
                sortDirection={orderBy === row.index ? order : false}
                style={{ fontSize: 16  }}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={200}
                >
                  <TableSortLabel
                    active={orderBy === row.index}
                    direction={order}
                    onClick={this.createSortHandler(row.index)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

TableHeader.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default TableHeader;