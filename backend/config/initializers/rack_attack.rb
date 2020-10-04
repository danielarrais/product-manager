module Rack
  class Attack
    Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new

    # Permite tráfego local
    safelist('allow-localhost') do |req|
      '127.0.0.1' == req.ip || '::1' == req.ip
    end

    # Permite 5 requisições a cada 5 segundos
    throttle('req/ip', limit: 5, period: 5) do |req|
      req.ip
    end
  end
end
