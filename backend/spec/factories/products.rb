FactoryBot.define do
  factory :product do
    title { FFaker::Product.product_name }
    category { %w[bakery dairy fruit meat vegan vegetable].sample }
    price { FFaker::Random.rand(1..1000) }
    rating { FFaker::Random.rand(0..5) }
    width { FFaker::Random.rand(100..500) }
    height { FFaker::Random.rand(100..500) }
    filename { FFaker::Image.url }
  end

  factory :product_invalid, class:  Product do
    title { '' }
    category { '' }
    price { '' }
  end
end
