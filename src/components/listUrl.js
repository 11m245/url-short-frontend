import { useContext, useEffect, useState } from "react";
import { apiContext } from "../App";
import ListTable from "./ListTable";

function ListUrl() {
  const { serverApi } = useContext(apiContext);
  const initialRows = [
    // { lengthUrl: "demo lurl1", clickedCount: 0, shortUrl: "demo surl1" },
  ];
  const [rows, setRows] = useState(initialRows);

  const columns = [
    "lengthUrl",
    "generated On",
    "shortUrl",
    "clicked count",
    "Visit",
  ];

  async function checkResponse(response) {
    const data = await response.json();
    if (response.status === 200) {
      // console.log(data.newData);
      const formattedArray = data.newData.map((obj) => {
        return {
          lengthUrl: obj.lUrl,
          clickedCount: obj.clickedCount,
          shortUrl: obj.shortStr,
          generatedOn: obj.createdAt,
        };
      });
      console.log(formattedArray);
      setRows(formattedArray);
    } else {
      console.log("error");
    }
  }

  function getList() {
    fetch(`${serverApi}/url/getAllUrls`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        logintoken: localStorage.getItem("token"),
      },
    })
      .then((response) => checkResponse(response))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      <div className="list-url-container">
        list url page
        <ListTable rows={rows} columns={columns} />
      </div>
    </>
  );
}
export { ListUrl };
