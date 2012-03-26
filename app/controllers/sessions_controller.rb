#encoding: utf-8
class SessionsController < ApplicationController
	def create
		result = request.env['omniauth.auth']
		email = result.info.email if(result.provider == "facebook")
		email = params[:email] if(result.provider == "developer")
		
		
		u = User.get(:find_by_email, :email => email)

		if !u.blank?
			session[:user] =  u["id"]
			redirect_to connect_player_path
		else
			flash[:notice] = "Impossible de vous connecter."
			redirect_to root_path
		end
		
	end

	
end
