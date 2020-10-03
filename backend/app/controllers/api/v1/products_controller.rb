class Api::V1::ProductsController < Api::V1::ApiController
  before_action :set_product, only: [:show, :update, :destroy]

  def index

  end

  def show

  end

  def create
    products = ImportProductsService.call(json_file_params)
    render json: products, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: { message: e.message }, status: :unprocessable_entity
  end

  def update

  end

  def destroy

  end

  private

  def json_file_params
    params[:json_file]
  end

  def set_product
    @product = Product.find(params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: { message: e.message }, status: :not_found
  end
end
