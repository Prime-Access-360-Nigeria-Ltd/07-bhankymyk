import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function roundToTwoDecimals(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function safeSumDecimals(amounts: number[]): number {
  const totalCents = amounts.reduce((acc, curr) => {
    const val = isNaN(curr) ? 0 : curr;
    return acc + Math.round(val * 100);
  }, 0);
  return totalCents / 100;
}

export function debounce<T extends (...args: any[]) => void>(fn: T, ms: number) {
  let timer: NodeJS.Timeout | undefined;
  return function (this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}
