import "./App.css";
import {Routes,Route} from 'react-router-dom'
import Login from "./pages/Login";
import LayOut from "./components/LayOut";
import Register from "./pages/Register";
import Index from "./pages/Index";
import PrivateRoute from "./components/PrivateRoute";
import Account from "./pages/Account";
function App() {
  return <>
  <Routes>
    <Route path="/" element={<LayOut/>}>
      <Route index path="/" element={<Index/>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register/>}/>
      {/* account page should be a private route */}
      <Route path = "" element={<PrivateRoute/>}>
        <Route path="/account/:subpage?" element={<Account/>}/> 
        <Route path="/account/:subpage/:action" element={<Account/>}/> 
      </Route>
    </Route>
  </Routes>
  </>
}

export default App;
