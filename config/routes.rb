Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :records
      resources :artists
    end
  end

  get 'signup', to: 'signup#create'
  get 'signin', to: 'signin#create'
  get 'logout', to: 'signin#destroy'
  get 'refresh', to: 'refresh#create'

  root 'home#index'
end
