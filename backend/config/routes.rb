Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :products
      get '/', to: 'welcome#index', as: 'root'
    end
  end
end
