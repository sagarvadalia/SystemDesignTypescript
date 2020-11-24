import React from 'react'

interface loginProps {

}

export const Login: React.FC<loginProps> = ({ }) => {
  return (
    <div>
      Username: <input type="text" />

      Password: <input type="password" />
    </div>



  );
}


