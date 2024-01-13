import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import logobg2 from "../LandingPage/Assets/logobg2.png"
import LogoutIcon from '@mui/icons-material/Logout';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, logoutUser } from '../../Actions/UserAction'
import EditNoteIcon from '@mui/icons-material/EditNote';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import CreateTile from '../Dashboard/Content/CreateTile/CreateTile'
import CreateMarble from '../Dashboard/Content/CreateMarble/CreateMarble'
import TilesList from './Saved/ListSaved/Tiles/TilesList';
import MarblesList from './Saved/ListSaved/Marbles/MarblesList';
import Loader from '../Loader/Loader'
import Order from './Order/Order';
import OrdersList from './Saved/ListSaved/Orders/OrdersList';


const Dashboard = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [createTiles, setCreateTiles] = useState(true)
    const [createMarbles, setCreateMarbles] = useState(false)
    const [viewTiles, setViewTiles] = useState(false)
    const [viewMarbles, setViewMarbles] = useState(false)
    const [createOrder, setCreateOrder] = useState(false)
    const [viewOrder, setViewOrder] = useState(false)

    const { loading: authLoading, error: authError, message: authMessage } = useSelector(state => state.auth)

    const { loading, error, message } = useSelector(state => state.user)

    const { error: tileError, message: tileMessage } = useSelector(state => state.tile)

    const { error: marbleError, message: marbleMessage } = useSelector(state => state.marble)

    const { error: orderError, message: orderMessage } = useSelector(state => state.order)

    const createTilesHandler = () => {
        setCreateTiles(true);
        setCreateMarbles(false);
        setViewTiles(false);
        setViewMarbles(false);
        setCreateOrder(false);
        setViewOrder(false);
    }

    const createMarblesHandler = () => {
        setCreateTiles(false);
        setCreateMarbles(true);
        setViewTiles(false);
        setViewMarbles(false)
        setCreateOrder(false);
        setViewOrder(false);
    }

    const viewTilesHandler = () => {
        setCreateTiles(false);
        setCreateMarbles(false);
        setViewTiles(true);
        setViewMarbles(false)
        setCreateOrder(false);
        setViewOrder(false);
    }

    const viewMarblesHandler = () => {
        setCreateTiles(false);
        setCreateMarbles(false);
        setViewTiles(false);
        setViewMarbles(true)
        setCreateOrder(false);
        setViewOrder(false);
    }

    const createOrderHandler = () => {
        setCreateTiles(false);
        setCreateMarbles(false);
        setViewTiles(false);
        setViewMarbles(false)
        setCreateOrder(true);
        setViewOrder(false);
    }

    const viewOrderHandler = () => {
        setCreateTiles(false);
        setCreateMarbles(false);
        setViewTiles(false);
        setViewMarbles(false)
        setCreateOrder(false);
        setViewOrder(true);
    }

    const createTilesStyle = {
        background: createTiles && 'rgba(255, 255, 255, 0.3)',
        borderRight: createTiles && '4px solid rgb(52, 174, 235)',
        borderRadius: createTiles && '4px'
    };

    const createMarblesStyle = {
        background: createMarbles && 'rgba(255, 255, 255, 0.3)',
        borderRight: createMarbles && '4px solid rgb(52, 174, 235)',
        borderRadius: createMarbles && '4px'
    };

    const viewTilesStyle = {
        background: viewTiles && 'rgba(255, 255, 255, 0.3)',
        borderRight: viewTiles && '4px solid rgb(52, 174, 235)',
        borderRadius: viewTiles && '4px'
    };

    const viewMarblesStyle = {
        background: viewMarbles && 'rgba(255, 255, 255, 0.3)',
        borderRight: viewMarbles && '4px solid rgb(52, 174, 235)',
        borderRadius: viewMarbles && '4px'
    };

    const createOrderStyle = {
        background: createOrder && 'rgba(255, 255, 255, 0.3)',
        borderRight: createOrder && '4px solid rgb(52, 174, 235)',
        borderRadius: createOrder && '4px'
    };

    const viewOrderStyle = {
        background: viewOrder && 'rgba(255, 255, 255, 0.3)',
        borderRight: viewOrder && '4px solid rgb(52, 174, 235)',
        borderRadius: viewOrder && '4px'
    };

    const [ open, setOpen ] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const logoutHandler = async (e) => {
        e.preventDefault();
        dispatch(logoutUser());
        await alert.success("Logged out successfully");
        if(window.location.pathname.toString() === '/dashboard'){
          // setHref(true);
          window.location.pathname = '/';
        }
    }

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch({type: "clearErrors"})
        }
        if(message){
            alert.success(message);
            dispatch({type: "clearErrors"})
        }
        if(tileError){
            alert.error(tileError);
            dispatch({type: "clearErrors"})
        }
        if(tileMessage){
            alert.success(tileMessage);
            dispatch({type: "clearErrors"})
        }
        if(marbleError){
            alert.error(marbleError);
            dispatch({type: "clearErrors"})
        }
        if(marbleMessage){
            alert.success(tileMessage);
            dispatch({type: "clearErrors"})
        }
        if(orderError){
            alert.error(tileError);
            dispatch({type: "clearErrors"})
        }
        if(orderMessage){
            alert.success(orderMessage);
            dispatch({type: "clearErrors"})
        }
        if(authError){
            alert.error(tileError);
            dispatch({type: "clearErrors"})
        }
        if(authMessage){
            alert.success(authMessage);
            dispatch({type: "clearErrors"})
        }
    }, [alert, error, message, dispatch])


  return (
    (authLoading || loading ? <Loader /> : 
    <div className='contain'>
        <div className="sideBar" style={{
            width: '0%'
        }}>
            <div className='bodyn'>
                <aside className="sidebar" style={{
                        borderRight: '2px solid black'
                }}>
                    <ButtonBase>
                        <Link to={'/'}>
                            <div className="logo" >
                                <img src={logobg2} alt="logo" />
                            </div>
                        </Link>
                    </ButtonBase>
                    <ul className="links" >
                        <h4>Create</h4>
                        <li onClick={createTilesHandler} 
                        style={createTilesStyle} >
                            <span className="material-symbols-outlined">
                                <EditNoteIcon style={{ color: 'black'}} />
                            </span>
                            <a href="#">Add Tiles</a>
                        </li>
                        <li onClick={createMarblesHandler} 
                        style={createMarblesStyle} >
                        <span className="material-symbols-outlined">
                            <BorderColorOutlinedIcon style={{ color: 'black' }}/>
                        </span>
                        <a href="#">Add Marbles</a>
                        </li>
                        
                        <hr/>
                        <h4>Saved</h4>

                        <li 
                        onClick={viewTilesHandler} 
                        style={viewTilesStyle} 
                        >
                        <span className="material-symbols-outlined">
                            <ClassOutlinedIcon style={{
                                color: 'black'
                            }}/>
                        </span>
                        <a href="#">View Tiles</a>
                        </li>

                        <li 
                        onClick={viewMarblesHandler} style={viewMarblesStyle} 
                        >
                        <span className="material-symbols-outlined">
                            <CollectionsBookmarkIcon style={{
                                color: 'black'
                            }}/>
                        </span>
                        <a href="#">View Marbles </a>
                        </li>
                        
                        <hr/>
                        <h4>Billing</h4>

                        <li 
                        onClick={createOrderHandler} 
                        style={createOrderStyle} 
                        >
                        <span className="material-symbols-outlined">
                            <CurrencyRupeeIcon style={{
                                color: 'black'
                            }}/>
                        </span>
                        <a href="#">Create Order</a>
                        </li>

                        <li 
                        onClick={viewOrderHandler} 
                        style={viewOrderStyle} 
                        >
                        <span className="material-symbols-outlined">
                            <ReceiptIcon style={{
                                color: 'black'
                            }}/>
                        </span>
                        <a href="#">View Orders</a>
                        </li>
                        <hr/>

                        <h4>Account</h4>
                       
                        <li className="logout-link" onClick={handleOpen}>
                        <span className="material-symbols-outlined">
                            <LogoutIcon style={{
                                color: 'black'
                            }}/>
                        </span>
                        {/* <Link to={'/'} 
                        onClick={logoutHandler}
                        >  */}
                        Logout
                        {/* </Link> */}
                        {/* <a href="#">Logout</a> */}
                        </li>
                    </ul>
                </aside>
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
                    Are you sure you want to log out ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button 
                onClick={logoutHandler} 
                autoFocus>
                    Save
                </Button>
                </DialogActions>
            </Dialog>

            

        </div>

        {
            createTiles ? ( <CreateTile /> )  : null
        }

        {
            createMarbles ? <CreateMarble /> : null
        }

        {
            viewTiles ? ( <TilesList /> ) : null
        }

        {
            viewMarbles ? ( <MarblesList /> ) : null
        }

        {
            createOrder ? ( <Order /> ) : null
        }

        {
            viewOrder ? ( <OrdersList /> ) : null
        }

    </div>
    )
  )
}

export default Dashboard
