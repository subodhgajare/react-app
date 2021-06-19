function Loader (props) {
  return (
    <div className="text-center">
      <div className="loader-container">
        <div className="loader"></div>
      </div>
      <br />
      <p>{props.text}</p>
    </div>
  )
}

export default Loader