const BUTTON_STATE_ENUM = {
    START: "START",
    IN_PROGRESS: "IN_PROGRESS",
    READY: "READY"
}

const BUTTON_STATE_LABEL = {
    [BUTTON_STATE_ENUM.START]: "START GAME",
    [BUTTON_STATE_ENUM.IN_PROGRESS]: "WAIT FOR IT...",
    [BUTTON_STATE_ENUM.READY]: "CLICK NOW!!!"
}

const DEFAULT_BUTTON_STYLE = "text-white font-bold py-2 px-4 border-b-4 rounded"
const STATE_BUTTON_STYLE = {
    [BUTTON_STATE_ENUM.START]: "bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500",
    [BUTTON_STATE_ENUM.IN_PROGRESS]: "bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500 cursor-not-allowed",
    [BUTTON_STATE_ENUM.READY]: "bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500",
}

class Button {
    constructor($target) {
        this.target = $target;
        this.state = BUTTON_STATE_ENUM.START;
        this.render();
    }

    changeButtonState() {
        switch (this.state) {
            case BUTTON_STATE_ENUM.START:
                this.state = BUTTON_STATE_ENUM.IN_PROGRESS
                const randomTime = Math.random() * 10
                console.info(`Button will change after ${randomTime.toFixed(2)}sec`)
                setTimeout(() => {
                    this.state = BUTTON_STATE_ENUM.READY;
                    this.render();
                }, randomTime * 1000)
                this.render()
                break
            case BUTTON_STATE_ENUM.IN_PROGRESS:
                alert("Too Soon! 😉")
                break
            case BUTTON_STATE_ENUM.READY:
                this.state = BUTTON_STATE_ENUM.START;
                this.render()
                break
        }
    }

    render() {
        const button = document.createElement("button");
        button.className = DEFAULT_BUTTON_STYLE + " " + STATE_BUTTON_STYLE[this.state];
        button.id = "button"
        button.innerText = BUTTON_STATE_LABEL[this.state]
        button.addEventListener("click", () => this.changeButtonState())

        this.target.replaceChildren(button)

    }
}

class App {
    constructor($target) {
        new Button($target)
    }
}

new App(document.querySelector("#app"))
