/** @format */

import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../actions";

export default function MenuHeader() {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

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
 
           {
            category.parentId ? <a href={category.slug}>{category.name}</a> : 
            <span>{category.name}</span>
           }

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

  return( 
  <div className="menuHeader">
<ul>
  {category.categories.length > 0 ? (
    renderCategories(category.categories)
  ) : null }
</ul>
  </div>
  );
}
