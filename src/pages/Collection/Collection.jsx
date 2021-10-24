/*
import React from "react";
import { connect } from "react-redux";
import CollectionItem from "../../components/CollectionItem/CollectionItem";

import { selectCollection } from "../../redux/shop/shop.selectors";

import "./Collection.scss";

const Collection = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  // unlike other selctor, this selector needs a part of the state depending on the URL parameter
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(Collection);
*/

// ! =========================== With hooks ===============

import React from "react";
import { useSelector } from "react-redux";
import CollectionItem from "../../components/CollectionItem/CollectionItem";
import { useParams } from "react-router";
import { selectCollection } from "../../redux/shop/shop.selectors";

import "./Collection.scss";

const Collection = () => {
  const { collectionId } = useParams();
  const { title, items } = useSelector(selectCollection(collectionId));

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
