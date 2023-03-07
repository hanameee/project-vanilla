const BUTTON_STATE_ENUM = {
    START: "START",
    IN_PROGRESS: "IN_PROGRESS",
    READY: "READY"
}

const BUTTON_STYLE = {
    [BUTTON_STATE_ENUM.START]: "bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500",
    [BUTTON_STATE_ENUM.IN_PROGRESS]: "bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500",
    [BUTTON_STATE_ENUM.READY]: "bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500",
}

// onClickListener for button
const handleOnClickButton = (buttonState) => {
    switch (buttonState) {
        case BUTTON_STATE_ENUM.START:
            console.log("START")
        case BUTTON_STATE_ENUM.IN_PROGRESS:
            console.log("IN_PROGRESS")
        case BUTTON_STATE_ENUM.READY:
            console.log("READY")
        default:
            console.log("NONE")
    }
}