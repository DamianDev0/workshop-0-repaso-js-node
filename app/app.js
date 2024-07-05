//nos creamos app para pasarsela al index
import {Router} from "./Router";

export function App(){
   const root = document.getElementById('root')
   if (!root){
    throw new Error('Cannot find root')
   }
   Router()

}


