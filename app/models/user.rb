class User < ActiveResource::Base
  self.site = DB_URL
  attr_accessible :email,:id
end
