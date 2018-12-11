const OPEN_IFRAME = "OPEN_IFRAME"
const CLOSE_IFRAME = "CLOSE_IFRAME"

export const openIframe = () => ({
	type: OPEN_IFRAME
})

export const closeIframe = () => ({
	type: CLOSE_IFRAME
})

export default function(iframeModal = false, action) {
    switch (action.type) {
        case OPEN_IFRAME:
            return true
        case CLOSE_IFRAME:
			return false
        default:
            return iframeModal
    }
}
