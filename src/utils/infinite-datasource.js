import merge from 'lodash/merge';
import take from 'lodash/take';

class InfiniteDataSource {

  constructor(items, options) {
    this.items = items || [];

    this.options = merge({
      pageItems: 25,
      maximumItems: Infinity,
    }, options);

    this.loadedItems = this.options.pageItems;
  }

  hasUnloadItems() {
    return this.loadedItems < this.items.length;
  }

  getItems() {
    return take(this.items, this.loadedItems);
  }

  next() {
    const { loadedItems, items, options } = this;
    const { pageItems, maximumItems } = options;

    const itemCount = Math.min(items.length, maximumItems, loadedItems + pageItems);

    const dataSource = new InfiniteDataSource(this.items, this.options);

    dataSource.loadedItems = itemCount;

    return dataSource;
  }

}

export default InfiniteDataSource;
