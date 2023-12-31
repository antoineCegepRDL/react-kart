import { TextareaHTMLAttributes, useEffect, useState } from 'react';
import { GET, POST } from '../../composables/server';
import Product from '../../types/Product';
import Brand from '../../types/Brand';
import { useNavigate } from 'react-router-dom';

export default function SendMessage() {
  const navigate = useNavigate();

  const [brands, setBrands] = useState<Brand[]>([])
  useEffect(() => {
    const getBrands = async () => {
      const response = await GET<Brand[]>('brands')
      setBrands(response)
    }
    getBrands()
  }, [])

  const [formData, setFormData] = useState<Product>({
    id: undefined,
    brandId: null,
    name: '',
    description: '',
    discountPercentage: 0,
    imageUrl: '',
    price: 0,
    quantity: 0
  } as any)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault()
      const product = formData
      product.price = +product.price
      product.discountPercentage = +product.discountPercentage
      product.quantity = +product.quantity
      
      if (brands.find(x => x.id === formData.brandId)) {
        const response = await POST<Product>('item', product)
        if (response) {
          navigate('/admin/products')
        }
      } else {
        alert("La marque doit être sélectionnée")
      }
    }
    catch (error) {
      alert("error")
    }
  }


  return (
    <div className='product-wrapper'>
      <h1>Nouveau produit</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nom du produit
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label htmlFor="description">
          Description du procuit
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>

        <label htmlFor="price">
          Prix
          <input type='number' name="price" value={formData.price} onChange={handleChange} />
        </label>

        <label htmlFor="quantity">
          Quantité en inventaire
          <input type='number' name="quantity" value={formData.quantity} onChange={handleChange} />
        </label>

        <label htmlFor="discountPercentage">
          Pourcentage de rabais
          <input type='number' name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} />
        </label>

        <label htmlFor="imageUrl">
          Url de l'image du produit
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        </label>

        <label htmlFor="brandId">
          <select name="brandId" id="brandId" onChange={handleChange}>
            <option value="">Choisir une valeur</option>
            {brands.map(brand =>
              <option value={brand.id}>
                {brand.name}
              </option>
            )}
          </select>
        </label>

        <input type='submit' className='button' value='Créer' />
      </form>
    </div>
  )
}
