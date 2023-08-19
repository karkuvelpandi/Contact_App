import React, { useEffect, useState } from 'react';
import { setAppOffline } from './redux/app.slice';
import { useDispatch, useSelector } from "react-redux"
const App = () => {
  const dispatch = useDispatch()

  const isOffline = useSelector((state: any) => state.app.isOffline)

  useEffect(() => {
    const listenOnline = () => dispatch(setAppOffline(false))
    const listenOffline = () => dispatch(setAppOffline(true))
    window.addEventListener("online", listenOnline)
  }, []);




  return <div className='flex justify-center'>
    Template ready
  </div>
}

export default App;
