import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@material-ui/core";
import React, { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import _ from "lodash";
export const SectionCategories = ({ filterProduct, products }) => {
  const { get, set } = useLocalStorage();

  let filterCategories = Array.from(
    new Set(
      Array.from(new Set(products.map((p) => p.category)))
        .map((category) => {
          let result = products.find((p) => p.category === category);
          return result;
        })
        .map((r) => {
          return { id: r.id, key: r.category, value: false };
        })
    )
  );
  let getCategories = get("categories");
  let categoriesLocalStorage = JSON.parse(getCategories || "[]");
  getCategories === null && set("categories", filterCategories);
  const [categories, setCategories] = useState(
    getCategories ? categoriesLocalStorage : filterCategories
  );

  const handleChecked = (event) => {
    let e = event.target;
    const newCategory = {
      key: e.name,
      value: e.checked,
    };
    let getCategories = get("categories");
    let categoriesLocalStorage = JSON.parse(getCategories || "[]");
    const repeatedCategory = categoriesLocalStorage.find(
      (category) => category.key === newCategory.key
    );
    if (repeatedCategory) {
      let index = _.findIndex(categoriesLocalStorage, repeatedCategory);
      repeatedCategory.value = newCategory.value;
      let updateCategory = _.cloneDeep(repeatedCategory);
      categoriesLocalStorage.splice(index, 1, updateCategory);
      set("categories", categoriesLocalStorage);
      setCategories(categoriesLocalStorage);
    } else {
      categoriesLocalStorage.push(newCategory);
      set("categories", categoriesLocalStorage);
      setCategories(categoriesLocalStorage);
    }
    filterProduct();
  };
  //console.log({ categories });
  return (
    <>
      <FormLabel component="legend">Category</FormLabel>
      <FormGroup>
        {categories.map((category) => {
          return (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  onChange={handleChecked}
                  name={category.key}
                  checked={category.value}
                />
              }
              label={category.key}
            />
          );
        })}
      </FormGroup>
    </>
  );
};
