class Product < ApplicationRecord
  validates_presence_of :title, :category, :price

  enum category: { bakery: 0,
                   dairy: 1,
                   fruit: 2,
                   meat: 3,
                   vegan: 4,
                   vegetable: 5 }

  def as_json(options = {})
    super.tap do |hash|
      hash['price'] = self.price.to_f
    end
  end
end
