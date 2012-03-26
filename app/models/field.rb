class Field < ActiveResource::Base
  self.site = DB_URL
  attr_accessible :id, :filename
end
