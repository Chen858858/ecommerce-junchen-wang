import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import RatingWithStars from "../components/RatingWithStars";
import { FaArrowLeft, FaArrowRight, FaArrowDown, FaPencilAlt, FaTrashAlt, FaTimes } from "react-icons/fa";

const ItemPage = ({items}) => {
  const {id} = useParams();
  // Get item from items.
  const item = items.filter(itemInItems => {return itemInItems.id == id})[0];
  const [modalImage, setModalImage] = useState("");
  const [modalClass, setModalClass] = useState("modal");

  const changeModal = (image, turnOn) => {
    setModalImage(image);
    setModalClass("modal" + (turnOn ? " is-active": ""));
  }

  return !item ? (<>
    <div className="box m-3">
      <Link to="/" className="button is-size-5 mb-3">
        <FaArrowLeft />&ensp;Back to Search
      </Link>
      <div className="is-size-5 m-1">
        Item not found.
      </div>
    </div>
  </>)
  : (<>
    <div className="box m-3">
      <Link to="/" className="button is-size-5 mb-3">
        <FaArrowLeft />&ensp;Back to Search
      </Link>
      <div className="columns">
        <div className="column">
          {/* Title and category. */}
          <div className="title is-size-1 mb-0">
            {item.title}
            &ensp;<span className="tag is-size-5 has-text-weight-normal">
              {item.category.charAt(0).toUpperCase() + item.category.slice(1).replace(/-/g," ")}
            </span>
          </div>
          {/* Brand. */}
          <div className="title is-size-4 mb-2">{item.brand}</div>
          {/* Rating with stars. */}
          <div className="is-size-5 mb-1">
            <RatingWithStars rating={item.rating} verticalAlignValue="-2px" />
          </div>
          <div>
            <Link to={`/edit/${id}`} className="button is-primary is-size-6 has-text-left"><FaPencilAlt />&ensp;Edit</Link>&ensp;
            <Link to={`/delete/${id}`} className="button is-danger is-size-6 has-text-left has-text-white"><FaTrashAlt />&ensp;Delete</Link>
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
      {/* Images. */}
      <div className="is-size-5 mt-2 mb-1">
        Click on image to enlarge.
      </div>
      <div style={{width: "100%", height: "230px", overflowX: "auto", whiteSpace: "nowrap"}}>
        {item.images.map((image) =>
          <img src={image} key={image} alt={item.title} 
            className="mr-1 ml-1" style={{height: "200px", cursor: "pointer"}}
            onClick={() => changeModal(image, true)}
          />)
        }
      </div>
    </div>
    {/* Modal for enlarged image. */}
    <div className={modalClass}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <button className="button is-danger mb-2 is-size-5 has-text-white"
            onClick={() => changeModal("", false)}>
            <FaTimes />&ensp;Close
          </button><br />
          <img src={modalImage} alt={item.title} />
        </div>
      </div>
    </div>
  </>)
}

export default ItemPage
