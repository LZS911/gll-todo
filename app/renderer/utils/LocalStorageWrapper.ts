class LocalStorageWrapper {
  public get = (key: string) => {
    return !!localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key) as string)
      : null;
  };

  public set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public getOrDefault(key: string, defaultValue: string): string {
    if (localStorage.getItem(key) === null) {
      return defaultValue;
    }
    return JSON.parse(localStorage.getItem(key) as string);
  }
}

export default new LocalStorageWrapper();
