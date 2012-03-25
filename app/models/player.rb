class Player < ActiveResource::Base
  self.site = "#{DB_URL}"
end
