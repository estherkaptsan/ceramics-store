import React, { useEffect, useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { itemService } from '../services/item.service'
import { loadItems, addOrder, setFilterBy } from '../store/actions/item.actions'
import ImgUploader from '../cmps/ImgUploader';

export default function ItemEdit() {
  const categories = useSelector((storeState) => storeState.itemModule.categories)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState([])
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const [formData, setFormData] = useState({
    inStock: '',
    category: '',
    price: 0,
    numOfItemsInStock: '',
    inSale: '',
    salePrice: 0,
    title: '',
    description: '',
    mediaUrl: { url: '', type: '' }
  })

  useEffect(() => {
    dispatch(loadItems())

    if (params.id) {
      const loadItemById = async () => {
        try {
          const loadedItem = await itemService.getItemById(params.id)
          setFormData(loadedItem)
        } catch (error) {
          console.error('Error loading item data:', error)
        }
      }

      loadItemById()
    }
  }, [dispatch, params.itemId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const closeEditModal = () => {
    navigate(-1)
  }

  const handleImageUpload = ({ urls, types }) => {
    const img = urls[0];
    const type = types[0];
    setIsUploading(true);
    const newMediaUrl = {
      url: img,
      type: type
    };
    setFormData({
      ...formData,
      mediaUrl: newMediaUrl,
    });
    setIsUploading(false);
  };

  const handleSave = async (event) => {
    event.preventDefault()
    console.log('Form Data:', formData)
    try {
      dispatch(addOrder(formData));
    } catch (error) {
      console.log('error:', error);
    }
    navigate('/')
  }

  const isSaveDisabled = (
    formData.category &&
    formData.title &&
    formData.description &&
    formData.price &&
    formData.mediaUrl &&
    formData.inStock &&
    formData.numOfItemsInStock&&
    !isUploading
  );


  if (!categories) return <div>loading data...</div>

  return (
    <div className='item-edit-modal'>
      <button onClick={closeEditModal} className='close-modal-btn'>X</button>

      <form onSubmit={handleSave}>
        <section>
          <label htmlFor="category">category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="edit-select"
            required>
            <option>Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </section>

        <section>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={formData.title}
            required />
        </section>

        <section>
          <label htmlFor="description">description:</label>
          <textarea
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
            value={formData.description}
            required />
        </section>

        <section>
          <label htmlFor="price">price:</label>
          <input
            type="number"
            name="price"
            id="price"
            onChange={handleChange}
            value={formData.price}
            required />
        </section>

        <section>
          <label htmlFor="salePrice">sale Price:</label>
          <input
            type="number"
            name="salePrice"
            id="salePrice"
            onChange={handleChange}
            value={formData.salePrice}
          />
        </section>

        <section>
          <label htmlFor="numOfItemsInStock">number Of Items In Stock:</label>
          <input
            type="number"
            name="numOfItemsInStock"
            id="numOfItemsInStock"
            onChange={handleChange}
            value={formData.numOfItemsInStock}
            required />
        </section>
        <section>

          <label htmlFor="inSale">On Sale:</label>
          <input
            type="checkbox"
            name="inSale"
            id="inSale"
            onChange={() => {
              setFormData({
                ...formData,
                inSale: !formData.inSale,
              });
            }}
            checked={formData.inSale}
             />
        </section>

        <section>
          <ImgUploader
            onFileUpload={handleImageUpload}
            isUploading={isUploading} required/>
        </section>

        <button type="submit" disabled={isSaveDisabled}>
          Save
        </button>
      </form>
    </div>
  )
}
