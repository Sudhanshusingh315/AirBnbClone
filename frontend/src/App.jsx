import "./App.css";
import {Routes,Route} from 'react-router-dom'
import Login from "./pages/Login";
import LayOut from "./components/LayOut";
import Register from "./pages/Register";
import Index from "./pages/Index";
import PrivateRoute from "./components/PrivateRoute";
import Account from "./pages/Account";
import EditPage from "./pages/EditPage";
import SinglePage from "./pages/SinglePage";
import MoreImages from "./pages/MoreImages";
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
        <Route path="/account/places/new/:id" element={<EditPage/>}/>
      </Route>
      <Route path="/places/:id" element={<SinglePage/>}/>
      <Route path="/places/Images/:id" element={<MoreImages/>}/>
    </Route>
  </Routes>
  </>
}

export default App;
