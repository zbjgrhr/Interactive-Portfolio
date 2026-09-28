"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="explore-page">
          <h1>Something went quiet.</h1>
          <p>The interactive layer failed to load. You can still browse the archive.</p>
          <a className="btn-primary" href="/explore">
            Explore Directly
          </a>
        </main>
      );
    }
    return this.props.children;
  }
}
