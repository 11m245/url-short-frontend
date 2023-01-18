import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SwitchAccessShortcutAddRoundedIcon from "@mui/icons-material/SwitchAccessShortcutAddRounded";
import { useContext, useState } from "react";
import BasicTable from "./BasicTable";
import { useFormik } from "formik";
import { apiContext } from "../App";
import { NestCamWiredStandSharp } from "@mui/icons-material";
import { toast } from "react-toastify";

function CreateUrl() {
  const { serverApi } = useContext(apiContext);
  const [createdList, setCreatedList] = useState([]);

  async function checkResponse(response) {
    const data = await response.json();
    if (response.status === 200) {
      toast.success(data.message);
      setCreatedList([
        ...createdList,
        {
          lengthUrl: data.newData.lUrl,
          shortUrl: data.newData.shortStr,
        },
      ]);
    } else {
      toast.error(data.message);
    }
  }
  function createUrl(values) {
    fetch(`${serverApi}/url/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        logintoken: localStorage.getItem("token"),
      },
      body: JSON.stringify(values),
    })
      .then((response) => checkResponse(response))
      .catch((err) => console.log(err));
  }

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { lUrl: "" },
    onSubmit: (values) => {
      console.log(values);
      createUrl(values);
    },
  });

  return (
    <>
      <div className="create-url-container">
        <form onSubmit={handleSubmit}>
          <div className="wrapper p-4 d-flex">
            <TextField
              id="outlined-multiline-static"
              label="Length uRL"
              name="lUrl"
              value={values.lUrl}
              onChange={handleChange}
              multiline
              rows={4}
              defaultValue="Default Value"
              fullWidth
            />
            <IconButton
              type="submit"
              color="primary"
              aria-label="add to shopping cart"
            >
              <SwitchAccessShortcutAddRoundedIcon />
            </IconButton>
          </div>
        </form>

        {createdList.length > 0 ? (
          <div className="created-list-container">
            <BasicTable createdList={createdList} />
          </div>
        ) : null}
      </div>
    </>
  );
}
export { CreateUrl };
