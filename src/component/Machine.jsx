import React from 'react'
import { useState } from 'react'

export default function Machine(props) {
  const [bit, setBit] = useState(0.000001);

  const [result, setResult] = useState(["A", "A", "A"]);

  const changeHandel = (event) => {
    const amount = parseFloat(event.target.value)
    if (amount > props.balance) {
      setBit(props.balance)
    } else if (amount < 0.000001) {
      setBit(0.000001)
    } else { setBit(amount) }
  }

  const roll = async (event) => {
    event.target.disabled = true;
    const st = bit.toString();
    const amount = props.state.web3.utils.toWei(st, "ether");
    const myIntarval=setInterval(generateRandomArray,100);
    try{
      await props.state.contract.methods.roll(amount).send({ from: props.address });
      await props.state.contract.methods.rollData().call().then((data)=>{console.log(data);clearInterval(myIntarval);setResult(data);});
      await props.state.contract.methods.players(props.address).call().then((balance)=>{props.setBalance(props.state.web3.utils.fromWei(balance,"ether"))});
      event.target.disabled = false;
    } catch(error){
      clearInterval(myIntarval);
      setResult(["A", "A", "A"]);
      alert("intarnal error");
      event.target.disabled = false;
    }
    // props.setBalance(props.balance - bit);
  }

  const options = ["A", "B", "C", "D"];

  const generateRandomArray = () => {
    const randomArray = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * options.length);
      randomArray.push(options[randomIndex]);
    }
    setResult(randomArray);
  }
  
  return (
    <div className='w-3/5 px-10 flex items-center justify-center'>
      <div>
        <div className='h-[482.17px] w-[723.333px] ibg flex justify-center items-center'>
          <div className='flex pt-[58px] -ml-[15px] gap-6'>
            {
              result.map((data, index) => {
                return (<p key={index} className='bg-white text-6xl font-bold p-4'>{data}</p>)
              })
            }
          </div>
        </div>
        <div className='flex my-5 w-3/5 mx-auto'>
          <input onChange={changeHandel} value={bit} className="focus:outline-none focus:ring-1 focus:ring-gray-100 rounded w-3/4 text-xl text-gray-300 border border-gray-400 placeholder-gray-400 bg-transparent pl-10" type="number" placeholder="Bet Amount" />
          <button onClick={roll} className='py-2 bg-red-600 hover:bg-red-800 w-1/4 text-xl text-white font-semibold rounded'>ROLL</button>
        </div>
      </div>
    </div>
  )
}
