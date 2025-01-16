import FormToSingUp from '@/app/components/auth/FormToSingUp'
import React from 'react'


function Page() {
  const input = [{
    type: "text",
    placeholder: "Name",
    id: "Name",
    name: "name",
    dec: 'Name',
    htmlFor: 'Name'
  }, {
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
  }, {
    type: "password",
    placeholder: "Password Confirmation",
    id: "Password Confirmation",
    name: "password_confirmation",
    dec: 'Password Confirmation',
    htmlFor: 'Password Confirmation'
  }]

  return (
    <div className='flex items-center h-screen justify-center'>
      <FormToSingUp 
        input={input} 
        btn="Submit" 
        footer='Already Have An Account ?!' 
        link="Login In to Your Account"
      />
       
    </div>
  )
}

export default Page;
