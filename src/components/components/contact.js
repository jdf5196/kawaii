import React from 'react';
import Toastr from 'toastr';

const Contact = (props)=>{
    const submitForm=(e)=>{
        e.preventDefault();
        let email = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        }
        $.ajax({
            type: 'POST',
            url:'/sendemail',
            data: email,
            success: (data)=>{
                Toastr.options.positionClass = 'toast-top-center';
                Toastr.success(`Message Sent`);
                document.getElementById('name').value = "";
                document.getElementById('email').value = "";
                document.getElementById('message').value = "";
            },
            error: (data)=>{
                console.log(data)
                Toastr.options.positionClass = 'toast-top-center';
                Toastr.error(`Error. Message Not Sent`);
            }
        })
    }
    return (
        <div className='contactContainer'>
            <h1>Send us a Message</h1>
            <hr />
            <form className='contactForm' name='Contact Form' onSubmit={(event)=>{submitForm(event)}}>
                <input id='name' class='contactInput inputText' type='text' placeholder=' ' required />
                <p className='label nameLabel'>Name *</p>
                <input id='email' class='contactInput inputText' type='email' placeholder=' ' required />
                <p class='label emailLabel'>Email Address *</p>
                <textarea id='message' class='contactInput message' placeholder=' ' required></textarea>
                <p class='label messageLabel'>Message *</p>
                <button type='submit' class='submitButton'> Send </button>
            </form>
        </div>
    )
}

export default Contact;