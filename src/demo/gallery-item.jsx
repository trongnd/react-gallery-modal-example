import React, { Component, PropTypes } from 'react';
import { Image, Segment, Dimmer, Loader } from 'semantic-ui-react';
import autobind from 'autobind-decorator';
import NO_PHOTO_IMG from './assets/no-photo.png';

class GalleryItem extends Component {

  static propTypes = {
    data: PropTypes.shape({
      img: PropTypes.string,
    }).isRequired,
  }

  state = {
    loaded: false,
    error: false,
  }

  @autobind
  onLoad() {
    this.setState({ loaded: true });
  }

  @autobind
  onError() {
    this.setState({ error: true });
  }

  render() {
    const { img } = this.props.data;
    const { loaded, error } = this.state;

    if (loaded) {
      return (
        <Image as="img" src={img} shape="rounded" />
      );
    }

    if (error) {
      return (
        <Image as="img" src={NO_PHOTO_IMG} shape="rounded" />
      );
    }

    return (
      <div>
        <Segment>
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
          <Image as="img" src={NO_PHOTO_IMG} shape="rounded" />
        </Segment>

        <Image
          as="img" src={img} shape="rounded"
          onLoad={this.onLoad}
          onError={this.onError}
        />
      </div>
    );
  }
}

export default GalleryItem;
