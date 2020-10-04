require 'rails_helper'

RSpec.describe "Api::V1::Products", type: :request do
  let(:product) { create(:product) }
  let(:product_invalid_attributes) { attributes_for(:product_invalid) }
  let(:product_attributes) { attributes_for(:product) }
  let(:product_attributes_list) { attributes_for_list(:product, 10) }
  let(:product_invalid_attributes_list) { attributes_for_list(:product_invalid, 10) }

  describe 'GET /products' do
    it "if the same quantity is coming" do
      products = FactoryBot.create_list(:product, 10)
      get api_v1_products_path
      expect(products.size).to eq(json.size)
    end
  end

  describe 'POST /products' do
    context 'when sending a valid JSON file' do
      after(:each) do
        File.delete('tmp/products.json')
      end
      it 'with records with valid attributes' do
        @json_file = File.open("tmp/products.json", "w") { |f| f.puts(product_attributes_list.to_json) }
        @json_upload_file = Rack::Test::UploadedFile.new("tmp/products.json", 'application/json')

        expect {
          post api_v1_products_path, params: { json_file: @json_upload_file }
        }.to change(Product, :count).from(0).to(10)
      end

      it 'with records with invalid attributes' do
        @json_file = File.open("tmp/products.json", "w") { |f| f.puts(product_invalid_attributes_list.to_json) }
        @json_upload_file = Rack::Test::UploadedFile.new("tmp/products.json", 'application/json')

        expect {
          post api_v1_products_path, params: { json_file: @json_upload_file }
        }.to_not change(Product, :count)
      end
    end
  end

  describe 'PUT /products/:id' do
    context 'when product exists' do
      context 'and updated with valid attributes' do
        before(:each) do
          put api_v1_product_path(product), params: { product: product_attributes }
        end

        it 'returns status code 200' do
          expect(response).to have_http_status(200)
        end

        it 'updates the record' do
          expect(product.reload).to have_attributes(product_attributes)
        end

        it 'returns the product updated' do
          expect(product.reload).to have_attributes(json.except('created_at', 'updated_at'))
        end
      end

      context 'and updated with invalid attributes' do
        it 'returns status code 422' do
          put api_v1_product_path(product), params: { product: product_invalid_attributes }
          expect(response).to have_http_status(422)
        end
      end
    end

    context 'when the product does not exists' do
      before(:each) do
        put api_v1_product_path(id: 0), params: { product: product_attributes }
      end

      it 'return status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Product/)
      end
    end
  end

  describe 'DELETE /products/:id' do
    context 'when product exists' do
      before(:each) do
        delete api_v1_product_path(product)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'destroy the record' do
        expect {
          product.reload
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context 'when the product not exit' do
      it 'returns status code 404' do
        delete api_v1_product_path(id: 0)
        expect(response).to have_http_status(404)
      end
    end
  end

  describe 'GET /products/:id' do
    context 'when product exists' do
      before(:each) do
        get api_v1_product_path(product)
      end

      it 'return status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'return attributes the record' do
        expect(product).to have_attributes(json.except('created_at', 'updated_at'))
      end
    end

    context 'when the product does not exists' do
      before(:each) do
        get api_v1_product_path(id: 0)
      end

      it 'return status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Product/)
      end
    end
  end
end
