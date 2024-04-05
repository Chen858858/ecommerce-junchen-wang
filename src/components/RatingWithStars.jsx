import { FaStar, FaStarHalf } from "react-icons/fa";

const RatingWithStars = ({rating, verticalAlignValue = "0px"}) => {

  // Calculate how many stars to give.
  const wholeStars = []
  for(let wholeStar = 0; wholeStar < Math.floor(rating); wholeStar++){
    wholeStars.push(wholeStar);
  }
  const halfStar = (rating - Math.floor(rating)) >= 0.5;

  return (<>
    <span style={{verticalAlign: verticalAlignValue, color: "rgb(255, 233, 0)"}}>{wholeStars.map((keyNumber) => <FaStar key={keyNumber} />)}{halfStar && <FaStarHalf />}</span>
    &nbsp;{rating.toFixed(2)}/5.00
  </>)
}

export default RatingWithStars
