import React from "react";
import "./collection.styles.scss";

import CollectionItem from "../collection-item/collection-item.component";

const Collection = ({ title, items }) => {
  return (
    <div className="collection">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {items
          .filter((item, id) => id < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default Collection;
