import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorFallback } from '../ErrorFallback/ErrorFallback';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  errorMessage: string | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    errorMessage: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { errorMessage: error.message ?? 'Unknown error happened. Try again later.' }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.errorMessage) {
      return <ErrorFallback message={this.state.errorMessage} reset={this.resetState} />
    }
    return this.props.children;
  }

  resetState = () => {
    this.setState({ errorMessage: null });
  }
}

