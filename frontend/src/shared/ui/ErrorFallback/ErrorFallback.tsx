import { Component } from 'react';
import Button from '../Button/Button';

interface Props {
    message: string;
    reset: () => void;
}

export class ErrorFallback extends Component<Props> {
    render() {
        return (
            <div >
                <p>Something went wrong...</p>
                <p>
                    Press &apos;Reset&apos; to try again
                </p>
                <p><span>Additional Error Information:</span> {this.props.message}</p>
                <Button text="Reset" handleClick={this.props.reset} />
            </div>
        );
    }
}