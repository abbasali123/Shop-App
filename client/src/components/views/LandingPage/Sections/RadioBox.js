import React, { useState } from "react";
import { Collapse } from "antd";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { price } from "./datas";
const { Panel } = Collapse;

function RadioBox(props) {
  const [Checked, setChecked] = useState([]);
  const [Value, setValue] = useState("0");
  const handleChange = (event) => {
    setValue(event.target.value);
    props.handleFilters(event.target.value);
  };

  const radioBoxItems = price.map((item, index) => (
    <FormControlLabel
      key={item._id}
      value={`${item._id}`}
      control={<Radio />}
      label={item.name}
    />
  ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price" key="1">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={Value}
            onChange={handleChange}
          >
            {radioBoxItems}
          </RadioGroup>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
