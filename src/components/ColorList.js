import React, { useState } from "react";
import EditMenu from './EditMenu';
import { axiosWithAuth } from "../helpers/axiosWithAuth";
// import { useHistory } from "react-router-dom";


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColorsA, updateColorsB}) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  // const { push } = useHistory();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/api/colors/${colors.id}` , colorToEdit)
    .then((res) => {
      // console.log('***PUT***', res.data);
      updateColorsA(colors.map(colorToEdit => {
        if(colorToEdit.id === res.data.id) {
          return res.data;
        } else { 
          return colorToEdit; 
        }
      }))
    }) 
    .catch((err) => console.log(err.response));
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
     
    .then((res) => {
      // console.log('**DEL**', res.data)
      updateColorsB(colors.filter((color) => color.id !== res.data));
      // push('/bubbles')
    })
    .catch((err) => console.log(err.response));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.