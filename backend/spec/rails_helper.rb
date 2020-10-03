require 'spec_helper'
require File.expand_path('../config/environment', __dir__)

Dir[Rails.root.join('spec', 'support', '**', '*.rb')].each { |x| require x }

ENV['RAILS_ENV'] ||= 'test'

abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'rspec/rails'

begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  puts e.to_s.strip
  exit 1
end

RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
  config.include FactoryBot::Syntax::Methods
  config.include Requests::JsonHelpers, type: :request
end
