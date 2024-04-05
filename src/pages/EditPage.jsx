import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import TextInput from "../components/TextInput"
import Textarea from "../components/Textarea"
import Select from "../components/Select"
import { FaArrowLeft, FaPencilAlt } from "react-icons/fa"
import { useEffect } from "react"

const EditPage = ({items, categories, editItem}) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const itemFromItems = items.filter(itemInItems => {return itemInItems.id == id})[0];
  const item = items.filter(itemInItems => {return itemInItems.id == id})[0];
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState("");
  const [errors, setErrors] = useState([]);

  // Detect if items changes, fill in data, for initial loading.
  useEffect(() => {
    if(item){
      setTitle(item.title);
      setBrand(item.brand);
      setCategory(item.category);
      setDescription(item.description);
      setPrice("" + item.price);
      setDiscountPercentage("" + item.discountPercentage);
      setRating("" + item.rating);
      setStock("" + item.stock);
      setThumbnail(item.thumbnail);
      setImages(item.images.join("\n"));
    }
  }, [items]);

  const submitForm = async (e) => {
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

    const modifiedItem = {
      id: item.id,
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

    editItem(item.id, modifiedItem);
    toast.success("Item edited.");
    return navigate(`/item/${item.id}`);
  };

  return (!item ?
    (<>
      <div className="box m-3">
        <Link to="/" className="button is-size-5 mb-3">
          <FaArrowLeft />&ensp;Back to Search
        </Link>
        <div className="is-size-5 m-1">
          Item not found.
        </div>
      </div>
    </>) : (<>
  <div className="box m-3">
    <Link to="/" className="button is-size-5 mb-3">
      <FaArrowLeft />&ensp;Back to Search
    </Link>
    <div className="title is-size-3 mb-3">Edit item</div>
    <div>
      <form onSubmit={submitForm}>
        {/* Inputs. */}
        <TextInput label="Title" initialValue={title} onChangeFunction={(e) => {setTitle(e.target.value)}} />
        <TextInput label="Brand" initialValue={brand} onChangeFunction={(e) => {setBrand(e.target.value)}} />
        <Select label="Category" initialValue={category} options={categories} isCategories="true" isDefaultValue={false} onChangeFunction={(e) => {setCategory(e.target.value)}} />
        <Textarea label="Description" initialValue={description} onChangeFunction={(e) => {setDescription(e.target.value)}} />
        <TextInput label="Price" initialValue={price} onChangeFunction={(e) => {setPrice(e.target.value)}} />
        <TextInput label="Discount percentage" initialValue={discountPercentage} onChangeFunction={(e) => {setDiscountPercentage(e.target.value)}} />
        <TextInput label="Rating out of 5" initialValue={rating} onChangeFunction={(e) => {setRating(e.target.value)}} />
        <TextInput label="Stock" initialValue={stock} onChangeFunction={(e) => {setStock(e.target.value)}} />
        <TextInput label="Thumbnail url" initialValue={thumbnail} onChangeFunction={(e) => {setThumbnail(e.target.value)}} />
        <Textarea label="Image url(s) (separate by lines)" initialValue={images} onChangeFunction={(e) => {setImages(e.target.value)}} />
        {/* Errors if any. */}
        {errors.length > 0 && <div className="content is-size-5 has-text-danger mb-2">
          Error(s):
          <ul>
            {errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
        </div>}
        {/* Submit button. */}
        <button className="button is-success is-size-5 has-text-white">
          <FaPencilAlt />&ensp;
          Edit item
        </button>
      </form>
    </div>
  </div>
  </>))
}

export default EditPage
