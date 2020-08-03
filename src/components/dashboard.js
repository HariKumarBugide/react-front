import React from 'react';
import ReactDOM from 'react-dom';
import {PieChart} from 'react-d3-components';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);
    this.state = {parentWidth: 0};
  }

  render() {
    let { data, width, height, margin, sort, ...props} = this.props;

    if (width === '100%') {
      width = this.state.parentWidth || 400;
    }

    return (
      <PieChart
        ref="piechart"
        data={data}
        width={width}
        height={height}
        margin={margin}
        sort={sort}
        {...props}
      />
    );
  }

  handleResize(e) {
    // findDomNode is not available for ES6 classes
    // Figure out what elem = this.findDomNode() supposed to return and do it differently
    let elem = ReactDOM.findDOMNode(this.refs.piechart);
    let width = elem.offsetWidth;

    this.setState({
      parentWidth: width
    });
  }

  componentDidMount() {
    if (this.props.width === '100%') {
      window.addEventListener('resize', this.handleResize);
    }
    this.handleResize();
  }

  componentWillUnmount() {
    if (this.props.width === '100%') {
      window.removeEventListener('resize', this.handleResize);
    }
  }

};

Dashboard.defaultProps = {
  width: '100%',
  height: 200,
  margin: {left: -1, top: 10, bottom: 0, right: 1}
};