import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const PublicRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    if(user){
        if(user.user.role == "admin"){
            return <Navigate to={"/admin"} replace/>
        }
        return <Navigate to={"/"} replace/>
    }
    return children
}
export default PublicRoute