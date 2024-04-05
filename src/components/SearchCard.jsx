import { Link } from "react-router-dom"
import { FaArrowDown, FaArrowRight, FaInfoCircle, FaPencilAlt, FaTrashAlt } from "react-icons/fa"
import RatingWithStars from "./RatingWithStars"

const SearchCard = ({item}) => {
  return (<>
    <div className="column is-half">
      <div className="box">
        <div className="columns">
          <div className="column is-two-thirds">
            {/* Title. */}
            <div className="title is-size-3 mb-0">
              {item.title}&ensp;
              <div className="tag is-size-6 has-text-weight-normal">
                {item.category.charAt(0).toUpperCase() + item.category.slice(1).replace(/-/g," ")}
              </div>
            </div>
            {/* Brand. */}
            <div className="is-size-5 m-0 has-text-weight-bold">{item.brand}</div>
            {/* Rating with stars. */}
            <div>
              <RatingWithStars rating={item.rating} verticalAlignValue="-3px" />
            </div>
          </div>
          <div className="column">
            {/* Thumbnail made to fit in 128x128px space. */}
            <figure className="image is-128x128">
              <img src={item.thumbnail} style={{width: "128px", height: "128px", objectFit: "cover"}} />
            </figure>
          </div>
        </div>
        {/* Description cut short to <= 65 characters. */}
        <div className="is-size-6">
          {item.description.length > 65 ? item.description.substring(0, 61) + "...": item.description}
        </div>
        <div className="columns is-mobile mt-2">
          {/* Discounted price rounded up with discount percentage and original price. */}
          <div className="column is-half">
            <div className="is-size-3">${(Math.ceil(item.price * (100-item.discountPercentage)) / 100).toFixed(2)}</div>
            <div className="is-size-6">
              <span style={{verticalAlign: "-2px"}}>
                {item.discountPercentage > 0 ?
                  <FaArrowDown /> : <FaArrowRight />
                }
              </span>&nbsp;
              {item.discountPercentage.toFixed(2)}% from ${item.price.toFixed(2)}
            </div>
          </div>
          {/* Buttons to view info, edit, or delete. */}
          <div className="column is-half">
            <Link to={`/item/${item.id}`} className="button is-fullwidth is-info is-dark is-size-6 mb-2 has-text-left has-text-white"><FaInfoCircle />&ensp;More Info</Link>
            <Link to={`/edit/${item.id}`} className="button is-fullwidth is-primary is-size-6 mb-2 has-text-left"><FaPencilAlt />&ensp;Edit</Link>
            <Link to={`/delete/${item.id}`} className="button is-fullwidth is-danger is-size-6 has-text-left has-text-white"><FaTrashAlt />&ensp;Delete</Link>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default SearchCard
