/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react';
import './App.css';
import AuthPage from './pages/auth'

function App() {
  const [ email, set_login ] = useState('')
  const [ password, set_password ] = useState('')
  const [page, set_page] = useState(<></>)
  useEffect(() => {
    set_page(
      <AuthPage
        set_login={set_login}
        set_password={set_password}
        set_page={set_page}
        login={email}
        password={password}
      />
    )
  }, [email, password])
  return (
    <div className="App">
      { page }
    </div>
  );
}

export default App;
