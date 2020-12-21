import React, { useState, useEffect } from "react";
import axios from "axios";

export const List = () => {
  const [listData, setListData] = useState([]);
  const getList = async () => {
    try {
      const ogList = await axios.get("https://cors-anywhere.herokuapp.com/https://fetch-hiring.s3.amazonaws.com/hiring.json");

      //Setting state
      setListData(ogList.data);
      // console.log(ogList.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">ListID</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        {listData.map((lst) => (
          <tr key={lst.id}>
            <th scope="row">{lst.id}</th>
            <td>{lst.listId}</td>
            <td>{lst.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
