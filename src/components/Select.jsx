const Select = ({id, label, options, isCategories = false, initialValue="", onChangeFunction="",
  isDefaultValue = true
}) => {
  
  return (<>
    <div className="field">
      {label && <label className="label is-size-5">{label}</label>}
      <div className="select is-size-5">
        <select id={id} onChange={onChangeFunction}
          defaultValue={isDefaultValue ? initialValue : null}
          value={!isDefaultValue ? initialValue : null}>
          {options.map((option) => 
            <option key={option} value={option}>{
              isCategories ? option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g," "): option
            }</option>
          )}
        </select>
      </div>
    </div>
  </>)
}

export default Select
