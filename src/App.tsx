import React, { useEffect, useState } from 'react';
//components
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingCardIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge'
//Styles
import { StyledButton, Wrapper } from './App.steyles';
import Item from './Item/Item';
import Cart from './Cart/Cart';
import products from './assert/data.json';
//Types
export type CartItemType = {
  name: string;
  id:string;
  price: string;
  brand: string;
  category:Category;
  variant: string;
  position:number
  dimension1: string;
  img: string;
  amount:number;
}
export type Category={
  id: number;
        name: string;
        sef: string;
        img: string;
};


//ikitane await kullaniyoruz. parantez icerisindeki fetch icin en distaki isi json convert icin jspn convert de bir ascn aktivite

//const getProducts = async (): Promise<CartItemType[]> => await (await fetch('src/assert/data.json')).json();

const App = () => {
  const [cartOpen,setCartOpen]=useState(false);
  const [cartItems,setCartItems]=useState([] as CartItemType[])
  //const { data, isLoading, error } = useQuery<CartItemType[]>(dataproducts.products as CartItemType[]);
  const  [data,setData]=useState<CartItemType[]>(products.products as CartItemType[]);
  const [search,setSearch]=useState<string>('');
  const filteredProducts=data.filter(item=>item.name.toLowerCase().includes(search?.length>0?search.toLowerCase():""));
  const getTotalItems = (items:CartItemType[]) => 
    items.reduce((ack:number,item)=>ack+item.amount,0);
  
  const handleAddToCart = (clickedItem:CartItemType) => {
    setCartItems(prev=>{
      //1. ürün karta önceden yerlestzirilmismi?
      const isItemInCart=prev.find(item=>item.id===clickedItem.id)
      if(isItemInCart){
        return prev.map(item=>(item.id===clickedItem.id?{...item,amount:item.amount+1}:item ));
      }//cart a ilk defa ürünü ekliyoruz
      return [...prev,{...clickedItem, amount:1}];
    })
  };
  const handleRemoveFromCart = (id:string) =>{
    setCartItems(prev=>
      prev.reduce((ack,item)=>{//ack mevcut sayisi ve ack i degistirmek icin reduce komutu kullaniyoruz
        if(item.id===id){
          if(item.amount===1) return ack;//eger ürünün sayisi 1 tane ise bir kere - butona basildiktan sonra ürünü sepetten komple kaldiriyor
          return [...ack,{...item,amount:item.amount-1}];// burada ürünün sepetteki adedini bir azaltiyor
        }else {
          return [...ack,item];//eger hicbir butona tiklanmadiysa eksi veya arti oldugu gibi son durumu geri gönderiyoruz
        }
    },[] as CartItemType[]));
  } ;

  // if(isLoading) return <LinearProgress/>;
  // if(error) return <div>Something went wrong ...</div>
  return (
   <Wrapper>
     <input 
      type='search'
      placeholder='search products'
      onChange={(e)=>{setSearch(e.target.value)}}
      />
     <Drawer anchor='right' open={cartOpen} onClose={()=>setCartOpen(false)}>
      <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
     </Drawer>
    <StyledButton onClick={()=>setCartOpen(true)}>
   <Badge badgeContent={getTotalItems(cartItems)} color='error'>
     <AddShoppingCardIcon/>
     </Badge>   
    </StyledButton>
     <Grid container spacing={3}>
       {filteredProducts?.map(item=>(
         <Grid item key={item.id} xs={12} sm={4}>
          <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
       ))}
     </Grid>
   </Wrapper>
  );
}




export default App;
