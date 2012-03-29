require 'RMagick'
class Field < ActiveResource::Base
  self.site = DB_URL
  
  # Internal: Get all field and create a picture containing all the
  # file stored in database, ordered by id.
  #
  # Returns true if the generation success, false otherwise.
  def self.generate_sprites
    list = Magick::ImageList.new
    self.all.each do |field|
      list.read "http://assets.rdla.fr/#{field.filename}"
    end
    image = list.append(false)
    image.write "#{Rails.root}/public/field.png"
  end
end
