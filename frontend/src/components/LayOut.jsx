import Header from "./Header";
import {Outlet} from 'react-router-dom'
export default function LayOut(){
    return(
        <>
        <Header/>
        <Outlet />
        </>
    )
}