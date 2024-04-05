import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import TextInput from "../components/TextInput"
import Textarea from "../components/Textarea"
import Select from "../components/Select"
import { FaArrowLeft, FaPlus } from "react-icons/fa"

const AddPage = ({items, categories, addItem}) => {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("smartphones");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState("");
  const [errors, setErrors] = useState([]);
  
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    setErrors([]);
    let tempErrors = [];
    
    // Check title.
    if(title.trim().length == 0){
      tempErrors.push("No title entered.")
    }

    // Check brand.
    if(brand.trim().length == 0){
      tempErrors.push("No brand entered.")
    }

    // Check description.
    if(description.trim().length == 0){
      tempErrors.push("No description entered.")
    }

    // Regex for decimal numbers from https://www.tutorialspoint.com/How-to-validate-decimal-numbers-in-JavaScript modified.
    const numberRegex = /^[-]?[0-9]+\.?([0-9]?)+$/;

    // Check price.
    const priceCleaned = numberRegex.test(price.trim()) ?
      parseFloat(price)
      : null;
    if(!priceCleaned && priceCleaned != 0){
      tempErrors.push("Price entered is not a number.");
    }
    else{
      if(priceCleaned <= 0){
        tempErrors.push("Price entered is less than or equal to 0.");
      }
    }

    // Check discount percentage.
    const discountPercentageCleaned = numberRegex.test(discountPercentage.trim()) ?
      parseFloat(discountPercentage)
      : null;
    if(!discountPercentageCleaned && discountPercentageCleaned != 0){
      tempErrors.push("Discount percentage entered is not a number.");
    }
    else{
      if(discountPercentageCleaned < 0){
        tempErrors.push("Discount percentage entered is less than 0.");
      }
      if(discountPercentageCleaned > 100){
        tempErrors.push("Discount percentage entered is more than 100.");
      }
    }

    // Check rating.
    const ratingCleaned = numberRegex.test(rating.trim()) ?
      parseFloat(rating)
      : null;
    if(!ratingCleaned && ratingCleaned != 0){
      tempErrors.push("Rating entered is not a number.");
    }
    else{
      if(ratingCleaned < 0){
        tempErrors.push("Rating entered is less than 0.");
      }
      if(ratingCleaned > 5){
        tempErrors.push("Rating entered is more than 5.");
      }
    }

    // Check stock.
    const stockCleaned = numberRegex.test(stock.trim()) ?
      parseInt(stock)
      : null;
    if(!stockCleaned && stockCleaned != 0){
      tempErrors.push("Stock entered is not a number.");
    }
    else{
      if(stockCleaned < 0){
        tempErrors.push("Stock entered is less than 0.");
      }      
    }

    // Regex for checking image url from https://regexr.com/3g1v7 , modified for more extensions and to include anchors.
    const imgUrlRegex = /^(http(s?):)([/|.|\w|\s|-])*\.(?:png|jpg|jpeg|gif|svg|webp)$/;

    // Check thumbnail.
    if(thumbnail.trim().length == 0){
      tempErrors.push("No thumbnail url entered.")
    }
    else{
      if(!imgUrlRegex.test(thumbnail.trim())){
        tempErrors.push("Thumbnail url is not an image url.");
      }
    }

    // Check images.
    let processedImages = [];
    images.trim().split("\n").forEach((image) => {
      processedImages.push(image);
    });
    if(!processedImages[0]){
      tempErrors.push("No image url(s) entered.");
    }
    else{
      for(let idx = 0; idx < processedImages.length; idx++){
        if(!imgUrlRegex.test(processedImages[idx])){
          tempErrors.push("Invalid url(s) in image url(s).");
          break;
        }
      }
    }

    setErrors(tempErrors);
    if(tempErrors.length > 0){
      return;
    }

    const newId = items[items.length-1].id + 1;
    const newItem = {
      id: newId,
      title: title.trim(),
      description: description.trim(),
      price: priceCleaned,
      discountPercentage: discountPercentageCleaned,
      rating: ratingCleaned,
      stock: stockCleaned,
      brand: brand.trim(),
      category: category,
      thumbnail: thumbnail.trim(),
      images: processedImages
    };

    addItem(newItem);
    toast.success("Item added.");
    
    return navigate(`/item/${newId}`);
  };

  return (<>
  <div className="box m-3">
    <Link to="/" className="button is-size-5 mb-3">
      <FaArrowLeft />&ensp;Back to Search
    </Link>
    <div className="title is-size-3 mb-3">Add item</div>
    <div>
      <form onSubmit={submitForm}>
        <TextInput label="Title" onChangeFunction={(e) => {setTitle(e.target.value)}} />
        <TextInput label="Brand" onChangeFunction={(e) => {setBrand(e.target.value)}} />
        <Select label="Category" initialValue={"smartphone"} options={categories} isCategories="true" isDefaultValue="false" onChangeFunction={(e) => {setCategory(e.target.value)}} />
        <Textarea label="Description" onChangeFunction={(e) => {setDescription(e.target.value)}} />
        <TextInput label="Price" onChangeFunction={(e) => {setPrice(e.target.value)}} />
        <TextInput label="Discount percentage" onChangeFunction={(e) => {setDiscountPercentage(e.target.value)}} />
        <TextInput label="Rating out of 5" onChangeFunction={(e) => {setRating(e.target.value)}} />
        <TextInput label="Stock" onChangeFunction={(e) => {setStock(e.target.value)}} />
        <TextInput label="Thumbnail url" onChangeFunction={(e) => {setThumbnail(e.target.value)}} />
        <Textarea label="Image url(s) (separate by lines)" onChangeFunction={(e) => {setImages(e.target.value)}} />
        {errors.length > 0 && <div className="content is-size-5 has-text-danger mb-2">
          Error(s):
          <ul>
            {errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
        </div>}
        <button className="button is-success is-size-5 has-text-white">
          <FaPlus/>&ensp;
          Add item
        </button>
      </form>
    </div>
  </div>
  </>)
}

export default AddPage
