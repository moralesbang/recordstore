module Authenticable
  extend ActiveSupport::Concern

  def respond_with_credentials_to(user)
    payload = { user_id: user.id }
    session = JWTSessions::Session.new(payload: payload, refresh_by_access_allowed: true)
    tokens = session.login

    response.set_cookie(
      JWTSessions.access_cookie,
      value: tokens[:access],
      httponly: true,
      secure: Rails.env.production
    )

    render json: { csrf: tokens[:csrf] }
  end
end
