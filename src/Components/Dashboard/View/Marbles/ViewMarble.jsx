import React, { useEffect, useState } from 'react'
import './ViewMarble.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getMarble } from '../../../../Actions/UserAction';

const ViewMarble = () => {

    const dispatch = useDispatch();
    const params = useParams();

    const { loading, marble } = useSelector((state) => state.marble)

    useEffect(() => {
        dispatch(getMarble(params.id));
    }, [dispatch, params.id]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className='marble'>
      <section>
        <div className="marbleview">
          <form action="" >
          <h2>View Marbles</h2>
            <div className="input-box third">
                <input type="text" 
                className='trans'
                value={marble ? marble.title : ''} readOnly />

                <input type="text" 
                className='trans'
                value={marble ? marble.size : ''} 
                readOnly />

                <input type="text" 
                className='trans'
                value={marble ? marble.quantity : ''} 
                readOnly />
            </div>

            <div className="input-box sixth" style={{
              marginTop: '10px'
            }}>
              <input type="button" 
              value='Edit' 
              disabled={loading} 
              onClick={handleOpen} 
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
                {"Are you sure you want to edit the marble info?"}
                </DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Link to = {`/marble/edit/${marble ? marble._id : ''}`} >
                    <Button onClick={handleClose} autoFocus>
                        Yes
                    </Button>
                </Link>
                </DialogActions>
            </Dialog>
          </form>
        </div>
      </section>
    </div>
  )
}

export default ViewMarble
