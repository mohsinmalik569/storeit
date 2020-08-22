Rails.application.routes.draw do
  root "activities#new"
  resources :activities do
    collection do
      get 'step1'
      get 'step2'
      get 'step3'
      get 'step4'
    end
  end
end
