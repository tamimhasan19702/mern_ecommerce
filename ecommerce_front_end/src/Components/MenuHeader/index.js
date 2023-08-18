/** @format */

import React, {useState,useEffect} from "react";
import "./style.css";

export default function MenuHeader() {
  /**
   * Renders a list of categories and their children recursively.
   *
   * @param {Array} categories - The array of category objects.
   * @returns {Array} - The rendered list of categories.
   */
  const renderCategories = (categories) => {
    let myCategories = [];

    for (let category of categories) {
      myCategories.push(
        // creating a list item for the category
        <li key={category.name}>
          {category.name}
          {/* if category has children, recursively render the children */}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }

    return myCategories;
  };

  return <div className="menuHeader"></div>;
}
