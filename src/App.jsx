import {Navbar,Welcome,Footer,Services,Transactions} from './components/index.js'


const App=()=> {
  return (   
  <div className='min-h-screen'>
    <div className="gradient-bg-welcome">
      <Navbar/>
      <Welcome/>
    </div>
    
    <Transactions/>
    
    <Footer/>
  </div>
   
  )
}

export default App
