import React, { Component, PropTypes } from 'react';
import { Grid } from 'semantic-ui-react';
import autobind from 'autobind-decorator';
import InfiniteDataSource from '../utils/infinite-datasource';
import './gallery-viewer.less';

class GalleryViewer extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    renderItem: PropTypes.func.isRequired,
    pageItems: PropTypes.number,
    maximumItems: PropTypes.number,
    columns: PropTypes.number,
    threshold: PropTypes.number,
  };

  static defaultProps = {
    columns: 5,
    threshold: 100,
  };

  constructor(props) {
    super(props);

    this.lastLoadedTime = 0;

    this.receiveProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.receiveProps(nextProps);
  }

  receiveProps(props) {
    if (!this.state) this.state = {};

    const { items, pageItems, maximumItems } = props;

    const dataSource = new InfiniteDataSource(items, { pageItems, maximumItems });

    this.state.dataSource = dataSource;
  }

  @autobind
  onScroll() {
    const { threshold } = this.props;
    const { scrollTop, scrollHeight, clientHeight } = this.scroller;

    if (scrollHeight - scrollTop - clientHeight > threshold) return;

    // TODO: temporary workaround to prevent overlapping loading next page
    if (Date.now() - this.lastLoadedTime < 500) return;

    this.lastLoadedTime = Date.now();

    // load next page items
    const dataSource = this.state.dataSource.next();

    this.setState({ dataSource });
  }

  @autobind
  setRefScroll(ref) {
    this.scroller = ref;
  }

  render() {
    const { columns, renderItem } = this.props;
    const items = this.state.dataSource.getItems();

    const gridItems = items.map((item, index) => {
      const key = ('id' in item) ? item.id : index;

      return (
        <Grid.Column key={key}>
          { renderItem(item) }
        </Grid.Column>
      );
    });

    return (
      <div
        ref={this.setRefScroll}
        onScroll={this.onScroll}
        className="gallery-viewer"
      >
        <Grid columns={columns}>
          { gridItems }
        </Grid>
      </div>
    );
  }
}

export default GalleryViewer;
