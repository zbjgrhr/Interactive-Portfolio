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
          <h1>出了点问题。</h1>
          <p>互动层加载失败，你仍然可以浏览作品集。</p>
          <a className="btn-primary" href="/explore">
            直接浏览
          </a>
        </main>
      );
    }
    return this.props.children;
  }
}
