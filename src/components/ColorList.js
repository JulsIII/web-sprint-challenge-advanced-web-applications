import React, { useState } from "react";
import EditMenu from './EditMenu';
import { axiosWithAuth } from "../helpers/axiosWithAuth";
import { useParams, useHistory, Redirect } from "react-router-dom";
import axios from "axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const { id } = useParams();
  const { push } = useHistory();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${id}` , colorToEdit)
    .then((res) => {
      // console.log('***PUT***', res.data);
      updateColors(colors.map(colorToEdit => {
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
    .delete(`http://localhost:5000/api/colors/${color.id}`)
     
    .then((res) => {
      console.log('**DEL**', res.data)
      updateColors(colors.filter((color) => color.id !== res.data));
      push('/bubbles')
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