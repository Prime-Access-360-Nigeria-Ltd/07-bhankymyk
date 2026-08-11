export interface VoucherAllocation {
  zoneId: string;
  zoneName: string;
  amount: number;
  note?: string;
}

export type WalletType = "FIAT" | "CRYPTO" | "BONUS";
export type VoucherStatus = "PENDING" | "APPROVED" | "REJECTED" | "ON_HOLD";

export interface Voucher {
  id: string;
  voucherNumber: string;
  sourceAccount: string;
  walletType: WalletType;
  totalAmount: number;
  currency: string;
  fee: number;
  status: VoucherStatus;
  createdAt: string;
  allocations: VoucherAllocation[];
}

export interface BeneficiaryZone {
  id: string;
  name: string;
  region: string;
}

export const BENEFICIARY_ZONES: BeneficiaryZone[] = [
  { id: "zone-lag-01", name: "Lagos Island Hub (Zone A)", region: "South West" },
  { id: "zone-lag-02", name: "Ikeja Tech Corridor (Zone B)", region: "South West" },
  { id: "zone-abj-01", name: "Abuja Central District (Zone C)", region: "North Central" },
  { id: "zone-ph-01", name: "Port Harcourt Energy Hub (Zone D)", region: "South South" },
  { id: "zone-kan-01", name: "Kano Commercial District (Zone E)", region: "North West" },
  { id: "zone-enu-01", name: "Enugu Innovation Zone (Zone F)", region: "South East" },
];

export const SOURCE_ACCOUNTS = [
  { id: "acc-corp-01", name: "Prime Access Treasury (USD - 4409)", balanceFiat: 450000.0, balanceCrypto: 125000.0, balanceBonus: 15000.0 },
  { id: "acc-ops-02", name: "Regional Settlement Account (USD - 8812)", balanceFiat: 180000.0, balanceCrypto: 45000.0, balanceBonus: 8000.0 },
  { id: "acc-liq-03", name: "Liquidity Provider Pool (USD - 1045)", balanceFiat: 920000.0, balanceCrypto: 600000.0, balanceBonus: 50000.0 },
];

let MOCK_VOUCHERS: Voucher[] = [
  {
    id: "vch-1001",
    voucherNumber: "PA-VCH-2026-001",
    sourceAccount: "Prime Access Treasury (USD - 4409)",
    walletType: "FIAT",
    totalAmount: 25000.0,
    currency: "USD",
    fee: 0,
    status: "PENDING",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    allocations: [
      { zoneId: "zone-lag-01", zoneName: "Lagos Island Hub (Zone A)", amount: 15000.0, note: "Vendor disbursement" },
      { zoneId: "zone-abj-01", zoneName: "Abuja Central District (Zone C)", amount: 10000.0, note: "Operations funding" },
    ],
  },
  {
    id: "vch-1002",
    voucherNumber: "PA-VCH-2026-002",
    sourceAccount: "Liquidity Provider Pool (USD - 1045)",
    walletType: "CRYPTO",
    totalAmount: 48500.5,
    currency: "USD",
    fee: 727.51,
    status: "APPROVED",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    allocations: [
      { zoneId: "zone-lag-02", zoneName: "Ikeja Tech Corridor (Zone B)", amount: 28500.5, note: "Node rewards" },
      { zoneId: "zone-ph-01", zoneName: "Port Harcourt Energy Hub (Zone D)", amount: 20000.0, note: "Infrastructure grant" },
    ],
  },
  {
    id: "vch-1003",
    voucherNumber: "PA-VCH-2026-003",
    sourceAccount: "Regional Settlement Account (USD - 8812)",
    walletType: "BONUS",
    totalAmount: 5000.0,
    currency: "USD",
    fee: 0,
    status: "PENDING",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    allocations: [
      { zoneId: "zone-kan-01", zoneName: "Kano Commercial District (Zone E)", amount: 3000.0, note: "Regional subsidy" },
      { zoneId: "zone-enu-01", zoneName: "Enugu Innovation Zone (Zone F)", amount: 2000.0, note: "Growth incentive" },
    ],
  },
  {
    id: "vch-1004",
    voucherNumber: "PA-VCH-2026-004",
    sourceAccount: "Prime Access Treasury (USD - 4409)",
    walletType: "FIAT",
    totalAmount: 12000.75,
    currency: "USD",
    fee: 0,
    status: "ON_HOLD",
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    allocations: [
      { zoneId: "zone-lag-01", zoneName: "Lagos Island Hub (Zone A)", amount: 12000.75, note: "Audit pending" },
    ],
  },
  {
    id: "vch-1005",
    voucherNumber: "PA-VCH-2026-005",
    sourceAccount: "Liquidity Provider Pool (USD - 1045)",
    walletType: "CRYPTO",
    totalAmount: 85000.0,
    currency: "USD",
    fee: 1275.0,
    status: "REJECTED",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    allocations: [
      { zoneId: "zone-abj-01", zoneName: "Abuja Central District (Zone C)", amount: 85000.0, note: "Signer verification failed" },
    ],
  },
];

export interface FetchVouchersParams {
  q?: string;
  walletType?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface FetchVouchersResponse {
  vouchers: Voucher[];
  total: number;
  page: number;
  totalPages: number;
  stats: {
    totalVolume: number;
    pendingCount: number;
    approvedCount: number;
    rejectedCount: number;
    onHoldCount: number;
  };
}

export async function fetchVouchersApi(
  params: FetchVouchersParams = {},
  signal?: AbortSignal
): Promise<FetchVouchersResponse> {
  const delayMs = 300 + Math.random() * 200;
  await new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, delayMs);
    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    }
  });

  let filtered = [...MOCK_VOUCHERS];

  if (params.walletType && params.walletType !== "ALL") {
    filtered = filtered.filter((v) => v.walletType === params.walletType);
  }

  if (params.status && params.status !== "ALL") {
    filtered = filtered.filter((v) => v.status === params.status);
  }

  if (params.q && params.q.trim()) {
    const search = params.q.toLowerCase().trim();
    filtered = filtered.filter(
      (v) =>
        v.voucherNumber.toLowerCase().includes(search) ||
        v.sourceAccount.toLowerCase().includes(search) ||
        v.allocations.some((a) => a.zoneName.toLowerCase().includes(search) || a.note?.toLowerCase().includes(search))
    );
  }

  const totalVolume = MOCK_VOUCHERS.reduce((sum, v) => sum + v.totalAmount, 0);
  const pendingCount = MOCK_VOUCHERS.filter((v) => v.status === "PENDING").length;
  const approvedCount = MOCK_VOUCHERS.filter((v) => v.status === "APPROVED").length;
  const rejectedCount = MOCK_VOUCHERS.filter((v) => v.status === "REJECTED").length;
  const onHoldCount = MOCK_VOUCHERS.filter((v) => v.status === "ON_HOLD").length;

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  return {
    vouchers: paginated,
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit) || 1,
    stats: {
      totalVolume,
      pendingCount,
      approvedCount,
      rejectedCount,
      onHoldCount,
    },
  };
}

export async function updateVoucherStatusApi(
  id: string,
  newStatus: VoucherStatus,
  signal?: AbortSignal
): Promise<{ success: boolean; id: string; status: VoucherStatus }> {
  const latency = 600 + Math.random() * 800;
  await new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, latency);
    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    }
  });

  if (Math.random() < 0.25) {
    const isConflict = Math.random() < 0.5;
    if (isConflict) {
      throw new Error(`[409 Conflict] Voucher ${id} was modified by another user.`);
    } else {
      throw new Error(`[500 Server Error] Settlement transaction failed.`);
    }
  }

  const voucherIndex = MOCK_VOUCHERS.findIndex((v) => v.id === id);
  if (voucherIndex === -1) {
    throw new Error(`Voucher ${id} not found.`);
  }

  MOCK_VOUCHERS[voucherIndex] = {
    ...MOCK_VOUCHERS[voucherIndex],
    status: newStatus,
  };

  return { success: true, id, status: newStatus };
}

export async function createVoucherApi(
  payload: {
    sourceAccount: string;
    walletType: WalletType;
    totalAmount: number;
    currency?: string;
    allocations: VoucherAllocation[];
  },
  signal?: AbortSignal
): Promise<Voucher> {
  const latency = 500 + Math.random() * 400;
  await new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, latency);
    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    }
  });

  const fee = payload.walletType === "CRYPTO" ? Number((payload.totalAmount * 0.015).toFixed(2)) : 0;
  const newVoucher: Voucher = {
    id: `vch-${Date.now()}`,
    voucherNumber: `PA-VCH-2026-${String(MOCK_VOUCHERS.length + 1).padStart(3, "0")}`,
    sourceAccount: payload.sourceAccount,
    walletType: payload.walletType,
    totalAmount: payload.totalAmount,
    currency: payload.currency || "USD",
    fee,
    status: "PENDING",
    createdAt: new Date().toISOString(),
    allocations: payload.allocations,
  };

  MOCK_VOUCHERS.unshift(newVoucher);
  return newVoucher;
}

export async function fetchWalletBalanceApi(
  sourceAccountName: string,
  walletType: WalletType,
  signal?: AbortSignal
): Promise<{ account: string; walletType: WalletType; availableBalance: number }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const acc = SOURCE_ACCOUNTS.find((a) => a.name === sourceAccountName) || SOURCE_ACCOUNTS[0];

  let balance = acc.balanceFiat;
  if (walletType === "CRYPTO") balance = acc.balanceCrypto;
  if (walletType === "BONUS") balance = acc.balanceBonus;

  return {
    account: acc.name,
    walletType,
    availableBalance: balance,
  };
}
