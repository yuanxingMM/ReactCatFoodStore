import React, {useContext} from 'react'
import { StateContext } from '../../context/GlobalState'
import {useParams} from 'react-router-dom'

function ProductDetail() {
    // consuming contexts
    const {addToCart} = useContext(StateContext)

    // get id of current product
    const {productId} = useParams()

    // fetch all products data
    const {products} = useContext(StateContext)
    
    // filter the product with matching id
    const thisProduct = products.filter(product => product.id === productId)

    function MiniImg({item}) {
        let url = item.miniImgsUrl;
        let imgs = [];
        let indexArr = JSON.parse(item.miniImgs);
        for(let i = 0;i<indexArr.length;i++){
            imgs.push( <img src = {url+indexArr[i]+".png?raw=true" } alt="product" onMouseEnter={changeImg} data-index={i} key = {i}></img>);
        }
        imgs.push( <img src = {item.url} alt="product" onMouseEnter={changeImg} data-index={indexArr.length} key = {indexArr.length} ></img>);
        return(imgs)
      }

    function changeImg(e){
        let img = document.querySelector(".detail-image");
        img.src = e.target.src;
    }

    // render JSX
    return (
        // map all information of that specific product
        <section>
            {
                thisProduct.map(product => {
                    return(
                        <div key={product.id} className="product-detail">
                            <div className="product-detail-image">
                                <img className="detail-image" src={product.url} alt="product"/>
                                <div className='miniImg'>
                                <MiniImg item={product}/>
                                </div>
                            </div>
                            <div className="product-detail-info">
                                <h3>{product.title}</h3>
                                <h4>${product.price}</h4>
                                <p className="lead">{product.description}</p> 
                                <button onClick={() => addToCart(product)} className="add-cart-btn">Add to Cart</button> 
                            </div>
                        </div>
                        
                    )
                    
                })
            }
        </section>
    )
}

export default ProductDetail
