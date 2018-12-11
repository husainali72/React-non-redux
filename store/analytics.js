import axios from 'axios'
import commonApiURL from '../Provider/commonApiURL';

const GET_ANALYTICS_RESULT = 'GET_ANALYTICS_RESULT'
const GET_ANALYTICS_RESULT_SUCCESS = 'GET_ANALYTICS_RESULT_SUCCESS'
const GET_ANALYTICS_RESULT_FAILED = 'GET_ANALYTICS_RESULT_FAILED'

const GET_ANALYTICS_KEY = 'GET_ANALYTICS_KEY'
const GET_ANALYTICS_KEY_SUCCESS = 'GET_ANALYTICS_KEY_SUCCESS'
const GET_ANALYTICS_KEY_FAILED = 'GET_ANALYTICS_KEY_FAILED'

/* getting analytics result via api with key */
export const getAnalyticsResult = (key) => ({
    type: GET_ANALYTICS_RESULT, key
})
export const getAnalyticsResultSuccess = (result) => ({
    type: GET_ANALYTICS_RESULT_SUCCESS, result
})
export const getAnalyticsResultFaild = (error) => ({
    type: GET_ANALYTICS_RESULT_FAILED, error
})

/* getting key via api */
export const getAnalyticsKey = (query) => ({
    type: GET_ANALYTICS_KEY, query
})
export const getAnalyticsKeySuccess = () => ({
    type: GET_ANALYTICS_KEY_SUCCESS
})
export const getAnalyticsKeyFaild = (error) => ({
    type: GET_ANALYTICS_KEY_FAILED, error
})

export function getAnalytics(query) {
    /* url should be fixed after checking */
    //const urlKey = `http://pandaapi-dev.azurewebsites.net/api/Analytics/CreateIndexMetric`;
    const urlKey = commonApiURL.getAnalyticsKey()
    let urlResult

    return function (dispatch) {
        dispatch(getAnalyticsKey(query))
        axios.post(
            urlKey, query,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: query
            }
        )
            .then(function (response) {
                dispatch(getAnalyticsKeySuccess())
                let key = response.data.key

                /* url should be fixed after checking */
                urlResult = commonApiURL.getAnalytics(key)

                /* getting analytics result using key response */
                axios.get(urlResult)
                    .then(function (response) {
                        dispatch(getAnalyticsResultSuccess({ data: response.data, query: query }))
                    })
                    .catch(function (error) {
                        dispatch(getAnalyticsResultFaild(error.response))
                    })
            })
            .catch(function (error) {
                dispatch(getAnalyticsKeyFaild(error.response))
            });
    }
}

export default function (result = null, action) {
    switch (action.type) {
        case GET_ANALYTICS_KEY:
            return { data: null, query: null, loading: true, error: null }
        case GET_ANALYTICS_RESULT_SUCCESS:
            return { data: action.result.data, query: action.result.query, loading: false, error: { status: 200, statusText: 'Success' } }
        case GET_ANALYTICS_KEY_FAILED:
            return { data: null, query: null, loading: false, error: action.error }
        case GET_ANALYTICS_RESULT_FAILED:
            return { data: null, query: null, loading: false, error: action.error }
        default:
            return { data: null, query: null, loading: false, error: null }
    }
}

