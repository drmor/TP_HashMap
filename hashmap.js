class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }
  set(key, value) {
    const currentLoad = this.size / this.capacity;
    const index = this.hash(key);
    const obj = { key: key, value: value };
    // resize
    if (currentLoad > this.loadFactor) {
      let oldBuckets = this.buckets;
      this.capacity = this.capacity * 2;
      const newBuckets = new Array(this.capacity).fill(null);
      for (let i = 0; i < oldBuckets.length; i++) {
        if (oldBuckets[i]) {
          for (let j = 0; j < oldBuckets[i].length; j++) {
            const newIndex = this.hash(oldBuckets[i][j].key) % this.capacity;
            if (!newBuckets[newIndex]) {
              newBuckets[newIndex] = [];
            }
            newBuckets[newIndex].push(oldBuckets[i][j]);
          }
        }
      }
      this.buckets = newBuckets;
    }
    // set()
    if (!this.buckets[index]) {
      this.buckets[index] = [obj];
      this.size++;
      return;
    } else {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i].key === key) {
          this.buckets[index][i].value = value;
          return;
        }
      }
      this.size++;
      this.buckets[index].push(obj);
      return;
    }
  }
}

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('lion2', 'golden');
test.set('lion3', 'golden');
