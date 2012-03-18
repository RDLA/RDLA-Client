Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
   provider :facebook, "285503821517899", "ad01f47e7d4f7efe8f77ae50461e9046",
           :scope => 'email', :display => 'page'
end
