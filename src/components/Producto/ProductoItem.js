import React from "react";
import * as ProductoServer from "./ProductoServer";
import { useHistory } from "react-router-dom";

const ProductoItem = ({ producto, listProductos }) => {
  const history = useHistory();

  const handleDelete = async (productoId) => {
    // eslint-disable-next-line no-undef
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this information!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) {
        await ProductoServer.deleteProducto(productoId);
        listProductos();
        // eslint-disable-next-line no-undef
        swal("Poof! Product information has been deleted!", {
          icon: "success",
        });
      } else {
        // eslint-disable-next-line no-undef
        swal("Your Product is safe!");
      }
    });
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="card-header">
        <div
          className="btn-group"
          role="group"
          aria-label="Basic outlined example"
        >
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => producto.id && handleDelete(producto.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={() => history.push(`/updateProducto/${producto.id}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
          </button>
        </div>
        <h5 className="card-title text-end">Stock: {producto.stock}</h5>
      </div>
      <div className="card card-body">
        <img src={producto.images} className="img-fluid" alt="" />
        <p className="card-title text-center">{producto.name}</p>
      </div>
      <div className="card-footer text-muted d-flex justify-content-between align-items-center">
        ${producto.price}
        <input
          className="form-check-input"
          type="checkbox"
          id="defaultCheck1"
        ></input>
      </div>
    </div>
  );
};

export default ProductoItem;
