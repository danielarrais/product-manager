class Product < ApplicationRecord
  validates_presence_of :title, :category, :price

  enum category: { bakery: 0,
                   dairy: 1,
                   fruit: 2,
                   meat: 3,
                   vegan: 4,
                   vegetable: 5 }
end
