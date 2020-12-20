import React, { useState, useEffect } from "react";
import axios from "axios";

export const List = () => {
  const getList = async () => {
    try {
      const allList = await axios.get("https://cors-anywhere.herokuapp.com/https://fetch-hiring.s3.amazonaws.com/hiring.json");
      console.log(allList.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getList();
  });

  return <div>Future list</div>;
};
