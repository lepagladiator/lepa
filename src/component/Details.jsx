import React from 'react'
import { useState } from 'react'
import Ethereum from '../assets/Ethereum.webp'

export default function Details(props) {
  const [add,setAdd]=useState("")
  const [wid,setWid]=useState("")
  const clickHandelerAdd = async()=>{
    await props.state.web3.eth.sendTransaction({from:props.address,to:"0x85843ee52f203c696d3fb57bce31a5e5a0ee8485",value:props.state.web3.utils.toWei(add,"ether")}).then((data)=>console.log(data));
    await props.state.contract.methods.players(props.address).call().then((balance)=>{props.setBalance(props.state.web3.utils.fromWei(balance,"ether"))});
  }
  const clickHandelerWid = async()=>{
    const st = wid.toString();
    const amount = props.state.web3.utils.toWei(st,"ether");
    await props.state.contract.methods.Withdrawal(amount).send({ from: props.address }).then((data)=>console.log(data));
    await props.state.contract.methods.players(props.address).call().then((balance)=>{props.setBalance(props.state.web3.utils.fromWei(balance,"ether"))});
    }
  const changeHandel=(event)=>{
    const amount = parseFloat(event.target.value)
    if (amount > props.balance) {
      setWid(props.balance)
    } else { setWid(amount) }
  }

  return (
    <div className='w-2/5 my-4 px-4'>
      <div className='rounded-2xl h-72 p-5 relative sdk'>
        <div className='flex items-center justify-between'>
          <div className='rounded-full border-2 border-white p-2'>
            <img className='h-16 w-16' src={Ethereum} alt="Ethereum Logo"/>
          </div>
          <p className='text-white text-3xl font-medium'>{props.balance+" ETH"}</p>
        </div>
        <p className='text-white text-xl mt-auto absolute bottom-0 mb-5'>{props.address}</p>
      </div>
      <div className='flex my-5 mx-5'>
        <input onChange={(event)=>{setAdd(event.target.value)}} value={add} className="focus:outline-none focus:ring-1 focus:ring-gray-100 rounded w-3/4 text-xl text-gray-300 border border-gray-400 placeholder-gray-400 bg-transparent pl-10" type="number" placeholder="Add Amount" />
        <button onClick={clickHandelerAdd} className='py-2 bg-gray-600 hover:bg-gray-800 w-1/4 text-xl text-gray-400 font-medium rounded'>Add Balance</button>
      </div>
      <div className='flex my-5 mx-5'>
        <input onChange={changeHandel} value={wid} className="focus:outline-none focus:ring-1 focus:ring-gray-100 rounded w-3/4 text-xl text-gray-300 border border-gray-400 placeholder-gray-400 bg-transparent pl-10" type="number" placeholder="Withdrawal Amount" />
        <button onClick={clickHandelerWid} className='py-2 bg-gray-600 hover:bg-gray-800 w-1/4 text-xl text-gray-400 font-medium rounded'>Withdrawal</button>
      </div>
    </div>
  )
}
