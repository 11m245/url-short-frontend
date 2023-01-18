import { useContext } from "react";
import { useParams } from "react-router-dom";
import { apiContext } from "../App";

function Urldirect() {
  const { id } = useParams();
  const { serverApi } = useContext(apiContext);
  async function checkLengthUrlResponse(response) {
    const data = await response.json();
    // console.log("data is", data);
    if (response.status === 200) {
      window.location.href = data.lenghURL;
    } else {
      console.log(data.message);
    }
  }
  fetch(`${serverApi}/getLengthUrl`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      logintoken: localStorage.getItem("token"),
      shortStr: id,
    },
  })
    .then((response) => checkLengthUrlResponse(response))
    .catch((error) => console.log(error.message));
  return (
    <>
      <h1>url redirection wait {id}</h1>
    </>
  );
}

export { Urldirect };
