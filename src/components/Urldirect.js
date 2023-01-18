import { useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiContext } from "../App";

function Urldirect() {
  const { id } = useParams();
  const { serverApi } = useContext(apiContext);
  const checkLengthUrlResponse = useCallback(async (response) => {
    const data = await response.json();
    // console.log("data is", data);
    if (response.status === 200) {
      window.location.href = data.lenghURL;
    } else {
      console.log(data.message);
    }
  }, []);

  const getLenthUrl = useCallback(() => {
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
  }, []);

  useEffect(() => {
    getLenthUrl();
  }, []);
  return (
    <>
      <h1>url redirection Please wait {id}</h1>
    </>
  );
}

export { Urldirect };
