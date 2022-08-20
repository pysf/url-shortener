// eslint-disable-next-line no-undef
module.exports = {
    API_PORT: 3000,
    ETCD_HOSTS: 'etcd:2379',
    LOCK_RESOURCE: 'url-shortner-lock',
    COUNTER_RESOURCE: 'url-shortner-counter',
    COUNTER_RANGE: 10,
    REDIS_URL: 'redis://redis:6379',
    SHORTNER_DOMAIN: 'https://tier.app',
    VISIT_KEY_PREFIX: 'visit-',
}
