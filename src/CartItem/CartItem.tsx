import Button from '@material-ui/core/Button'
//Types
import {CartItemType} from '../App';
import Item from '../Item/Item';
//Styles
import {Wrapper} from './CartItem.styles';

type Props={

    item:CartItemType;
    addToCart:(clickedItem:CartItemType)=>void;
    removeFromCart:(id:string)=>void;
}

const CartItem:React.FC<Props>=({item,addToCart,removeFromCart})=>(
<Wrapper>
<div>
   <h3>{item.name}</h3> 
   <div className="information">
       <p>Price:€{item.price}</p>
       <p>Total:€{(item.amount*Number(item.price)).toFixed(2)}</p>
   </div>
   <div className="buttons">
       <Button
       size="small"
       disableElevation
       variant='contained'
       onClick={()=>removeFromCart(item.id)}>-</Button>
   
   <p>{item.amount}</p>   
       <Button
       size="small"
       disableElevation
       variant='contained'
       onClick={()=>addToCart(item)}>+</Button>
   </div>
   </div>
<img src={item.img} alt={item.name}/>
</Wrapper>);

export default CartItem;
