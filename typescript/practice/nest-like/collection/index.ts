class Collection<T = any> {
  private constructor() {}

  static collection = new Collection()
  private containerMap = new Map<string | symbol, any>()

  public set(id: string | symbol, value: T): void {
    this.containerMap.set(id, value)
  }

  public get(id: string | symbol): T {
    return this.containerMap.get(id)
  }

  public has(id: string | symbol): boolean {
    return this.containerMap.has(id)
  }
}

export const collectionInstance = Collection.collection
