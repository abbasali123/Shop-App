import React, { useState } from "react";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

function SearchFeature(props) {
  const [SearchVal, setSearchVal] = useState("");
  const classes = useStyles();

  const handleChange = (e) => {
    setSearchVal(e.target.value);
    props.refreshFunction(e.target.value);
  };
  return (
    <div>
      <FormControl
        className={[classes.margin, classes.textField]}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          value={SearchVal}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
    </div>
  );
}

export default SearchFeature;
