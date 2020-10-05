class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  def page
    params[:page] || 1
  end

  def per_page
    params[:per_page] || 10
  end

  def json_pagination_info(results)
    { docs: results.to_a,
      total: results.total_count,
      limit: results.limit_value,
      page: results.current_page,
      pages: results.total_pages }
  end
end
