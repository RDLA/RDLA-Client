require 'RMagick'
require 'net/ftp'
class Field < ActiveResource::Base
  self.site = DB_URL
  
  # Internal: Get all field and create a picture containing all the
  # file stored in database, ordered by id.
  #
  # Returns true if the generation success, false otherwise.
  def self.generate_sprites
    begin
      list = Magick::ImageList.new
      self.all.each do |field|
        list.read "#{ASSETS_URL}#{field.filename}"
      end
      image = list.append(false)
      ftp=Net::FTP.new
      ftp.connect(FTP_URL,21)
      ftp.login(FTP_USER,FTP_PASSWORD)
      ftp.chdir("assets")
      image.write "#{Rails.root}/tmp/field.png"
      ftp.putbinaryfile("#{Rails.root}/tmp/field.png", "field.png")
      ftp.close
      true
    rescue
        false
    end
  end
end
