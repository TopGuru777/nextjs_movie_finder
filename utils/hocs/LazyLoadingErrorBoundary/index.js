/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from 'react';

/*** Adapted from https://reactjs.org/docs/error-boundaries.html ***/
class LazyLoadingErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    console.log('[LazyLoadingErrorBoundary getDerivedStateFromError] error => ', error);
    return {hasError: true};
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '64px 0',
            textAlign: 'center'
          }}>
          <button onClick={() => window.location.reload()}>Click to Reload</button>
          <p
            style={{
              textAlign: 'center',
              padding: '12px 0'
            }}>
            Lazy-loading failed!
          </p>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default LazyLoadingErrorBoundary;
