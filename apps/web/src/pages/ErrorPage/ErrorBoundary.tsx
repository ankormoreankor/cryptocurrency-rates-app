import { Component } from 'react';

import type { ReactElement } from 'react';

interface ErrorBoundaryProps {
  children: ReactElement;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError = (error) => {
    return { hasError: true };
  };

  componentDidCatch = (error, info) => {
    this.setState({ error, info });
  };

  render(): JSX.Element {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Oops, something went wrong :(</h1>
          <h2>Our engineering team has been notified, click the button below to reload the app</h2>
          <div>
            <button onClick={() => window.location.reload()}>Reload</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
