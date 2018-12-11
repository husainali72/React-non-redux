class commonApiURL {
    getBaseURL() {
        return "https://pandaapi-dev.azurewebsites.net/api/"
    }

    getPriceHistorcalAPIURL() {
        return "https://min-api.cryptocompare.com/data/pricehistorical"
    }

    getAnalyticsKey() {
        return this.getBaseURL() + "Analytics/CreateIndexMetric"
    }
    getAnalytics(key) {
        return this.getBaseURL() + "Analytics/GetResult?key=" + key
    }
}

export default new commonApiURL