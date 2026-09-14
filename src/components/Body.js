import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import Browse from "./Browse";
import {RouterProvider,createBrowserRouter} from "react-router-dom";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";

const Body = ()=>{
    const dispatch = useDispatch();
  

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, uid } = user;
                dispatch(addUser({ displayName:displayName, email:email, uid:uid }));
               
            } else {
                dispatch(removeUser());
            
            }
        });

        return unsubscribe;
    }, [dispatch]);

    const appRouter=new createBrowserRouter(
        [
            {
                path:"/",
                element:<Login/>,
            },
            {
                path:"/browse",
                element:<Browse/>
            },
        ]
    )
    return(
        <div>
          <RouterProvider router={appRouter}/>
        </div>
    );
};
export default Body;