import React, { useEffect, useState } from "react";

// Components
import ProductoItem from "./ProductoItem";

import * as ProductoServer from "./ProductoServer";

const ProductoList = () => {
  const [productos, setProductos] = useState([]);

  const listProductos = async () => {
    try {
      const res = await ProductoServer.listProductos();
      const data = await res.json();
      setProductos(data.productos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listProductos();
  }, []);

  return (
    <div className="row">
      {productos.map((producto) => (
        <ProductoItem
          key={producto.id}
          producto={producto}
          listProductos={listProductos}
        />
      ))}
    </div>
  );
};

export default ProductoList;
