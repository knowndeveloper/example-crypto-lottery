import { useState, useEffect } from 'react'
import './App.css'
import { Navbar, Lotteries } from './components/general'
import {Modal} from './components/modal/Modal'
import Spinner from './components/spinner/Spinner'
const lotteryContract = require('./artifacts/contracts/Lottery.sol/LotteryGame.json');

function App() {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentBalance, setCurrentBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const checkNetwork = async () => {
    console.log("Checking network...")
    try { 
      const {ethereum} = window;
      if (currentAccount && ethereum.networkVersion !== '31337') {
        setModalIsOpen(true);
      }
    } catch(error) {
      console.log(error)
    }
  }

  const renderSpinner = () => {
    return(isLoading && <Spinner/>)
  }

  const switchNetwork = async () => {
    try {
      console.log('switching network...')
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x7A69' }],
      });
    } catch {
      console.error(error);
    }
  }

  useEffect(() => {
    checkNetwork()
  }, [currentAccount])

  return (
    <div className="flex flex-col">
      {renderSpinner()}
      <div className="gradient-bg-welcome">
      <Navbar
       account={currentAccount}
       setCurrentAccount={setCurrentAccount}
       balance={currentBalance}
       setCurrentBalance={setCurrentBalance}/>
      </div>
      <Lotteries
       account={currentAccount}
       setIsLoading={setIsLoading}
       setCurrentBalance={setCurrentBalance}/>
      <Modal open={modalIsOpen} setModalIsOpen={setModalIsOpen} callback={switchNetwork}/>
    </div>
  )
}

export default App