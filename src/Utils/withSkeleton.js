import React from 'react';
import { connect } from 'react-redux'
import Skeleton from 'react-loading-skeleton';

const ROWS_4_WIDTHS = [350, 250, 300, 120]

export default (component, { width, height = 14, rows = 1} = {}) => {
  class WithSkeleton extends React.Component {
    render() {
      if (this.props.isLoading) {
        if (rows === 1) {
          return <Skeleton height={height} width={width} />
        } else if (rows === 4) {
          return ROWS_4_WIDTHS.map(rowWidth => {
            return (
              <p><Skeleton height={height} width={rowWidth} /></p>
            )
          })
        } else {
          throw new Error("Not defined nuber of skeleton rows")
        }   
      }

      return component;
    }
  }

  function mapStateToProps(state) {
    return {
      isLoading: state.global.isLoadingImmediate,
    }
  }

  const WrappedComponent = connect(mapStateToProps)(WithSkeleton)

  return <WrappedComponent/>
}