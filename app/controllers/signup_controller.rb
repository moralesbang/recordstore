class SignupController < ApplicationController
  include Session

  def create
    user = User.new(user_params)

    if user.save
      respond_with_credentials_to(user)
    else
      render json: { error: user.errors.full_messages.join(' ') }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation)
  end
end
