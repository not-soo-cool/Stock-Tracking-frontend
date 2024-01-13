import React, { useEffect, useState } from 'react'
import './Contact.css'
import { useDispatch, useSelector } from 'react-redux'
import { contactUs, loadUser } from '../../../Actions/UserAction';
import { useAlert } from 'react-alert';

const Contact = () => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const [contact, setContact] = useState({"name": "", "email": "", "num": "", "subj": "", "msg": ""})

  const { message, error } = useSelector((state) => state.contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => {
      return {...prev, [name]: value}
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(contactUs(contact.name, contact.email, contact.num, contact.subj, contact.msg));
    // dispatch(loadUser());
  }

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch({type: "clearErrors"});
    }
    if(message){
      alert.success(message);
      dispatch({type: "clearMessage"});
    }
  }, [alert, message, error, dispatch]);

  return (
    <div className='contactus'>
      <section>
        <div className="contactusform">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box first">
              <input name='name' type="text" placeholder='Full Name' onChange={handleChange}/>
              <input name='email' type="email" placeholder='Email Address' onChange={handleChange}/>
            </div>

            <div className="input-box second">
              <input name='num' type="number" placeholder='Mobile Number' onChange={handleChange}/>
              <input name='subj' type="text" placeholder='Subject' onChange={handleChange}/>
            </div>

            <div className="input-box fifth">
                <textarea name="msg" id="" placeholder='Your Message' onChange={handleChange}></textarea>
            </div>

            <div className="input-box sixth" style={{
              marginTop: '10px'
            }}>
              <input type="submit" value='Submit' id='btn' style={{
                width: '15%'
              }} />
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Contact
