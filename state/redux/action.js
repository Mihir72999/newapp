
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
  cart:  typeof window !== 'undefined' && localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart'))
  : [],
  length:0

};

const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    addProduct(state, action) {
     const itemExist = state.cart.some(e=>e.select === action.payload.select)
     if(itemExist  ) {
      
       toast.warn(`${action.payload.select} already exist`)
     }else{
       state.cart.push(action.payload)
      
       toast.success("your item has been added in cart!")
     }  

      const data = state.cart.reduce((item ,total)=>{
        const {amount } = total
        item = item + amount 
         return item
      },0)

     
      try{
        
        localStorage.setItem('cart', JSON.stringify(state.cart))
         localStorage.setItem('subtotal',JSON.stringify(data))
         
                
      

      }catch(error){
      console.log(error)
      localStorage.clear()
      }
      
    },
    deletedata(state, action) {
      
         const data  =  state.cart.filter(item => item.select !== action.payload)
      const datas = data.reduce((item ,total)=>{
        const {amount } = total
        item = item + amount 
        return item
      },0)
     
      state.cart = data
      
      try{
        localStorage.setItem('cart', JSON.stringify(state.cart))

        
        localStorage.setItem('subtotal',JSON.stringify(datas))
      
      
      }catch(error){
     console.log(error)
     localStorage.clear()
      }
    },

    



  }
})

export default actionSlice.reducer
export const { addProduct, deletedata } = actionSlice.actions
