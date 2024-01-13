import React, { useEffect, useState } from 'react'
import './EditMarble.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMarble, getMarble, loadUser, updateMarble } from '../../../../Actions/UserAction';
import { useAlert } from 'react-alert';

const EditMarble = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    
    const { loading, marble, message, error } = useSelector((state) => state.marble)

    const [title, setTitle] = useState(marble ? marble.title : '');
    const [size, setSize] = useState(marble ? marble.size : '');
    const [quantity, setQuantity] = useState(marble ? marble.quantity : '');

    const [dialog, setDialog] = useState("");

    useEffect(() => {
        dispatch(getMarble(params.id));
    }, [dispatch, params.id]);

  const [open, setOpen] = useState(false);

  const editOpen = () => {
    setDialog("Edit");
    setOpen(true);
  }

  const deleteOpen = () => {
    setDialog("Delete");
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if(dialog === "Edit"){
      await dispatch(updateMarble(title, size, quantity, params.id));
      window.location.pathname = `/tile/view/${params.id}`;
    }
    else{
      await dispatch(deleteMarble(params.id));
      window.location.pathname = `/dashboard`;
    }
    setOpen(false);
  }

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch({type: "clearErrors"})
    }
    if(message){
      alert.success(message);
      dispatch({type: "clearMessage"});
    }
  }, [alert, message, error, dispatch]);


  return (
    <div className='marble'>
      <section>
        <div className="marbleview">
          <form action="" >
          <h2>View Marbles</h2>
            <div className="input-box third">
                <input type="text" 
                className='trans'
                placeholder='Title'
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                />

                <input type="text" 
                className='trans'
                value={size} 
                onChange={(e) => setSize(e.target.value)} />

                <input type="text" 
                className='trans'
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} />

                <DeleteIcon className='delete' 
                onClick={deleteOpen}
                />
            </div>

            <div className="input-box sixth" style={{
              marginTop: '10px'
            }}>
              <input type="button" 
              value='Save' 
              disabled={loading} 
              onClick={editOpen} 
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
                  {dialog === "Edit" ? "Are you sure you want to save the updated changes ?" : "Are you sure you want to delete the marble info from database ?"}
                {/* {"Are you sure you want to save the updated changes ?"} */}
                </DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>No</Button>
                  <Button onClick={submitHandler} autoFocus>
                      Yes
                  </Button>
                </DialogActions>
            </Dialog>
          </form>
        </div>
      </section>
    </div>
  )
}

export default EditMarble
