#encoding: utf-8
class GameController < ApplicationController
  before_filter :check_user
  def index
    player = Player.find(session[:player_connected].to_i)
    if user.id == player.user_id
      @player = player
    else
      redirect_to root_path
    end
  end
  def log_player
    player = Player.find(params[:id].to_i)
    if user.id == player.user_id
      session[:player_connected] = player.id
      redirect_to game_path
    else
      redirect_to root_path
    end
  end
  def connect_player
    @players = user.get(:players)
  end
private
  def check_user
    @user = User.find(session[:user].to_i)
    if user.blank?
      redirect_to root_path
    end
  end
end
