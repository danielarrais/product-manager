class ImportProductsService

  private_class_method :new

  def self.call(json_file)
    return self.new.send(:import_products, json_file)
  end

  private

  def import_products(json_file)
    json = json_file.read
    products = JSON.parse(json)

    products = products.map { |x| Product.new(x) }

    Product.import! products
  end

  def fill_attributes(products)
    products.each do |product|
      product['created_at'] = DateTime.current
      product['updated_at'] = DateTime.current
      product['category'] = product['type'] if product['type'].present?
    end
  end
end
