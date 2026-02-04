'use client';

import React from 'react'
import './AppDownlaod.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience <br/>Tomato App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store?.src || assets.play_store} alt="Play Store" />
            <img src={assets.app_store?.src || assets.app_store} alt="App Store" />
        </div>
    </div>
  )
}

export default AppDownload