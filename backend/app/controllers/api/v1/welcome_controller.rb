class Api::V1::WelcomeController < Api::V1::ApiController
  before_action :authenticate_user!

  def index
    render json: { message: 'Ruby on Rails Challenge 20200810' }, status: :ok
  end
end
