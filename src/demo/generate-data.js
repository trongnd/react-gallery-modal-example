import lodash from 'lodash';

export default function generateData(numberOfItems = 250) {
  const rand = lodash.random(100, 1000);

  const items = lodash.times(numberOfItems).map(index => ({
    id: index,
    img: `https://unsplash.it/200/200?image=${index + rand}`,
  }));

  return items;
}
