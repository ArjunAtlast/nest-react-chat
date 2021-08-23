export class ListMap<K,I> extends Map<K, I[]> {
  push(key: K, ...items: I[]) {
    const list = this.get(key) ?? [];
    return this.set(key, list.concat(items));
  }

  read(key: K, index: number) {
    return this.get(key)[index];
  }

  readFrom(key: K, start: number, end?: number) {
    const list = this.get(key);
    end = end ?? list.length;
    return list.slice(start, end);
  }
}