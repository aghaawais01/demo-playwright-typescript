export class HeaderManager {
  private headers: Record<string, string>;

  constructor() {
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  setHeader(key: string, value: string): void {
    this.headers[key] = value;
  }

  getHeaders(): Record<string, string> {
    return { ...this.headers };
  }

  removeHeader(key: string): void {
    delete this.headers[key];
  }
}

export const globalHeaderManager = new HeaderManager();
