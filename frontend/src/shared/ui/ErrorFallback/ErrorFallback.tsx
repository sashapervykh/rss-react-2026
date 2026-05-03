import { Component } from 'react';

interface Props {
  message: string;
  reset: () => void;
}

export class ErrorFallback extends Component<Props> {
  render() {
    return (
      <div className="flex flex-col text-red-700 bg-red-200 rounded-2xl border-3 border-red-700 w-fit h-fit m-[0_auto] p-[2rem] justify-center">
        <p className="font-bold">
          Something went wrong... Search again to reset error
        </p>
        <p className="mb-[1rem] max-w-[80vw]">
          <span className="font-bold">Error Information:</span>{' '}
          {this.props.message}
        </p>
      </div>
    );
  }
}
