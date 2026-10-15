import {createBrowserRouter, RouterProvider} from "react-router"
import Register from "../features/auth/Register"
import Profile from "../features/profile/Profile"
import { Children } from "react"


export const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/profile",
        element: <Profile/>
    }
])


const AuthRoutes = (children)=> {
    return <RouterProvider router={router}/>
} 

export default AuthRoutes;