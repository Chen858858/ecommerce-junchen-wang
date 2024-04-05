import { useState, useEffect } from "react"
import SearchCard from "../components/SearchCard"

const SearchPage = ({items, categories}) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [term, setTerm] = useState("");
  const [sortIdHighestToLowest, setSortIdHighestToLowest] = useState(false);
  const [category, setCategory] = useState("all");

  // Filter items by term and category.
  const updateFilteredItems = () => {
    let tempFilteredItems = [...items];
    // Filter by category, if applicable.
    const termCleaned = term.trim().toLowerCase();
    tempFilteredItems = category == "all" ? tempFilteredItems
      : tempFilteredItems.filter((item) => {return item.category == category});
    // Filter by term on title or brand, if applicable.
    tempFilteredItems = termCleaned == "" ? tempFilteredItems
      : tempFilteredItems.filter((item) => {
        return (item.title.toLowerCase().includes(termCleaned) || item.brand.toLowerCase().includes(termCleaned));
      });
    // Determine how to sort items by id.
    if(sortIdHighestToLowest == "true"){
      tempFilteredItems.reverse();
    }
    setFilteredItems(tempFilteredItems);
  }

  useEffect(() => {
    updateFilteredItems();
  }, [items]);

  return (<>
  <div className="box m-3">
    <div className="columns">
      {/* Search term input. */}
      <div className="column">
        <input type="text" className="input is-fullwidth is-size-5"
          placeholder="Enter item name..."
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      {/* Category input. */}
      <div className="column">
        <div className="select is-fullwidth is-size-5">
          <select onChange={(e) => setCategory(e.target.value)}>
            <option key="all" value="all">All categories</option>
            {categories.map((category) => <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g," ")}</option>)}
          </select>
        </div>
      </div>
      {/* Id sort input. */}
      <div className="column">
        <div className="select is-fullwidth is-size-5">
          <select defaultValue="false" onChange={(e) => setSortIdHighestToLowest(e.target.value)}>
            <option value="false">Id lowest to highest</option>
            <option value="true">Id highest to lowest</option>
          </select>
        </div>
      </div>
      {/* Search button */}
      <div className="column">
        <button className="button is-link is-size-5" onClick={() => updateFilteredItems()}>
          Search
        </button>
      </div>
    </div>
  </div>
  <div className="container m-3">
    {/* Search results with reminder if there are no matching terms. */}
    <div className="columns is-multiline">
      {filteredItems.length == 0 ?
        <div className="box is-size-5 m-3">No items found.</div>
        :
        filteredItems.map((item) => <SearchCard key={item.id} item={item} />)}
    </div>
  </div>
  </>)
}

export default SearchPage
