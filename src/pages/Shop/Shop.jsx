import React, { Component } from "react";
import CollectionPreview from "../../components/CollectionPreview/CollectionPreview";
import SHOP_DATA from "./shop.data";

export default class Shop extends Component {
  constructor() {
    super();

    this.state = {
      collections: SHOP_DATA,
    };
  }
  render() {
    return (
      <div className="shop">
        {this.state.collections.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
      </div>
    );
  }
}
