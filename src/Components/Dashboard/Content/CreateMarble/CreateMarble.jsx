import React, { useEffect, useState } from 'react'
import './CreateMarble.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import AutoModeIcon from '@mui/icons-material/AutoMode';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { addMarbles, loadUser } from '../../../../Actions/UserAction';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/material'

const CreateMarble = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    let newMarbles = [];

    const { loading, error, message } = useSelector((state) => state.user)

    const [marbles, setMarbles] = useState([{ 'title': "", "size": "", "quantity": ""}]);

    const [newmarble, setNewMarble] = useState({ 'title': "", "size": "", "quantity": ""});

    const titleChange = (e, index) => {
        newMarbles = [...marbles];
        newMarbles[index] = {...newMarbles[index], title: e.target.value};
        setMarbles(newMarbles);
    }

    const sizeChange = (e, index) => {
        newMarbles = [...marbles];
        newMarbles[index] = {...newMarbles[index], size: e.target.value};
        setMarbles(newMarbles);
    }

    const quantityChange = (e, index) => {
        newMarbles = [...marbles];
        newMarbles[index] = {...newMarbles[index], quantity: e.target.value};
        setMarbles(newMarbles);
    }

    const newMarbleRow = () => {
        if(marbles.length > 0){
            if(marbles[marbles.length-1].title === ""){
                alert.error("Title is empty");
                dispatch({type: "clearErrors"})
            } else if(marbles[marbles.length-1].size === ""){
                alert.error("Size is empty");
                dispatch({type: "clearErrors"})
            } else if(marbles[marbles.length-1].quantity === ""){
                alert.error("Quantity is empty");
                dispatch({type: "clearErrors"})
            }
            else {
                setMarbles([...marbles, newmarble]);
            }
        }
        else {
            setMarbles([...marbles, newmarble]);
        }
    }

    const deleteHandler = (index) => {
        console.log(index)
        newMarbles = [...marbles];
        newMarbles.splice(index, 1);
        setMarbles(newMarbles);
    }


  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if(marbles.length > 0){
      let flag = false;
      marbles.forEach((marble) => {
        if(marble.title === ""){
          flag = true;
          alert.error("Title is empty");
          dispatch({type: "clearErrors"});
          return;
        }
        if(marble.size === ""){
          flag = true;
          alert.error("Size is empty");
          dispatch({type: "clearErrors"});
          return;
        }
        if(marble.quantity === ""){
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

  const saveMarbleInfo = async (e) => {
    e.preventDefault();
    await dispatch(addMarbles(marbles));
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
    <div className='marble'>
      <section>
        <div className="marbleok">
          <form action="" >
          <h2>Add Marbles</h2>
            {
                marbles && marbles.length > 0 && (
                    marbles.map((marble, index) => (
                        <div className="input-box third" key={index}>
                            <input type="text" 
                            className='trans'
                            value={marble.title} placeholder='Title' 
                            onChange={(e)=>titleChange(e, index)} />

                            <input type="text" 
                            className='trans'
                            value={marble.size} 
                            placeholder='Size'
                            onChange={(e)=>sizeChange(e, index)}
                            />

                            <input type="text" 
                            className='trans'
                            value={marble.quantity} 
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
                {"Do you want to save the Marbles info?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    All the marbles information will be added to the database, once you'll agree.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={saveMarbleInfo} autoFocus>
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
        onClick={() => newMarbleRow()}>
            <AutoModeIcon />
        </Fab>
      </section>
    </div>
  )
}

export default CreateMarble
