Rails.application.config.middleware.use OmniAuth::Builder do
  FACEBOOK_LOGIN = ENV['FACEBOOK_LOGIN']
  FACEBOOK_PASSWORD = ENV['FACEBOOK_PASSWORD']
  provider :developer unless Rails.env.production?
  provider :facebook, FACEBOOK_LOGIN, FACEBOOK_PASSWORD,
           :scope => 'email', :display => 'page'
end
