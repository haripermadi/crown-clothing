import React, { Component } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { selectDirectorySections } from "../../redux/directory/directory.selectors";

import "./directory.styles.scss";
import MenuItem from "../menu-item/menu-item.component";

const Directory = ({ sections }) => {
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...others }) => (
        <MenuItem key={id} {...others} />
      ))}
    </div>
  );
};

const mapStateToProp = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProp)(Directory);
