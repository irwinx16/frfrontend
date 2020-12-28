import React, { useState, useEffect } from "react";
import axios from "axios";

export const List = () => {
  const [listData, setListData] = useState([]);
  const getList = async () => {
    try {
      const ogListCall = await axios.get("https://cors-anywhere.herokuapp.com/https://fetch-hiring.s3.amazonaws.com/hiring.json");
      const ogList = ogListCall.data;
      const filteredList = ogList.filter((el) => {
        if (el.name !== null || el.name !== "") {
          return el.name;
        }
        return el;
      });
      let collator = new Intl.Collator([], { numeric: true });
      const sortedList = filteredList.sort((a, b) => collator.compare(a.name, b.name));
      sortedList.sort((a, b) => a.listId - b.listId);

      //Setting state
      setListData(sortedList);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">ListID</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        {listData.map((lst) => (
          <tr key={lst.id}>
            <th scope="row">{lst.listId}</th>
            <td>{lst.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
