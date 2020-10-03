require 'rails_helper'

RSpec.describe "Api::V1::Products", type: :request do
  let(:product) { create(:product) }
  let(:product_attributes) { attributes_for(:product) }
  let(:product_attributes_list) { attributes_for_list(:product, 10) }
  let(:product_invalid_attributes_list) { attributes_for_list(:product_invalid, 10) }

  describe 'GET /' do
    it 'correct welcome menssage'
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
      it 'returns status code 200'
      it 'updates the record'
      it 'returns the product updated'
    end

    context 'when the product does not exists' do
      it 'return status code 404'
      it 'returns a not found message'
    end
  end

  describe 'DELETE /products/:id' do
    context 'when product exists' do
      it 'returns status code 200'
      it 'destroy the record'
    end

    context 'when the product not exit' do
      it 'returns status code 404'
    end
  end

  describe 'GET /products/:id' do
    context 'when product exists' do
      it 'return status code 200'
      it 'return attributes the record'
    end

    context 'when the product does not exists' do
      it 'return status code 404'
      it 'returns a not found message'
    end
  end

  describe 'GET /products' do
    it "If the same quantity is coming"
  end
end
