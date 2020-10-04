FactoryBot.define do
  factory :user do
    email { FFaker::Internet.email }
    password { 'testepass' }
    password_confirmation { 'testepass' }
  end
end
