import React,{FC} from 'react'
import Button from '@material-ui/core/Button';
//Types
import {CartItemType} from '../App';
//Styles
import {Wrapper} from './Item.styles';


type Props={
    item:CartItemType;
    handleAddToCart: (clickedItem:CartItemType)=>void;
}
const Item:React.FC<Props> =({item,handleAddToCart})=>(
<Wrapper>
    <img src={item.img} alt={item.name}/>
    <div>
        <h3>{item.name}</h3>
        <p>{item.brand}</p>
        <h3>€{item.price}</h3>
    </div>
    <Button onClick={()=>handleAddToCart(item)}>Add To Cart </Button>
</Wrapper>
)

export default Item;

