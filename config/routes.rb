Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :records
      resources :artists
    end
  end

  post 'signin', to: 'signin#create'
  post 'signup', to: 'signup#create'
  get 'refresh', to: 'refresh#create'
  delete 'logout', to: 'signin#destroy'

  root 'home#index'
end
