"use client";

import { createContext, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

export const VeeContext = createContext();


export const VeeContextProvider = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    async function fetchProducts() {
      const url = 'https://timbu-get-all-products.reavdev.workers.dev/?organization_id=acc7d0f7efcf4fd2bf59ed02389b04f5&reverse_sort=false&page=1&size=50&Appid=G4SYL6BHQ6S24BN&Apikey=dfe3d8d24ffe4c5a95e83711348e53ba20240713210553401620';
    
      try {
          const response = await axios.get(url);
          const products = response.data.items.map(item => {
              return {
                  id: item.id,
                  product_name: item.name,
                  product_category: '', // Assuming no category provided in the response
                  product_description: item.description,
                  product_price: item.current_price[0].NGN[0],
                  product_discount: '', // Assuming no discount provided in the response
                  sku: '', // Assuming no SKU provided in the response
                  tag: '', // Assuming no tags provided in the response
                  image_one: item.photos[0] ? item.photos[0].url : '', // Assuming first photo URL
                  image_two: item.photos[1] ? item.photos[1].url : '' // Assuming second photo URL
              };
          });
          setData(products);
          setLoading(false)
          console.log(products);
      } catch (error) {
          console.error('Error fetching products:', error);
      }
    }



      useEffect(() => {
       
        fetchProducts()
      }, []);
    return (
        <VeeContext.Provider
          value={{
            loading,
            data,
            fetchProducts
          }}
        >
          {children}
        </VeeContext.Provider>
      );
    };