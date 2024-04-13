import {useParams} from "react-router-dom";
export default function EditPage(){
    const {id} = useParams(); 
    return (
    <div>This is an edit page of the placeS {id}</div>
    )
}