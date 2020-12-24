import React, { useState, useEffect } from "react";
import axios from "axios";

export const List = () => {
  const [listData, setListData] = useState([]);
  const getList = async () => {
    try {
      const ogListCall = await axios.get("https://cors-anywhere.herokuapp.com/https://fetch-hiring.s3.amazonaws.com/hiring.json");
      const ogList = ogListCall.data;
      const filteredList = ogList.filter((el) => {
        if (el.name != null || el.name != "") {
          return el.name;
        }
      });

      let collator = new Intl.Collator([], { numeric: true });
      const newObj = filteredList.sort((a, b) => collator.compare(a.name, b.name));
      newObj.sort((a, b) => a.listId - b.listId);

      //Setting state
      setListData(newObj);
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
