class ImportProductsService

  private_class_method :new

  def self.call(json_file)
    return self.new.send(:import_products, json_file)
  end

  private

  def import_products(json_file)
    json = json_file.read
    products = JSON.parse(json)

    products = products.map { |x| Product.new(change_type_to_category(x)) }

    Product.import! products
  end

  def change_type_to_category(product)
    product['category'] = product['type'] if product['type'].present?
    product.delete('type') if product['type'].present?

    product
  end
end
