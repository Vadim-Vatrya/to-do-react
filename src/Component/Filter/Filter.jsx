import React from "react";
import "./Filter.scss";

const Filter = ({ value, onChange }) => (
  <label>
    Фильтр по имени <input type="text" value={value} onChange={onChange} />
  </label>
);

export default Filter;
