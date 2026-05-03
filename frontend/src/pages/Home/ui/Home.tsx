import { Component } from "react";
import { SearchWrapper } from "../../../widget/SearchWrapper/SearchWrapper";
import { Footer } from "../../../shared/ui/Footer/Footer";
import { Header } from "../../../shared/ui/Header/Header";
import Button from "../../../shared/ui/Button/Button";
import { ErrorBoundary } from "../../../shared/ui/ErrorBoundary/ErrorBoundary";

interface State {
    error: boolean;
}

export class Home extends Component<object, State> {
    constructor(props: object) {
        super(props);
        this.state = { error: false }
    }
    render() {
        return <>
            <Header />
            <ErrorBoundary><SearchWrapper testingError={this.state.error} resetError={this.resetError} /></ErrorBoundary>
            <Footer><Button text="Error" handleClick={() => this.setState({ error: true })} /></Footer>
        </>
    }

    resetError = () => {
        this.setState({ error: false })
    }

}