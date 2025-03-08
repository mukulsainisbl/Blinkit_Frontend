import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./allroutes/index.jsx";
import {Provider} from "react-redux"
import { store } from "./Store/Store.jsx";
createRoot(document.getElementById("root")).render(
 
 <Provider store={store}>

   <RouterProvider router={router} />
 </Provider>
  

 
);
