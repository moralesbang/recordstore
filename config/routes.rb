Rails.application.routes.draw do

  get 'signup/create'
  namespace :api do
    namespace :v1 do
      resources :records
      resources :artists
    end
  end

  root 'home#index'
end
