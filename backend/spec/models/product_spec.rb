require 'rails_helper'

RSpec.describe Product, type: :model do
  let(:product) { build(:product) }
  let(:product_invalid) { build(:product_invalid) }

  it 'with valid attributes' do
    expect(product).to be_valid
  end

  it 'with invalid attributes' do
    expect(product_invalid).to_not be_valid
  end
end
