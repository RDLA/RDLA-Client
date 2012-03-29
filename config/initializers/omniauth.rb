Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :facebook, FACEBOOK_LOGIN, FACEBOOK_PASSWORD,
           :scope => 'email', :display => 'page'
end
