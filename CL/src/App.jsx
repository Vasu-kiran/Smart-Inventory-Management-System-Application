
import { Routes ,Route, Navigate } from 'react-router-dom'
import './index.css'
import HomePage from './Pages/HomePage'
import HomePage2 from "./CopiedComps/HomePage";
import SignIn from './Pages/SignIn'
import SignIn2 from "./CopiedComps/SignIn";
import SignUp from './Pages/SignUp'
import SignUp2 from "./CopiedComps/SignUp"


import Inwards from './Pages/Inwards'
import Outwards from './Pages/Outwards'

import Godowns from './Pages/Godowns'
import AdminAccount from './Pages/AdminAccount'
import UserAccount from './Pages/UserAccount'
import Emp from './Pages/Emp'
import AddEmp from './Pages/AddEmp'


import AddGodown from './Pages/AddGodown'
import UpdateGodown from './Pages/UpdateGodown'
import AddInward from './Pages/AddInward'
import UpdateEmployee from './Pages/updateEmployee'
import Products from './Pages/Products'
import AddProduct from './Pages/AddProduct'
import UpdateProduct from './Pages/UpdateProduct'
import Returns from './Pages/Returns'
import AddReturns from './Pages/AddRetuns'
import AddOutward from './Pages/AddOutward'
import UnAuthenticated from './Pages/UnAuthenticated';
import Reports from './Pages/Reports';





function App() {
  
 

  Routes
    return (
      <div>
        <Routes>
        <Route path="/" element={<HomePage2/>}/>
        <Route path="/signin" element={<SignIn2/>}/>
        <Route path="/signup" element={<SignUp2/>}/>
        <Route path="/Account" element={<AdminAccount/>}/>
        <Route path="/userAccount" element={<UserAccount/>}/>
        <Route path="/employees" element={<Emp/>}/>
        <Route path="/addEmployee" element={<AddEmp/>}/>
        {/* <Route path="/updateEmployee/:userId" element={<UpdateEmployee />} /> */}
        <Route path="/updateEmployee/:userId" element={<UpdateEmployee/>}/>
        <Route path="/updateGodown/:id" element={<UpdateGodown />} />
        <Route path="/godowns" element={<Godowns/>}/>
        <Route path="/addGodown" element={<AddGodown/>}/>
        <Route path="/inwards" element={<Inwards/>}/>
        <Route path="/addInward" element={<AddInward/>}/>
        <Route path="/outwards" element={<Outwards/>}/>
        
        <Route path="/products" element={<Products/>}/>
        <Route path="/addProduct" element={<AddProduct/>}/>
        <Route path="/updateProduct/:id" element={<UpdateProduct/>}/>
        <Route path="/returns" element={<Returns/>}/>
        <Route path="/addReturn" element={<AddReturns/>}/>
        <Route path="/addOutward" element={<AddOutward/>}/>
        <Route path="/unauthorized" element={<UnAuthenticated/>}/>
        <Route path="/reports" element={<Reports/>}/>
        

        // new ones for testing 

        <Route path="/signIn" element={<SignIn2/>}/>
        <Route path="/homePage" element={<HomePage2/>}/>
        <Route path="/signUp" element={<SignUp2/>}/>
        
        
        </Routes>
      </div>
     
    )
  }


export default App
