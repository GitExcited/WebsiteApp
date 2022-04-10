import React, { useContext,useEffect } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import {contractAddress,usdtAddress} from '../utils/constants';

import { MevContext } from "../context/MevContext.jsx";
import { Loader } from ".";
const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange,step }) => (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      step={step}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );
const Button = ({name,handleSubmit,text})=>(
  <button
    type="button"
    name={name}
    onClick={(e)=>handleSubmit(e,name)}
    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
    >
      {text}
    </button>
                   
)

const Welcome= ()=>{
  const{connectWallet,currentAccount,formData,handleChange,buyMEV,lockMEV,distributeMEV,getUSDT } = useContext(MevContext); //bringing blockchain data from mevcontext.jsx

  

    const handleSubmit = (e,name)=>{// Destructures all elements from the form
        const {amount,length} = formData;
        e.preventDefault();   //prevents reload
        if(!amount) return;// if user didnt submit all fields, return nothing
        (e)=>handleChange(e,name);
        switch(name){
          case 'buy':buyMEV(); break;
          case 'lock': lockMEV();break;
          case 'distribute':distributeMEV();break;
          case 'usdt': getUSDT();break;
        }
        
  }
  
    return (
        <div className="flex w-full justify-center items-center">
          <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
            <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
              <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                Mine with MEV <br /> High APY
              </h1>
              <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                Start investing in a diversified crypto token. Invest in the future of crypto.
              </p>
              <p className="text-left text-xs mt-5 text-white font-light md:w-9/12 w-11/12 ">
                Mev Contract: {contractAddress}
                <br/>
                USDT Contract: {usdtAddress}
              </p>
              {!currentAccount && (
                <button
                  type="button"
                  onClick={connectWallet}
                  className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                >
                  <AiFillPlayCircle className="text-white mr-2" />
                  <p className="text-white text-base font-semibold">
                    Connect Wallet
                  </p>
                </button>
              )}
    
              <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-5">
                <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                  Reliability
                </div>
                <div className={companyCommonStyles}>Security</div>
                <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
                  Ethereum
                </div>
                <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
                  Web 3.0
                </div>
                <div className={companyCommonStyles}>Low Fees</div>
                <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                  Blockchain
                </div>
              </div>
              <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center orange-glassmorphism mt-5">
                <Input placeholder="Amount (ETH) 1 ETH = 50 000USDT" name="amount" type="number" step='0.0001'  handleChange={handleChange} />
                <div className="h-[1px] w-full bg-orange-400 my-2" />
                    <Button name='usdt' handleSubmit={handleSubmit} text='Get USDT (dev)'/>
                   
              </div>
              <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center orange-glassmorphism mt-5">
                <Input placeholder="Amount (MEV)" name="amount" type="number" step='1'  handleChange={handleChange} />
                <div className="h-[1px] w-full bg-orange-400 my-2" />
                    <Button name='distribute' handleSubmit={handleSubmit} text='Distribute MEV (Only Owner)'/>
                   
              </div> 

            </div>
    
            <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
              <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                <div className="flex justify-between flex-col w-full h-full">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                      <SiEthereum fontSize={21} color="#fff" />
                    </div>
                    <BsInfoCircle fontSize={17} color="#fff" />
                  </div>
                  <div>
                    <p className="text-white font-light text-sm">
                      {/* {shortenAddress(currentAccount)} */}
                    </p>
                    <p className="text-white font-semibold text-lg mt-1">
                      Ethereum
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                <Input placeholder="Amount (ETH)" name="amount" type="number" step='0.0001'  handleChange={handleChange} />
                <div className="h-[1px] w-full bg-gray-400 my-2" />
                    <Button name='buy' handleSubmit={handleSubmit} text='Buy MEV'/>
                   
              </div>
              <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center mt-5 blue-glassmorphism">
                <Input placeholder="Length (days)" name="length" type="number" step='1'  handleChange={handleChange} />
                <Input placeholder="Amount (MEV)" name="amount" type="number" step='0.1' handleChange={handleChange} />
                {/* <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} /> */}
    
                <div className="h-[1px] w-full bg-gray-400 my-2" />
    
               
                <Button name='lock' handleSubmit={handleSubmit} text='Lock MEV'/>

                   
              </div>
            </div>
          </div>
        </div>
      );
}
export default Welcome;