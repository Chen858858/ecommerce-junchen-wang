const Textarea = ({id, label="", placeholder="", initialValue="", onChangeFunction = ""}) => {
  return (<>
    <div className="field">
      {label && <label className="label is-size-5">{label}</label>}
      <div className="control">
        <textarea id={id} className="textarea is-size-5"
          placeholder={placeholder ? placeholder : `Enter ${label.toLowerCase()}...`}
          defaultValue={initialValue}
          onChange={onChangeFunction}
        ></textarea>
    </div>
    </div>
  </>)
}

export default Textarea
