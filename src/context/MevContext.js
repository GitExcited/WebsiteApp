import React,{useEffect,useState} from 'react';
import {ethers} from 'ethers';
import {contractABI,contractAddress, usdtAddress} from '../utils/constants'

export const MevContext = React.createContext();
/// Getting contract  //
const {ethereum} = window;
const getEthereumContract =()=>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const mevContract = new ethers.Contract(contractAddress,contractABI,signer);
    return mevContract //! HUGE STEP. This contract holds all the functions for the contract
}
//

// Creating context //
export const MevProvider= ({children})=>{
    const [currentAccount,setCurrentAccount]=useState('')
    const [formData, setformData] = useState({ amount: "", length:""});//We pass these states to welcome.jsx
    

    const handleChange = (e, name) => { // Function that updates the from data. Kinda complicated
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
      };


    const checkIfWalletIsConnected = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
    
          if (accounts.length) {
            setCurrentAccount(accounts[0]);
    
            getAllTransactions();
          } else {
            console.log("No accounts found");
          }
        } catch (error) {
          console.log(error);
        }
      };

      

      const buyMEV = async()=>{
        //   try { 
        // if (!ethereum) return alert("Please install MetaMask.");

        const {amount} = formData;// we get access to these data variables from welcome.jsx when the handleSubmit() function is called there
        // const mevContract = getEthereumContract();//! we are getting the contract and all its functions
        // const parsedAmount = ethers.utils.parseEther(amount);// transforms decimal amount of eth into gwei hex
        
        // const transac = await ethereum.request({
        //         method:'eth_sendTransaction',
        //         params:[{
        //             from:currentAccount,
        //             to:contractAddress,
        //             gas:'0x52081',// hex value in gwei. This number is 21000 gwei. 
        //             value:parsedAmount._hex, //value of eth the user wants to send transformed to hex gwei

        //         }]

        //     })
            
        //     //? We could store transaction count in storage using localStorage.getItem('transactionCount') Might need this
        
    
        //   } catch (error) {
        //     console.log(error)
        //     throw new Error('No ethereum object.')
        //   }
        console.log(amount)
      }
      const lockMEV = async()=>{
        try { 
      if (!ethereum) return alert("Please install MetaMask.");

      const {amount,length} = formData;
      const mevContract = getEthereumContract();
      const decimalMev = BigInt(amount*10**18);

      console.log(mevContract)
      await mevContract.lockMev(decimalMev,length)
        

          //? We could store transaction count in storage using localStorage.getItem('transactionCount') Might need this
      
  
        } catch (error) {
          console.log(error)
          throw new Error('No ethereum object.')
        }
    }
    const distributeMEV= async()=>{
        const {amount} = formData;
        // const mevContract = getEthereumContract();
        // const decimalMev = BigInt(amount*10**18);
  
        // console.log(mevContract)
        // await mevContract.lockMev(decimalMev,length)
          
  
        //     //? We could store transaction count in storage using localStorage.getItem('transactionCount') Might need this
        
    
        //   } catch (error) {
        //     console.log(error)
        //     throw new Error('No ethereum object.')
        //   }
        console.log(amount)
    }
    const getUSDT= async()=>{
        try { 
            if (!ethereum) return alert("Please install MetaMask.");
    
            const {amount} = formData;
            const mevContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            
            const transac = await ethereum.request({
                    method:'eth_sendTransaction',
                    params:[{
                        from:currentAccount,
                        to:usdtAddress,
                        gas:'0x52081',// hex value in gwei. This number is 21000 gwei. 
                        value:parsedAmount._hex, //value of eth the user wants to send transformed to hex gwei
    
                    }]
    
                })
                
                //? We could store transaction count in storage using localStorage.getItem('transactionCount') Might need this
            
        
              } catch (error) {
                console.log(error)
                throw new Error('No ethereum object.')
              }
    }

    const connectWallet= async()=>{
        try {
            if(!ethereum) return alert ('Please Install Metamask')

            const accounts = await ethereum.request({method:'eth_requestAccounts'})

            setCurrentAccount(accounts[0])

        } catch (error) {
                console.log(error)
                throw new Error('No ethereum object.')
        }
    }
    useEffect(()=>{
        checkIfWalletIsConnected();
    },[])
    return(
        <MevContext.Provider value ={{connectWallet,currentAccount, formData, handleChange,buyMEV,lockMEV,distributeMEV,getUSDT}}>
            {children}
        </MevContext.Provider>
    )

}