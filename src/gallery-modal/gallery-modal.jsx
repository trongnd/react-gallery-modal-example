import React, { Component, PropTypes } from 'react';
import { Modal } from 'semantic-ui-react';
import { WindowResizeListener } from 'react-window-resize-listener';
import noop from 'lodash/noop';
import autobind from 'autobind-decorator';
import { getWindowSize } from '../utils/dom-utils';
import GalleryViewer from './gallery-viewer';

class GalleryModal extends Component {

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    renderItem: PropTypes.func.isRequired,
    onClickClose: PropTypes.func,
    pageItems: PropTypes.number,
    maximumItems: PropTypes.number,
  };

  static defaultProps = {
    onClickClose: noop,
    pageItems: 25,
    maximumItems: Infinity,
  };

  constructor(props) {
    super(props);

    this.state = {
      windowSize: getWindowSize(),
    };
  }

  @autobind
  onWindowResize(windowSize) {
    this.setState({ windowSize: windowSize || getWindowSize() });
  }

  calulateViewerColumns() {
    const { windowWidth } = this.state.windowSize;

    if (windowWidth >= 900) return 4;
    if (windowWidth >= 650) return 3;
    if (windowWidth >= 400) return 2;

    return 1;
  }

  calculateModalHeight() {
    const { windowHeight } = this.state.windowSize;

    return Math.max(windowHeight - 100, windowHeight * 0.8) - 100;
  }

  render() {
    const { visible, items, pageItems, maximumItems, renderItem, onClickClose } = this.props;
    const columns = this.calulateViewerColumns();
    const height = this.calculateModalHeight();

    return (
      <Modal open={visible} closeIcon onClose={onClickClose}>
        <Modal.Header>Gallery</Modal.Header>

        <Modal.Content>
          <div style={{ height }}>
            <GalleryViewer
              items={items}
              pageItems={pageItems}
              maximumItems={maximumItems}
              columns={columns}
              renderItem={renderItem}
            />
          </div>
        </Modal.Content>

        <WindowResizeListener onResize={this.onWindowResize} />
      </Modal>
    );
  }
}

export default GalleryModal;
