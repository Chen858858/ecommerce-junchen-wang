const TextInput = ({id, label = "", placeholder = "", initialValue="", onChangeFunction=""}) => {
  return (<>
    <div className="field">
      {label && <label className="label is-size-5">{label}</label>}
      <div className="control">
        <input type="text" id={id} className="input is-size-5"
          placeholder={placeholder ? placeholder : `Enter ${label.toLowerCase()}...`}
          defaultValue={initialValue}
          onChange={onChangeFunction}
        />
      </div>
    </div>
  </>)
}

export default TextInput
