const Setting = {
    "HealthCheckUrl": "http://103.116.101.74:8000/healthchecks-ui#/healthchecks",
    "GatewayUrl": "http://103.116.101.74:8000",
    "UploadUrl": "http://" + window.location.hostname + ":" + window.location.port + "/",
    "Notification": {
        "UrlConnect": "http://103.116.101.74:8500/signalr",
        "Channel": {
            "NOTIFICATION_INTERNAL": 'NOTIFICATION_INTERNAL'
        }
    },
    "OAuth2": {
        "Realms": 'INTERNAL',
        "ClientId": "internal_management",
        "Url": "https://dev-id.safin.vn/auth",
        "AppCode": "Internal"
    }
}