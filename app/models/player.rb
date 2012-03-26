class Player < ActiveResource::Base
  self.site = "#{DB_URL}"
  attr_accessible :id, :name
end
