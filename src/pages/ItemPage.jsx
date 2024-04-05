import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import RatingWithStars from "../components/RatingWithStars";
import { FaArrowLeft, FaArrowRight, FaArrowDown, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const ItemPage = ({items}) => {
  const {id} = useParams();
  // Get item from items.
  const item = items.filter(itemInItems => {return itemInItems.id == id})[0];

  return !item ? (<>
    <div className="box m-3">
      <Link to="/" class="button is-size-5 mb-3">
        <FaArrowLeft />&ensp;Back to Search
      </Link>
      <div className="is-size-5 m-1">
        Item not found.
      </div>
    </div>
  </>)
  : (<>
    <div className="box m-3">
      <Link to="/" class="button is-size-5 mb-3">
        <FaArrowLeft />&ensp;Back to Search
      </Link>
      <div className="columns">
        <div className="column">
          {/* Title and category. */}
          <div className="title is-size-1 mb-0">
            {item.title}
            &ensp;<span className="tag is-size-5 has-text-weight-normal">{item.category}</span>
          </div>
          {/* Brand. */}
          <div className="title is-size-4 mb-2">{item.brand}</div>
          {/* Rating with stars. */}
          <div className="is-size-5 mb-1">
            <RatingWithStars rating={item.rating} verticalAlignValue="-2px" />
          </div>
          <div>
            <Link to={`/edit/${id}`} class="button is-primary is-size-6 has-text-left"><FaPencilAlt />&ensp;Edit</Link>&ensp;
            <Link to={`/delete/${id}`} class="button is-danger is-size-6 has-text-left has-text-white"><FaTrashAlt />&ensp;Delete</Link>
          </div>
        </div>
        {/* Thumbnail. */}
        <div className="column">
          <img src={item.thumbnail} alt={item.title} style={{height: "150px"}} />
        </div>
      </div>
      {/* Description */}
      <div className="is-size-5 mb-4">{item.description}</div>
      <div className="columns">
        <div className="column is-half-width">
          <div className="is-size-3">
            ${(Math.ceil(item.price * (100 - item.discountPercentage))/100).toFixed(2)}
          </div>
          <div className="is-size-5">
            <span style={{verticalAlign: "-3px"}}>
              {item.discountPercentage > 0 ? <FaArrowDown /> : <FaArrowRight />}
            </span>&nbsp;
            {item.discountPercentage.toFixed(2)}%
            from ${item.price.toFixed(2)}
          </div>
        </div>
        {/* Stock */}
        <div className="column is-half-width">
          <div className="is-size-3">{item.stock}</div>
          <div className="is-size-5">in stock</div>
        </div>
      </div>
      <div style={{width: "100%", height: "220px", overflowX: "auto", whiteSpace: "nowrap"}}>
        {item.images.map((image) => <span><img src={image} alt={item.title} style={{height: "200px"}} />&ensp;</span>)}
      </div>
    </div>
  </>)
}

export default ItemPage
