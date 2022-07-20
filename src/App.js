import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'


import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Account from './pages/Account'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import CoinPage from './pages/CoinPage'
import Footer from './components/Footer'
import { AuthContextProvider } from './context/AuthContext'





function App() {

  
  const [coins, setCoins] = useState([])

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'

  useEffect ( () => {
    axios.get(url).then((response) => {
      setCoins(response.data)
      // console.log(response.data)
    })
  }, [url])


  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home coins={coins}/>} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/Account' element={<Account />} />

          <Route path='/coin/:coinId' element={<CoinPage />}>
            <Route path=':coinId' />
          </Route>

        </Routes>
        <Footer />
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default App