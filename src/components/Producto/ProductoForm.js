import { useState, useEffect } from "react";
import * as ProductoServer from "./ProductoServer";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";

const ProductoForm = () => {
  const history = useHistory();
  const params = useParams();

  console.log(params);

  const initialState = {
    id: 0,
    name: "",
    stock: 0,
    price: 0,
    images: "",
    paused: false,
  };

  const [productos, setProductos] = useState(initialState);

  const handleInputChange = (e) => {
    setProductos({ ...productos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (!params.id) {
        res = await ProductoServer.registerProducto(productos);
        const data = await res.json();
        console.log(data);
        if (data.message === "Success") {
          setProductos(initialState);
          swal({
            title: "Good job!",
            text: "THE PRODUCT HAS BEEN CREATED",
            icon: "success",
            timer: "2000",
          });
        }
      } else {
        swal({
            title: "Good job!",
            text: "THE PRODUCT HAS BEEN CHANGE",
            icon: "success",
            timer: "2000",
          });
        await ProductoServer.updateProducto(params.id, productos);
      }

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getProducto = async (productoId) => {
    try {
      const res = await ProductoServer.getProducto(productoId);
      const data = await res.json();
      console.log(data);
      const { name, stock, images, price, paused } = data.product;
      setProductos({ name, stock, images, price, paused });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getProducto(params.id);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="col-md-3 mx-auto">
      <h2 className="mb-3 text-center">Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={productos.name}
            onChange={handleInputChange}
            className="form-control"
            minLength="2"
            maxLength="50"
            autoFocus
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            name="stock"
            value={productos.stock}
            onChange={handleInputChange}
            className="form-control"
            min="1"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image (URL)</label>
          <input
            type="url"
            name="images"
            value={productos.images}
            onChange={handleInputChange}
            className="form-control"
            maxLength="500"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            value={productos.price}
            onChange={handleInputChange}
            className="form-control"
            min="10000"
            step="50"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="paused"
            value={productos.paused}
            onChange={handleInputChange}
            className="form-select"
            aria-label="Default select example"
            required
          >
            <option></option>
            <option value="true">Enable</option>
            <option value="false">Disable</option>
          </select>
        </div>
        <div className="d-grid gap-2">
          {params.id ? (
            <button type="submit" className="btn btn-block btn-primary">
              UPDATE
            </button>
          ) : (
            <button type="submit" className="btn btn-block btn-success">
              SAVE
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductoForm;
