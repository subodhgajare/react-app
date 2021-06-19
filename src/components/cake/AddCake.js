import { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cakeImageUpload } from "../../apis/Api";
import { isEmpty, isNumber } from "../../lib/validation";

const AddCake = (props) => {
  const dispatch = useDispatch()
  const [cakeName, setCakeName] = useState()
  const [cakeDesc, setCakeDesc] = useState('')
  const [cakePrice, setCakePrice] = useState()
  const [cakeWeight, setCakeWeight] = useState()
  const [cakeImage, setCakeImage] = useState()
  const [uploadCakeImage, setUploadCakeImage] = useState()
  const [cakeType, setCakeType] = useState('')
  const [cakeEggless, setCakeEggless] = useState(false)
  const [cakeFlavour, setCakeFlavour] = useState('')
  const [ingredients, setIngredients] = useState([''])

  const token = localStorage.getItem('token')

  if (!token) {
    props.history.push('/login')
  }

  const fileUpload = (event) => {
    setCakeImage(URL.createObjectURL(event.target.files[0]))

    let formData = new FormData()
    formData.append('file', event.target.files[0])

    cakeImageUpload(formData).then(response => {
      setUploadCakeImage(response.imageUrl)
    }, err => {})
  }

  const handleAdd = () => {
    let values = [...ingredients]
    values.push('')
    setIngredients(values)
  }

  const handleChange = (i, event) => {
    let values = [...ingredients]
    values[i] = event.target.value
    setIngredients(values)
  }

  const handleRemove = i => {
    let values = [...ingredients]
    values.splice(i, 1)
    setIngredients(values)
  }

  const addCake = (event) => {
    event.preventDefault()
    let isValid = !isEmpty(uploadCakeImage) && !isEmpty(cakeName) && !isEmpty(cakePrice)
      && !isNumber(cakePrice) && !isEmpty(cakeWeight) && !isNumber(cakeWeight)
    if (isValid) {
      dispatch({
        type: 'ADD_CAKE',
        payload: {
          name: cakeName,
          description: cakeDesc,
          price: cakePrice,
          weight: cakeWeight,
          image: uploadCakeImage,
          type: cakeType,
          eggless: cakeEggless,
          flavour: cakeFlavour,
          ingredients: [...new Set(ingredients)]
        }
      })
      props.history.push('/')
    } else {
      setUploadCakeImage(uploadCakeImage || '')
      setCakeName(cakeName || '')
      setCakePrice(cakePrice || '')
      setCakeWeight(cakeWeight || '')
    }
  }

  return (
    <section id="add-cake-page" className="container">
      <div className="bg">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="title text-center">Add <strong>Cake</strong></h2>
          </div>
          <div className="col-sm-12">
            <div className="add-cake-form">
              <form id="main-add-cake-form" className="add-cake-form row" name="add-cake-form" method="post">
                <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="form-group cake_image col-md-3 col-md-offset-2">
                    <div className="custom-file">
                      <input type="file" onChange={fileUpload} name="cake_image" className="custom-file-input" />
                    </div>
                    <span className="text-danger">{typeof uploadCakeImage == 'string' && isEmpty(uploadCakeImage) ? 'Please upload cake image' : ''}</span>
                  </div>
                  <div className="form-group col-md-4">
                    <div style={{ 'height': '250px' }}>
                      {cakeImage && <img src={cakeImage} alt="Cake" style={{ 'height': '100%' }} />}
                      {!cakeImage && <img src="/images/no-Image-available.jpg" alt="no-cake" style={{ 'height': '100%' }} />}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group cake_name col-md-6">
                    <input name='cake_name' onChange={e => setCakeName(e.target.value)} className="form-control" placeholder="Cake Name" />
                    <span className="text-danger">{typeof cakeName == 'string' && isEmpty(cakeName) ? 'Please enter cake name' : ''}</span>
                  </div>
                  <div className="form-group cake_price col-md-6">
                    <input name='cake_price' onChange={e => setCakePrice(e.target.value)} className="form-control" placeholder="Cake Price" />
                    <span className="text-danger">{typeof cakePrice == 'string' && isEmpty(cakePrice) ? 'Please enter cake price' : ''}
                      {typeof cakePrice == 'string' && cakePrice.trim() !== '' && isNumber(cakePrice) ? 'Please enter valid cake price' : ''}</span>
                  </div>
                </div>
                <div className="form-group cake_desc">
                  <textarea value={cakeDesc} name='cake_desc' rows="4" onChange={e => setCakeDesc(e.target.value)} className="form-control" placeholder="Cake Description" />
                </div>
                <div className="row">
                  <div className="form-group cake_weight col-md-6">
                    <input name='cake_weight' onChange={e => setCakeWeight(e.target.value)} className="form-control" placeholder="Cake Weight" />
                    <span className="text-danger">{typeof cakeWeight == 'string' && isEmpty(cakeWeight) ? 'Please enter cake weight' : ''}
                      {typeof cakeWeight == 'string' && cakeWeight.trim() !== '' && isNumber(cakeWeight) ? 'Please enter valid cake weight' : ''}</span>
                  </div>
                  <div className="form-group cake_type col-md-6">
                    <select name="cake_type" value={cakeType} onChange={e => setCakeType(e.target.value)} className="form-control">
                      <option value="" disabled>Select Type</option>
                      <option value="birthday">Birthday</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="farewell">Farewell</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <input value={cakeFlavour} name='cake_flavour' onChange={e => setCakeFlavour(e.target.value)} className="form-control" placeholder="Cake Flavour" />
                  </div>
                  <div className="form-group col-md-6">
                    <div className="form-check">
                      <label htmlFor="cake_eggless" className="form-check-label" style={{ 'fontWeight': 'unset' }}><input type="checkbox" id="cake_eggless" value={cakeEggless} name='cake_eggless' onChange={e => setCakeEggless(e.target.checked)} className="form-check-input" />&nbsp;&nbsp;&nbsp;Eggless</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-12">
                    <div className="row">
                      <div className="col-md-6" style={{ display: 'flex', 'alignItems': 'center' }}>
                        <span htmlFor="ingredients" style={{ fontWeight: 'unset', width: '100%' }}>Ingredients: </span><button type="button" className="btn btn-sm btn-primary" onClick={handleAdd}><i className="fa fa-plus"/></button>
                      </div>
                    </div>
                    <div className="row">
                      {ingredients.map((each, index) => {
                        return <div className="col-md-6" key={index}>
                          <div className="row" style={{ display: 'flex', 'alignItems': 'center' }}>
                            <div className="form-group col-md-10">
                              <input name='cake_ingredients' onChange={e => handleChange(index, e)} value={each} className="form-control" placeholder="Cake Ingredients" />
                            </div>
                            <div className="form-group col-md-2">
                              <span className="text-danger" onClick={() => handleRemove(index)}><i className="fa fa-times-circle fa-2x"></i></span>
                            </div>
                          </div>
                        </div>
                      })
                      }
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-4 col-md-offset-4">
                  <button type="button" onClick={addCake} className="btn btn-primary btn-block pull-right"><h5><i className="fa fa-check"></i> Add Cake</h5></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default withRouter(AddCake)
