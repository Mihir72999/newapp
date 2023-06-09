
import { Button, Typography , Link, Box, Breadcrumbs, BottomNavigation, BottomNavigationAction } from '@mui/material'
import Style from './products.module.css'
import { Add,Remove, ArrowDownward, Home, AddShoppingCartRounded } from '@material-ui/icons'
import { useState ,useEffect } from 'react'
import {useGetproductQuery} from '../../../state/redux/findproducts'
import LoadingBar from 'react-top-loading-bar'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../../state/redux/action'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

import mongoose from 'mongoose'
import Product from '../../../schema/product'




const product = ({moredata }) => {
const router = useRouter()
  const { isFetching ,isError} = useGetproductQuery()
  const [qty , setQty] = useState(1)

const [progress, setProgress] = useState(0)
const [select , setSelect] = useState(moredata.brandmodel)

const dispatch = useDispatch()

useEffect(()=>{
  setProgress(100)
  },[100])
   
if(isFetching){
 
  return <LoadingBar className='loadingbar' height={63}  color='#FFFFFF'  progress={progress} waitingTime={800} onLoaderFinished={() => setProgress(0)}/>
}
if(isError){
  return <div>you have to bad request check your internet connection</div>
}
const {availableQty , image , name , price  , _id , brand} = moredata
const amount = qty * price
const handleClick = (e) =>{
 dispatch(addProduct(e))
    }
    const handleHome = () =>{
      router.push('/')
      }   
  return (
    <>
           <ToastContainer />
    <div className='final'>
       <div className='final-img' >
     
        <div className='product-img'>
          <img height={600} width={400} className='productimg' src={moredata.image} alt={moredata.brandmodel}/></div>
      </div>
        <div className='font'>
        <Box mt={10}>
            <Breadcrumbs area-label='breadcrumb'>
                <Link underline="hover" href="/">Home</Link>
                <Link underline="hover" href="/case-soft-silicon-cover">Case</Link>
               
                <Typography color='text.primary' >{moredata.name}</Typography> 
            </Breadcrumbs>

           </Box>
          <div><Typography className='text-m mt-10' variant='h5'>{moredata.name}</Typography></div>
       <div> <Typography className='' variant='h6'><del className='mx-10'>₹{moredata.price * 2 - 40}</del>₹{moredata.price}</Typography></div>
          <div className='free-delivery '><Typography variant='h5'>Order above upto ₹ 300.00 and get <span className='span'> FREE DELIVERY</span>  </Typography>
          <p>just add items worth ₹300 or more at across all over the store in cart you will get diivery free</p>
          </div>
          <div className='d-flex gap mt-5'><div className='h-20 '><img height={12} width={1} className='h-10' src='https://zapvi.in/wp-content/uploads/2021/04/feather.png' alt=''/></div><p>Thin & Soft Silicone Rubber case</p></div>
          <div className='d-flex gap '><div className='h-20 '><img height={12} width={1} className='h-10' src='https://zapvi.in/wp-content/uploads/2021/04/mobile.png' alt=''/></div><p>Full Camera Protective Case</p></div>
          <div className='d-flex gap '><div className='h-20 '><img height={12} width={1} className='h-10' src='https://zapvi.in/wp-content/uploads/2022/03/rating-1.png' alt=''/></div><p>Half edge Smooth Printing on Side</p></div>
          <div className='d-flex gap '><div className='h-20 '><img height={12} width={1} className='h-10' src='https://zapvi.in/wp-content/uploads/2021/04/photography.png' alt=''/></div><p>Photo-realistic print quality</p></div>
          <div className='d-flex gap '><div className='h-20 '><img height={12} width={1} className='h-10' src='https://zapvi.in/wp-content/uploads/2021/04/return-box.png' alt=''/></div><p>Hassle-free replacements</p></div>
          <div className='d-flex gap '><div className='h-20 '><img height={12} width={1} className='h-10' src='https://zapvi.in/wp-content/uploads/2021/04/shipping-and-delivery.png' alt=''/></div><p>Delivery in 5-7 working days</p></div>
       
      <div className='section'>
       
      <div className={Style.brand} >{moredata.brand.toUpperCase()}</div>
      <div className={Style.brands}>{moredata.brandmodel.toUpperCase()}</div>

      </div>
      <div className="cart_add"><p>availablity:{" "}<strong>{moredata.availableQty}</strong>{" "}<span>in Stoke</span></p><div className='cart_add_Qty'><Remove style={{cursor:'pointer' , border:'0.5px solid rgb(110, 107, 107)',scale:'1.2'}}   onClick={()=>setQty(qty > 1 ? qty - 1 : qty)}/><b>{qty}</b><Add style={{cursor:'pointer' , border:'0.5px solid rgb(110, 107, 107)',scale:'1.2'}} onClick={()=>setQty(moredata.availableQty > qty ? qty + 1 : moredata.availableQty)} /></div></div>
          <div className={Style.button}> <Button  style={{ margin:'5px 0', borderRadius:'20px 20px 20px 20px',background: "#c6e2ff"}} onClick={()=>handleClick({ brand , image , amount , _id ,name, select ,availableQty , qty})}  color='primary'   variant='outlined'>Add To Cart</Button></div>

      </div>
      </div>
      <div className={Style.bottom}>
        <div className={Style.home} title='go back to home'><Home onClick={handleHome}/></div>
        <div className={Style.cart} title='Add to Shoping Cart'><AddShoppingCartRounded onClick={()=>handleClick({ brand , image , amount , _id ,name, select ,availableQty , qty})}/></div>

      </div>
      </>
  )
}
export async function getStaticPaths(context) { 

    if(!mongoose.connections[0].readyState){
      await mongoose.connect(process.env.MONGO_URI)
    }

  
  
  const data = await Product.find({})
  
const paths = await data.map((e)=>{
 
  return{
    params:{products:`${e.name}`}
  } 
})
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }


}

export async function getStaticProps({params} ) {


    if(!mongoose.connections[0].readyState){
      await mongoose.connect(process.env.MONGO_URI)
    }

  const name = params.products
  const moredata = await Product.findOne({name})

  return {
 
    props: { moredata:JSON.parse(JSON.stringify(moredata)) }
    
  }


}



export default product
