"use client";

import { Component } from "react";

// Scoped to the optional 3D hero enhancement only. Errors from anywhere else
// in the app still propagate to Next.js's error handling — this deliberately
// does not become a global "hide all crashes" boundary.
export default class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn(
      "[Mianx] Hero 3D scene threw while rendering — showing the static brand hero.",
      error
    );
    this.props.onError?.(error);
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
