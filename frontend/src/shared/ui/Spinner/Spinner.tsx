import { Component } from "react"

export class Spinner extends Component {
    render() {
        return (
            <div
                role="status"
                aria-label="Loading"
                className="flex m-auto h-10 w-10 animate-spin rounded-full border-4 border-[oklch(0.443_0.11_240.79)] border-t-transparent"
            />
        );
    }

}
