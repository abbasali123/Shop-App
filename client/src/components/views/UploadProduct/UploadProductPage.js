import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
// import LabelIcon from "@material-ui/icons/Label";
import Button from "@material-ui/core/Button";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function UploadProductPage(props) {
  const continent = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antartica" },
  ];
  const [titleValue, settitleValue] = useState("");
  const [descriptionValue, setdescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState(0);
  const [ContinentValue, setContinentValue] = useState(1);
  const [images, setimages] = useState([]);
  const classes = useStyles();

  const titleChange = (event) => {
    settitleValue(event.target.value);
  };

  const descriptionChange = (event) => {
    setdescriptionValue(event.target.value);
  };

  const PriceChange = (event) => {
    setPriceValue(event.target.value);
  };
  const ContinentChange = (event) => {
    setContinentValue(event.target.value);
  };

  const updateImges = (newImages) => {
    setimages(newImages);
  };
  const onSubmit = () => {
    const serverUrl = require("../../Config");
    if (
      !titleValue ||
      !descriptionValue ||
      !PriceValue ||
      !ContinentValue ||
      !images
    ) {
      return alert("Fill all the fields first");
    }
    const variables = {
      writer: props.user.userData._id,
      title: titleValue,
      description: descriptionValue,
      price: PriceValue,
      images: images,
      continents: ContinentValue,
    };

    Axios.post("/api/product/uploadProduct", variables).then((res) => {
      if (res.data.success) {
        alert("Product Successfuly Uploaded");
        props.history.push("/");
      } else {
        alert("Failes to save product");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>Upload Travel Product</h2>
      </div>
      <FileUpload refreshImage={updateImges} />
      <br />
      <br />
      <FormControl fullWidth className={classes.margin} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-amount">title</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          labelWidth={60}
          helperText="Incorrect entry."
          onChange={titleChange}
          value={titleValue}
        />
        <br />
        <br />

        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          defaultValue=""
          variant="outlined"
          onChange={descriptionChange}
          value={descriptionValue}
        />

        <br />
        <br />
      </FormControl>
      <FormControl fullWidth className={classes.margin} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          labelWidth={60}
          helperText="Incorrect entry."
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          type="number"
          onChange={PriceChange}
          value={PriceValue}
        />
      </FormControl>
      <br />
      <br />
      <TextField
        id="outlined-select-currency-native"
        select
        label="Continent"
        value={ContinentValue}
        onChange={ContinentChange}
        SelectProps={{
          native: true,
        }}
        helperText="Please select Continent"
        variant="outlined"
      >
        {continent.map((option) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        onClick={onSubmit}
      >
        Submit
      </Button>
    </div>
  );
}

export default UploadProductPage;
