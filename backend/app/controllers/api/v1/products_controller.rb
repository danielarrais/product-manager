class Api::V1::ProductsController < Api::V1::ApiController
  before_action :set_product, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  def index
    @products = Product.all
    render json: @products, status: :ok
  end

  def show
    render json: @product, status: :ok
  end

  def create
    products = ImportProductsService.call(json_file_params)
    render json: products, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: { message: e.message }, status: :unprocessable_entity
  end

  def update
    if @product.update(product_params)
      render json: @product, status: :ok
    else
      render json: { errors: @product.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy
    render json: @product, status: :ok
  end

  private

  def json_file_params
    params[:json_file]
  end

  def product_params
    params.require(:product).permit(:title, :category, :price, :rating, :width, :height, :filename)
  end

  def set_product
    @product = Product.find(params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: { message: e.message }, status: :not_found
  end
end
