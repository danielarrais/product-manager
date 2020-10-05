import React, {Component} from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {css} from "@emotion/core";
import {Link} from "react-router-dom";
import api from './../../services/api.service'
import authHeader from "../../services/auth-header";
import IntlCurrencyInput from "react-intl-currency-input"
import PropagateLoader from "react-spinners/PropagateLoader";

const currencyConfig = {
  locale: "pt-BR",
  formats: {
    number: {
      BRL: {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

const cssSavingProduct = css`
  margin-right: 5px;
`;

const cssLoadingProduct = css`
  height: 30px;
`;

export default class ProductEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      loading: false,
      titleRequired: false,
      priceRequired: false,
      loadingProduct: true,
      categoryRequired: false,
    }
  }

  async componentDidMount() {
    const {id} = this.props.match.params;

    const response = await api.get(`/api/v1/products/${id}`, {headers: authHeader()})

    this.setState({
      product: response.data,
      loadingProduct: false
    });
  }

  handleChange = (event) => {
    let {product} = this.state;
    product[`${event.target.name}`] = event.target.value
    this.setState({product: product}, this.validateForm);
  }

  handleChangePrice = (event, value) => {
    let {product} = this.state;
    product['price'] = value
    this.setState({product: product}, this.validateForm);
  }

  validateForm = async () => {
    const {product} = this.state;
    debugger
    await this.setState({
      titleRequired: product.title === undefined || product.title === '',
      priceRequired: product.price === undefined,
      categoryRequired: product.category === undefined || product.category === '',
    })
  }

  handleSubmit = (event) => {
    const {titleRequired, priceRequired, categoryRequired} = this.state;

    if (!titleRequired && !priceRequired && !categoryRequired) {
      this.setState({
        loading: true
      }, this.updateProduct)
    }

    event.preventDefault();
  }

  updateProduct = () => {
    const {id} = this.props.match.params;
    api.put(`/api/v1/products/${id}`,
      this.state.product,
      {headers: authHeader()}).then((response) => {
      this.setState({
        loading: false,
        sucessImportation: response.status === 200
      }, () => {
        this.props.history.push('/')
      })
    })
  }

  render() {
    const {id} = this.props.match.params;
    const {product, titleRequired, priceRequired, categoryRequired, loadingProduct} = this.state;

    return (
      <main className="container mb-4">
        <div className="pt-4">
          <div className="card mb-4">
            <div className="card-header">
              Edit product #{id}
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-center">
                  <PropagateLoader
                    size={15} css={cssLoadingProduct}
                    color={"#ccc"}
                    loading={this.state.loadingProduct}/>
                </div>
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input className="form-control" onChange={this.handleChange}
                             value={product.title} type="text"
                             id="title" name="title"/>
                      {titleRequired ? <p className="text-danger m-0"><small>Fill in the price</small></p> : null}
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="category">Type</label>
                      <select className="form-control" id="category" name="category" onChange={this.handleChange}
                              value={product.category}>
                        <option value="">Select an option</option>
                        <option value="bakery">Bakery</option>
                        <option value="dairy">Dairy</option>
                        <option value="fruit">Fruit</option>
                        <option value="meat">Meat</option>
                        <option value="vegan">Vegan</option>
                        <option value="vegetable">Vegetable</option>
                      </select>
                      {categoryRequired ? <p className="text-danger m-0"><small>Fill in the price</small></p> : null}
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="price">Price</label>
                      <IntlCurrencyInput value={product.price} currency="BRL" config={currencyConfig}
                                         onChange={this.handleChangePrice}/>
                      {priceRequired ? <p className="text-danger m-0"><small>Fill in the price</small></p> : null}
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="rating">Rating</label>
                      <input className="form-control" onChange={this.handleChange}
                             value={product.rating} type="text"
                             id="rating" name="rating"/>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="width">Width</label>
                      <input className="form-control" onChange={this.handleChange}
                             value={product.width} type="number"
                             id="width" name="width"/>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="height">Height</label>
                      <input className="form-control" onChange={this.handleChange}
                             value={product.height} type="number"
                             id="height" name="height"/>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="filename">Filename</label>
                      <input className="form-control" onChange={this.handleChange}
                             value={product.filename} type="text"
                             id="filename" name="filename"/>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <Link to={'/'} type="submit" className="btn btn-info text-white">
                    Back
                  </Link>
                  <button disabled={this.state.loading || loadingProduct || titleRequired || priceRequired || categoryRequired}
                          type="submit" className="btn btn-primary text-white">
                    <div className="d-flex justify-content-between">
                      <ClipLoader css={cssSavingProduct}
                                  size={22}
                                  color={"#ccc"}
                                  loading={this.state.loading}/>
                      <span> Save</span>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    )
  }
}