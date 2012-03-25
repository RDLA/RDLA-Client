class FieldsController < ApplicationController
  def index
    @fields = Field.all
  end
end
