import { Component } from 'react';
import { SearchWrapper } from '../../../widget/SearchWrapper/SearchWrapper';
import { Footer } from '../../../shared/ui/Footer/Footer';
import { Header } from '../../../shared/ui/Header/Header';
import { ErrorBoundary } from '../../../shared/ui/ErrorBoundary/ErrorBoundary';

interface State {
  error: boolean;
}

export class Home extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = { error: false };
  }
  render() {
    return (
      <>
        <Header />
        <main className="flex flex-col text-sky-900 grow min-h-0">
          <ErrorBoundary>
            <SearchWrapper
              testingError={this.state.error}
              resetError={this.resetError}
            />
          </ErrorBoundary>
        </main>
        <Footer />
      </>
    );
  }

  resetError = () => {
    this.setState({ error: false });
  };
}
