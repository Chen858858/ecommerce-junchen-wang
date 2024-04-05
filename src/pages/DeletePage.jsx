import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";

const DeletePage = ({items, deleteItem}) => {
  const {id} = useParams();
  const item = items.filter(itemInItems => {return itemInItems.id == id})[0];
  const navigate = useNavigate();

  const submitForm = () => {
    deleteItem(id);
    toast.success("Item deleted.");
    return navigate("/");
  };

  return !item ? (<>
    <div className="box m-3">
      <Link to="/" class="button is-size-5 mb-3">
        <FaArrowLeft />&ensp;Back to Search
      </Link>
      <div className="is-size-5 m-1">
        Item not found.
      </div>
    </div>
  </>) : (<>
    <div className="box m-3">
      <Link to="/" class="button is-size-5 mb-3">
        <FaArrowLeft />&ensp;Back to Search
      </Link>
      <div className="is-size-5 m-1">
        Are you sure you want to delete the item "{item.title}"?<br />
        <button className="button is-danger is-size-5 has-text-white mt-3" onClick={() => submitForm()}>
          <FaTrashAlt />&ensp;
          Yes, delete this item.
        </button>
      </div>
    </div>
  </>)
}

export default DeletePage
