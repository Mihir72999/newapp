
import { createContext, useContext ,useReducer} from 'react'

const AppContext = createContext()

const AppProvider = ({children})=>{
    const initialState={
        image:[
          {image: " https://zapvi.in/wp-content/uploads/2021/02/APPLEIPHONEX1770-247x357.jpg" , href:'/blog',price:'120',name:''},
          {image: "https://zapvi.in/wp-content/uploads/2022/03/H-APPLEIPHONE12PRO-1714-247x357.jpg",href:'/case-',price:'130',name:'soft-silicon-cover'},
         {image:" https://zapvi.in/wp-content/uploads/2022/11/H-SAMSUNGGALAXYS22PLUS-2653-247x357.jpg",href:'/',price:'99',name:''},
         {image: "https://zapvi.in/wp-content/uploads/2021/03/SAMSUNGGALAXYS21PLUS1811-247x371.jpg",href:'/',price:'120',name:''},
         {image: "https://zapvi.in/wp-content/uploads/2023/03/H-SAMSUNGGALAXYS235G-1734-247x329.jpg",href:'/',price:'130',name:''},
         {image: "https://zapvi.in/wp-content/uploads/2022/08/H-SAMSUNGGALAXYS22ULTRA-1158-247x357.jpg",href:'/',price:'120',name:''}
        
        
        ],
        isLoading:false,
        isError:false,
        data:{
            heading:'SHOP WITH CONFIDENT',
            title:'Delivering Quality Product to your Doorstep',
            button:'ADDCART'}
      
         }   
    
    const reducer = (state,action)=>{
        switch(action.type){
            case"PAGE_LOADING":
            return{
             ...state,
             isLoading:true
            }
            case "ADD_IMAGES":
              return {...state ,isLoading:false}
             case"'PAGE_ERROR'":
             return{
                ...state,
                isLoading:false,
                isError:true
             }

        }

        return {...state}

    }
            
    const displayData = () =>{
        dispatch({type:'PAGE_LOADING'})
       try{

           dispatch({type:'ADD_IMAGES'})
       }catch(error){
        dispatch({type:'PAGE_ERROR' , payloae:error.message})
       }
    }
   
    const  [state, dispatch] = useReducer(reducer, initialState)
    return <AppContext.Provider value={{...state , displayData }}>{children}</AppContext.Provider>
}

const useGlobalContext = () =>{
    return useContext(AppContext)
}
export {AppProvider , useGlobalContext  }