import { Component } from 'react';
import { SearchWrapper } from '../../../widget/SearchWrapper/SearchWrapper';
import { Footer } from '../../../shared/ui/Footer/Footer';
import { Header } from '../../../shared/ui/Header/Header';
import { ErrorBoundary } from '../../../shared/ui/ErrorBoundary/ErrorBoundary';

export class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <main className="flex flex-col text-sky-900 grow min-h-0">
          <ErrorBoundary>
            <SearchWrapper />
          </ErrorBoundary>
        </main>
        <Footer />
      </>
    );
  }
}
