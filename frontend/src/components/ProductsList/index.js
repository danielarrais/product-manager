import React, {Component} from 'react';
import api from './../../services/api.service'
import authHeader from './../../services/auth-header'
import {currencyUSD, dateTimeBRL} from '../../utils/intl.utils'
import PropagateLoader from "react-spinners/PropagateLoader";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'

export default class ProductsList extends Component {
  state = {
    products: [],
    loading: false,
    paginationInfo: {},
    currentPage: 1
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, this.loadProducts)
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/api/v1/products?page=${page}`, {headers: authHeader()})
    const {docs, ...paginationInfo} = response.data

    this.setState({
      products: docs,
      paginationInfo: paginationInfo,
      currentPage: page,
      loading: false,
    })
  }

  prevPage = async () => {
    const {currentPage} = this.state
    if (currentPage === 1) return;
    const pageNumber = currentPage - 1;

    this.setState({
      loading: true,
    }, () => {
      this.loadProducts(pageNumber)
    })
  }

  nextPage = async () => {
    const {currentPage, paginationInfo} = this.state
    debugger
    if (currentPage === paginationInfo.pages) return;
    const pageNumber = currentPage + 1;
    this.setState({
      loading: true,
    }, () => {
      this.loadProducts(pageNumber)
    })
  }

  deleteProduct = (id, product_name) => {
    Swal.fire({
      title: `<h2>Delete the <b>${product_name}</b> product?</h2>`,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return api.delete(`/api/v1/products/${id}`, {headers: authHeader()})
          .then(response => {
            return response
          }).catch((result) => {
            return result.response
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      debugger
      switch (result.value.status) {
        case 200:
          Swal.fire(
            {
              title: `Product deleted successfully!`,
              icon: 'success'
            }
          );
          this.loadProducts(this.state.currentPage)
          break;
        case 404:
          Swal.fire(
            {
              title: 'Product not found!',
              icon: 'error'
            }
          );
      }
    })
  }

  render() {
    const {products, paginationInfo, currentPage} = this.state

    return (
      <main className="container mb-4">
        <div className="pt-4">
          <div className="card mb-4">
            <div className="card-header">
              Registered products
            </div>
            <div className="card-body">
              <table className="table">
                <thead className="thead-dark">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Type</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Price</th>
                  <th scope="col">Created</th>
                  <th scope="col" className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.category && (product.category.charAt(0).toUpperCase() + product.category.slice(1))}</td>
                    <td>{product.rating}</td>
                    <td>{currencyUSD(product.price)}</td>
                    <td>{dateTimeBRL(product.created_at)}</td>
                    <td className="text-center">
                      <Link to={`/products/${product.id}`}>Edit</Link>
                      <a href="/#" className="text-danger ml-2" onClick={() => {
                        this.deleteProduct(product.id, product.title)
                      }}>Delete</a>
                    </td>
                  </tr>
                ))}

                {products.length > 0 || this.state.loading ? null : <tr>
                  <th className="text-center" colSpan={6} scope="row">No products found.</th>
                </tr>}

                </tbody>
              </table>
              <div className="d-flex justify-content-between">
                <button className="btn btn-sm btn-info"
                        disabled={currentPage === 1}
                        onClick={this.prevPage}>Anterior
                </button>
                <div className="mt-2">
                  <PropagateLoader
                    size={15}
                    color={"#ccc"}
                    loading={this.state.loading}/>
                </div>
                <button className="btn btn-sm btn-info"
                        disabled={paginationInfo.pages === currentPage}
                        onClick={this.nextPage}>Próxima
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}