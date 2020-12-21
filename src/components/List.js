import React, { useState, useEffect } from "react";
import axios from "axios";

export const List = () => {
  const [listData, setListData] = useState([]);
  const getList = async () => {
    try {
      const ogList = await axios.get("https://cors-anywhere.herokuapp.com/https://fetch-hiring.s3.amazonaws.com/hiring.json");

      //Setting state
      setListData(ogList.data);
      console.log(ogList.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      {listData.map((lst) => (
        <div key={lst.id}>
          <p>
            {lst.id},{lst.listId}, {lst.name}{" "}
          </p>
        </div>
      ))}
    </div>
  );
};
