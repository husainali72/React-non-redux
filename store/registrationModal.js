const OPEN_MODAL = "OPEN_MODAL"
const CLOSE_MODAL = "CLOSE_MODAL"

export const openModal = () => ({
	type: OPEN_MODAL
})

export const closeModal = () => ({
	type: CLOSE_MODAL
})

export default function(registrationModal = false, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return true
        case CLOSE_MODAL:
			return false
        default:
            return registrationModal
    }
}
