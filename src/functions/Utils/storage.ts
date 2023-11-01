"use client";

export function get_item(key: string): any {
  const item = window.localStorage.getItem(key) as string;
  const response = JSON.parse(item);
  return response?.data ? response.data : null;
}

export function set_item(key: string, data: any): void {
  const item = JSON.stringify({ data }) as string;
  window.localStorage.setItem(key, item);
}
