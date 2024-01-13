import React, { useEffect, useState } from 'react'
import './CreateTile.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import AutoModeIcon from '@mui/icons-material/AutoMode';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { addTiles, loadUser } from '../../../../Actions/UserAction';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/material'

const CreateTile = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    let newTiles = [];

    const { loading, error, message } = useSelector((state) => state.user)

    const [tiles, setTiles] = useState([{ 'title': "", "size": "", "quantity": ""}]);

    const [newtile, setNewTile] = useState({ 'title': "", "size": "", "quantity": ""});

    const titleChange = (e, index) => {
        newTiles = [...tiles];
        newTiles[index] = {...newTiles[index], title: e.target.value};
        setTiles(newTiles);
    }

    const sizeChange = (e, index) => {
        newTiles = [...tiles];
        newTiles[index] = {...newTiles[index], size: e.target.value};
        setTiles(newTiles);
    }

    const quantityChange = (e, index) => {
        newTiles = [...tiles];
        newTiles[index] = {...newTiles[index], quantity: e.target.value};
        setTiles(newTiles);
    }

    const newTileRow = () => {
        if(tiles.length > 0){
            if(tiles[tiles.length-1].title === ""){
                alert.error("Title is empty");
                dispatch({type: "clearErrors"})
            } else if(tiles[tiles.length-1].size === ""){
                alert.error("Size is empty");
                dispatch({type: "clearErrors"})
            } else if(tiles[tiles.length-1].quantity === ""){
                alert.error("Quantity is empty");
                dispatch({type: "clearErrors"})
            }
            else {
                setTiles([...tiles, newtile]);
            }
        }
        else {
            setTiles([...tiles, newtile]);
        }
    }

    const deleteHandler = (index) => {
        newTiles = [...tiles];
        newTiles.splice(index, 1);
        setTiles(newTiles);
    }


  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if(tiles.length > 0){
      let flag = false;
      tiles.forEach((tile) => {
        if(tile.title === ""){
          flag = true;
          alert.error("Title is empty");
          dispatch({type: "clearErrors"});
          return;
        }
        if(tile.size === ""){
          flag = true;
          alert.error("Size is empty");
          dispatch({type: "clearErrors"});
          return;
        }
        if(tile.quantity === ""){
          flag = true;
          alert.error("Quantity is empty");
          dispatch({type: "clearErrors"});
          return;
        }
      });
      if(!flag){
        setOpen(true);
      }
    } else {
      alert.error("Nothing to save");
      dispatch({type: "clearErrors"});
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const saveTileInfo = async (e) => {
    e.preventDefault();
    await dispatch(addTiles(tiles));
    dispatch(loadUser());
    setOpen(false);
  }

  // useEffect(() => {
  //   if(error){
  //       alert.error(error);
  //       dispatch({type: "clearErrors"})
  //   }
  //   if(message){
  //       alert.success(message);
  //       dispatch({type: "clearMessage"})
  //   }
  // }, [alert, error, message, dispatch]);


  return (
    <div className='tile'>
      <section>
        <div className="tileok">
          <form action="" >
          <h2>Add Tiles</h2>
            {
                tiles && tiles.length > 0 && (
                    tiles.map((tile, index) => (
                        <div className="input-box third" key={index}>
                            <input type="text" 
                            className='trans'
                            value={tile.title} placeholder='Title' 
                            onChange={(e)=>titleChange(e, index)} />

                            <input type="text" 
                            className='trans'
                            value={tile.size} 
                            placeholder='Size'
                            onChange={(e)=>sizeChange(e, index)}
                            />

                            <input type="text" 
                            className='trans'
                            value={tile.quantity} 
                            placeholder='Quantity'  
                            onChange={(e)=>quantityChange(e, index)}
                            />

                            <DeleteIcon className='delete' 
                            onClick={() => deleteHandler(index)}/>
                        </div>
                    ))
                )
            }

            <div className="input-box sixth" style={{
              marginTop: '10px'
            }}>
              <input type="button" 
              value='Submit' 
              disabled={loading} 
              onClick={handleSubmit} 
              id='btn' style={{
                width: '15%'
              }}/>
            </div>

            <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle  id="alert-dialog-title">
                {"Do you want to save the Tiles info?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    All the tiles information will be added to the database, once you'll agree.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={saveTileInfo} autoFocus>
                    Save
                </Button>
                </DialogActions>
            </Dialog>
          </form>


        </div>
        <Fab size="medium" 
        color="primary"
        aria-label="add" sx={{
            // bottom: '-280px',
            bottom: '10px',
            left: "1300px"
        }} 
        onClick={() => newTileRow()}>
            <AutoModeIcon />
        </Fab>
      </section>
    </div>
  )
}

export default CreateTile
