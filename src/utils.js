import _slugify from 'slugify';

export const slugify = (str) => {
  return _slugify(str, {
    replacement: '-',
    lower: true,
    strict: true,
  });
};

export const dateDisplayFormat = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = this.getLength();
  }

  getLength() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize() {
    const { length } = this;
    this.x /= length;
    this.y /= length;
  }
}
