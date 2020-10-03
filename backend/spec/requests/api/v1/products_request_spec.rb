require 'rails_helper'

RSpec.describe "Api::V1::Products", type: :request do
  let(:product) { create(:product) }
  let(:products_list) { create_list(:product, 10) }
  let(:product_attributes) { attributes_for(:product) }

  describe 'GET /' do
    it 'correct welcome menssage'
  end

  describe 'POST /products' do
    context 'when sending a valid JSON file' do
      it 'json com registros com atributos válidos'
      it 'json com registros com atributos inválidos'
    end

    context 'when sending a invalid JSON file' do
      it 'file with a format other than JSON'
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
