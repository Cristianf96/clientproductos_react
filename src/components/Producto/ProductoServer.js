const API_URL = "http://127.0.0.1:8000/api/productos/";

export const listProductos = async () => {
  return await fetch(API_URL);
};

export const getProducto = async (productoId) => {
  return await fetch(`${API_URL}${productoId}`);
};

export const registerProducto = async (newProducto) => {
  return await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: String(newProducto.name).trim(),
      stock: parseInt(newProducto.stock),
      price: parseInt(newProducto.price),
      paused: Boolean(newProducto.paused),
      images: String(newProducto.images).trim(),
    }),
  });
};

export const deleteProducto = async (productoId) => {
  return await fetch(`${API_URL}${productoId}`, {
    method: "DELETE",
  });
};

export const updateProducto = async (productoId, updateProducto) => {
  return await fetch(`${API_URL}${productoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: String(updateProducto.name).trim(),
      stock: parseInt(updateProducto.stock),
      price: parseInt(updateProducto.price),
      paused: Boolean(updateProducto.paused),
      images: String(updateProducto.images).trim(),
    }),
  });
};
