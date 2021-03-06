import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../helpers/axiosWithAuth";
// import { useParams, useHistory } from "react-router-dom";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  const fetchColors = () => {
     axiosWithAuth()
      .get(`/api/colors`)
       
      .then((res) => setColorList(res.data))
      
      .catch((err) => console.log(err.response));
  };
      

  useEffect(() => {
    fetchColors();
  }, []);


  return (
    <>
      <ColorList colors={colorList} updateColorsA={setColorList} updateColorsB={fetchColors}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

//Task List:
//1. Make an axios call to retrieve all color data and push to state on mounting.
