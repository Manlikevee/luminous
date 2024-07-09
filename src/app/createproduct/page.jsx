'use client';

import { database } from '@/components/firebaseConfig';
import { ref, push, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import Header from '@/components/Header';
import React, { useState, useRef } from 'react';

const Page = () => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDiscount, setProductDiscount] = useState(0);
  const [sku, setSku] = useState('');
  const [aboutProduct, setAboutProduct] = useState('');
  const [tag, setTag] = useState('');
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const imageOneInput = useRef(null);
  const imageTwoInput = useRef(null);

  const handleImageChange = (inputRef, setImage) => {
    return () => {
      const file = inputRef.current.files[0];
      if (!file) return;
      const blob = new Blob([file], { type: file.type });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.src = url;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((newBlob) => {
          const fr = new FileReader();
          fr.readAsDataURL(newBlob);
          fr.addEventListener('load', () => {
            const dataURL = fr.result;
            setImage(dataURL);
          });
        }, 'image/webp', 0.9);
      };
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newChildRef = push(ref(database, 'products'));
    const newId = newChildRef.key;

    const storage = getStorage();

    const uploadImage = async (image) => {
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const number = Math.floor(Math.random() * 100) + 1;
        const file = new File([blob], `${number}${newId}`, { type: 'image/webp' });

        const fileRef = storageRef(storage, `images/${file.name}`);
        await uploadBytes(fileRef, file);
        return await getDownloadURL(fileRef);
      }
      return null;
    };

    const imageOneUrl = await uploadImage(imageOne);
    const imageTwoUrl = await uploadImage(imageTwo);

    if (imageOneUrl && imageTwoUrl) {
      await set(newChildRef, {
        id: newId,
        product_name: productName,
        product_category: productCategory,
        product_description: productDescription,
        product_price: productPrice,
        product_discount: productDiscount,
        sku: sku,
        about_product: aboutProduct,
        tag: tag,
        image_one: imageOneUrl,
        image_two: imageTwoUrl,
      });

      // Reset the form and state
      setProductName('');
      setProductCategory('');
      setProductDescription('');
      setProductPrice('');
      setProductDiscount('');
      setSku('');
      setAboutProduct('');
      setTag('');
      setImageOne(null);
      setImageTwo(null);
      imageOneInput.current.value = ''; // Reset the file input
      imageTwoInput.current.value = ''; // Reset the file input
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productCategory">Product Category:</label>

<select
            id="categorySelect"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Decoration">Decoration</option>
            <option value="Ceiling">Ceiling</option>
            <option value="Floor">Floor</option>
            <option value="LED">LED</option>
            <option value="Furniture">Furniture</option>
            <option value="Grouped">Grouped</option>
            <option value="Lamps">Lamps</option>
            <option value="Black">Black</option>
            <option value="Decorative">Decorative</option>
            <option value="Lights">Lights</option>
            <option value="Modern">Modern</option>
            <option value="Retro">Retro</option>
            <option value="Wood">Wood</option>
          </select>

        </div>
        <div>
          <label htmlFor="productDescription">Product Description:</label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productDiscount">Product Discount:</label>
          <input
            type="number"
            id="productDiscount"
            value={productDiscount}
            onChange={(e) => setProductDiscount(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="sku">SKU:</label>
          <input
            type="text"
            id="sku"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="aboutProduct">About Product:</label>
          <textarea
            id="aboutProduct"
            value={productDescription}
            onChange={(e) => setAboutProduct(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="tag">Tag:</label>
          <input
            type="text"
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imageOne">Image One:</label>
          <input type="file" ref={imageOneInput} onChange={handleImageChange(imageOneInput, setImageOne)} />
        </div>
        <div>
          <label htmlFor="imageTwo">Image Two:</label>
          <input type="file" ref={imageTwoInput} onChange={handleImageChange(imageTwoInput, setImageTwo)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Page;
