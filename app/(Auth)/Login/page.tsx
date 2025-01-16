import FormToLogIn from '@/app/components/auth/FormToLogIn';

import React from 'react'


function Page() {
  const input = [ {
    type: "email",
    placeholder: "Email",
    id: "Email",
    name: "email",
    dec: 'Email',
    htmlFor: 'Email'
  }, {
    type: "password",
    placeholder: "Password",
    id: "Password",
    name: "password",
    dec: 'Password',
    htmlFor: 'Password'
  }]

  return (
    <div className='flex items-center h-screen justify-center'>
      <FormToLogIn
        input={input} 
        btn="Login" 
        footer="Don't have Account?! SingUs with us " 
        link="click here"
      />
       
    </div>
  )
}

export default Page;
