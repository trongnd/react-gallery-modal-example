import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import autobind from 'autobind-decorator';
import 'semantic-ui-less/semantic.less';
import GalleryModal from '../gallery-modal';
import GalleryItem from './gallery-item';
import generateData from './generate-data';
import './demo-app.less';

class DemoApp extends Component {

  state = {
    isModalVisible: false,
    items: generateData(),
  };

  @autobind
  onClickCloseModal() {
    this.setState({ isModalVisible: false });
  }

  @autobind
  openGalleryModal() {
    this.setState({ isModalVisible: true });
  }

  @autobind
  // eslint-disable-next-line class-methods-use-this
  renderGalleryItem(item) {
    return (<GalleryItem data={item} />);
  }

  render() {
    const { isModalVisible, items } = this.state;

    return (
      <div className="demo-app-container">
        <Button className="open-gallery-button" positive size="large" onClick={this.openGalleryModal}>
          Open Gallery
        </Button>

        <GalleryModal
          visible={isModalVisible}
          items={items}
          renderItem={this.renderGalleryItem}
          onClickClose={this.onClickCloseModal}
          pageItems={25}
          maximumItems={125}
        />
      </div>
    );
  }
}

export default DemoApp;
