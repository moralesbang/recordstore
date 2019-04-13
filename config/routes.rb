Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :records
      resources :artists
    end
  end

  get 'signin', to: 'signin#create'
  get 'refresh', to: 'refresh#create'
  post 'signup', to: 'signup#create'
  delete 'logout', to: 'signin#destroy'

  root 'home#index'
end
