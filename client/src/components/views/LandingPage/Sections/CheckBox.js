import React, { useState } from "react";
import { Checkbox, Collapse } from "antd";

import { continents } from "./datas";
const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);
  const handleToggle = (item) => {
    const currentIndex = Checked.indexOf(item);
    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const checkBoxItems = continents.map((item, index) => (
    <React.Fragment key={index}>
      <Checkbox
        onChange={() => handleToggle(item._id)}
        type="checkbox"
        checked={Checked.indexOf(item._id) === -1 ? false : true}
      />
      <span>{item.name}</span>
    </React.Fragment>
  ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Continents" key="1">
          {checkBoxItems}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
