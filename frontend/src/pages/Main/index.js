import React, {Component} from 'react';
import api from './../../services/api.service'
import authHeader from './../../services/auth-header'
import ProductsList from "../../components/ProductsList";
import {css} from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import './styles.css'

const override = css`
  margin-right: 5px;
`;

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.child = React.createRef();

    this.state = {
      file: undefined,
      fileName: undefined,
      fileType: undefined,
      fileFormatInvalid: undefined,
      fileNotSelected: undefined,
      sucessImportation: undefined,
      formInvalid: undefined,
      loading: false
    }
  }

  handleSubmit = (event) => {
    this.validateForm().then(() => {
      if (!this.state.formInvalid){
        this.setState({
          loading: true
        }, this.importProducts)
      }
    });

    event.preventDefault();
  }

  importProducts = () => {
    const formData = new FormData();
    formData.append('json_file', this.state.file);

    const config = {headers: {'content-type': 'multipart/form-data', ...authHeader()}}

    api.post('/api/v1/products', formData, config).then((response) => {
      this.setState({
        loading: false,
        sucessImportation: response.status === 200
      }, this.updateProductsList)
    })
  }

  onChangeFsonFile = (event) => {
    const file = event.target.files[0]
    this.setState({
      file: file,
      fileName: file['name'],
      fileType: file['type'],
      fileFormatInvalid: false,
      fileNotSelected: false,
      formInvalid: false
    });
  }

  validateFileFormat = () => {
    const fileType = this.state.fileType
    this.setState({
      fileFormatInvalid: fileType !== "application/json" && fileType !== undefined
    });
  }

  validateFileRequired = () => {
    this.setState({
      fileNotSelected: this.state.fileType === undefined
    });
  }
  
  validateForm = async () => {
    await this.validateFileFormat();
    await this.validateFileRequired();

    this.setState({
      formInvalid: this.state.fileFormatInvalid ||  this.state.fileNotSelected
    })
  }

  updateProductsList = () => {
    this.child.current.loadProducts();
  }

  render() {
    return (
      <main className="container mb-4">
        <div className="pt-4">
          <div className="card mb-5">
            <div className="card-header">
              Attention!
            </div>
            <div className="card-body">
              <ul>
                <li>The file must have JSON format</li>
                <li>Each record must have at least the following fields: <b>title, type e price</b></li>
              </ul>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="row mb-4 justify-content-center">
              <div className="col-sm-6">
                <label htmlFor={'json-file-input'}
                       className="form-control file-label-input">
                  {this.state.fileName || 'Click to select a JSON file...'}
                </label>
                <input id={'json-file-input'}
                       name={'file'} onChange={this.onChangeFsonFile}
                       className="file-path validate d-none" type="file" placeholder="Upload your file"/>
                {this.state.fileFormatInvalid ?
                  <p className="text-danger m-0"><small>The selected file is not a JSON</small></p> : null}
                {this.state.fileNotSelected ?
                  <p className="text-danger m-0"><small>Select a JSON file</small></p> : null}
              </div>

              <div className="col-sm-auto">
                <button disabled={this.state.loading} type="submit" className="btn btn-primary text-white">
                  <div className="d-flex justify-content-between">
                    <ClipLoader css={override}
                                size={22}
                                color={"#ccc"}
                                loading={this.state.loading}/>
                    <span> Send</span>
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>

        {this.state.sucessImportation ?
          <div className="alert alert-success mb-4" role="alert">
            Import performed successfully
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> : null}

        <ProductsList ref={this.child}/>
      </main>)
  }
}