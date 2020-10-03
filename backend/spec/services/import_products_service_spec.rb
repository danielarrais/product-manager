require 'rails_helper'

describe ImportProductsService do
  let(:json_file) { File.open("tmp/products.json", "r") }
  let(:product_attributes_list) { attributes_for_list(:product, 10) }
  let(:product_invalid_attributes_list) { attributes_for_list(:product_invalid, 10) }

  context 'when import data from valid JSON file' do
    after(:each) do
      File.delete(json_file.path)
    end

    it 'with records with valid attributes' do
      File.open("tmp/products.json", "w") { |f| f.puts(product_attributes_list.to_json) }

      expect {
        ImportProductsService.call(json_file)
      }.to change(Product, :count).from(0).to(10)
    end

    it 'with records with invalid attributes' do
      File.open("tmp/products.json", "w") { |f| f.puts(product_invalid_attributes_list.to_json) }

      expect {
        ImportProductsService.call(json_file)
      }.to raise_error ActiveRecord::RecordInvalid
    end
  end
end
