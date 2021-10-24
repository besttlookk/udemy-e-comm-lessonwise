import React from "react";
import { useSelector } from "react-redux";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";
import CollectionPreview from "../CollectionPreview/CollectionPreview";

import "./CollectionsOverview.scss";

const CollectionsOverview = () => {
  const collections = useSelector(selectCollectionsForPreview);
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default CollectionsOverview;

/*
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";
import CollectionPreview from "../CollectionPreview/CollectionPreview";

// import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

import "./CollectionsOverview.scss";

const CollectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  // collections: selectCollections, // after data normalization collections is not an "array" so we cant not map over it .
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);

*/
