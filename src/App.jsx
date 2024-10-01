import React from 'react'
import Connect from './component/Connect'
import Details from './component/Details'
import Machine from './component/Machine'
import { useState } from 'react'

function App() {
  const [address,setAddress]=useState("Address")
  const [balance,setBalance]=useState("Balance")
  const [state,setState]=useState({
    web3:null,
    contract:null
  })
  const saveState=async(state)=>{
    let tam;
    setState(state);
    await state.web3.eth.getAccounts().then((account)=>{setAddress(account[0]);tam=account[0];});
    await state.contract.methods.players(tam).call().then((balance)=>{setBalance(state.web3.utils.fromWei(balance,"ether"))});
  }
  return (
    <>
    <Connect saveState={saveState}/>
    <div className='flex px-20'>
      <Details state={state} address={address} balance={balance} setBalance={setBalance}/>
      <Machine state={state} address={address} balance={balance} setBalance={setBalance}/>
    </div>
    </>
  )
}

export default App
