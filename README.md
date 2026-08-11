# Prime Access 360 - Frontend Engineering Assessment

Welcome to the Prime Access 360 frontend engineering challenge.

In this assessment, you will build the voucher management interface for our accounting dashboard using **React Router v7** and **Tailwind CSS**.

---

## Assessment Instructions

- **Time Limit:** The total assessment duration is **4 hours** from when you receive access.
- **Original Work & Integrity:** You are expected to write your own code. The use of AI code generation tools or related assistants will be detected and will result in automatic disqualification.
- **Dependencies:** Work with the dependencies already provided in `package.json`. Do not add external UI component libraries (e.g. MUI, Chakra, AntD).
- **TypeScript & Build:** Your solution must pass `pnpm typecheck` and `pnpm build` with zero TypeScript errors. Avoid using `any` types.
- **Git Commits:** Make regular, meaningful git commits as you work to demonstrate your implementation process. Ensure all final changes are committed and pushed before the 4-hour window closes.

---

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Start the local dev server:
   ```bash
   pnpm dev
   ```
3. Run TypeScript validation:
   ```bash
   pnpm typecheck
   ```
4. Test production build:
   ```bash
   pnpm build
   ```

---

## Tasks to Implement

You will build the accounting voucher management system across two views:

### 1. Voucher Ledger (`app/routes/accounting/vouchers.tsx`)

Build the vouchers table and filtering system:

- **Metrics Cards**: Display total disbursement volume, count of pending vouchers, approved vouchers, and held vouchers using data from the loader.
- **Search & Filter Bar**:
  - Search input with a 300ms debounce (search by voucher number, account name, or beneficiary zone).
  - Wallet type selector (`ALL`, `FIAT`, `CRYPTO`, `BONUS`).
  - Status dropdown (`ALL`, `PENDING`, `APPROVED`, `REJECTED`, `ON_HOLD`).
  - Keep all filter states synchronized with URL search parameters.
- **Vouchers Table**:
  - Display voucher records with date, source account, wallet type badge, amount, fee, and status.
  - Row actions: **Approve**, **Hold**, and **Reject**.
  - Use optimistic UI updates via `useFetcher` so the row status updates immediately on action click.
  - Handle mock API failures (the mock endpoint randomly returns errors to test failure handling): if a request fails, revert that row's status and show an error notification (`toast.error`).
  - Use `shouldRevalidate` to prevent the entire table from refetching when updating an individual row.

---

### 2. Create Voucher Modal (`app/routes/accounting/vouchers_new.tsx`)

Build a multi-step modal form to create and allocate split vouchers:

- **Step 1: Account & Amount**
  - Source account selection (use `SOURCE_ACCOUNTS` from `mockApi.ts`).
  - Wallet type selection (`FIAT`, `CRYPTO`, `BONUS`).
  - Voucher total amount. Bonus vouchers cannot exceed $50,000.
- **Step 2: Beneficiary Allocations**
  - Dynamically add or remove allocation rows (Zone, Amount, Note).
  - Prevent selecting the same beneficiary zone multiple times.
  - Validate that the sum of all allocation amounts equals the total voucher amount.
- **Step 3: Review & Submit**
  - Show summary of payer details, allocations, and fee (1.5% for Crypto, 0% for Fiat).
  - Submit the form using `clientAction` and redirect back to `/accounting/vouchers` on success.

---

## Available Files & Utilities

- `app/lib/mockApi.ts`: Mock API methods (`fetchVouchersApi`, `updateVoucherStatusApi`, `createVoucherApi`) and mock datasets (`BENEFICIARY_ZONES`, `SOURCE_ACCOUNTS`).
- `app/lib/schemas.ts`: Zod schema definitions for form validation.
- `app/lib/utils.ts`: Helper utilities (`formatCurrency`, `safeSumDecimals`, `cn`).
- `app/components/ui/`: Reusable UI components (Button, Input, Select, Badge, Table, Modal).

---

## Evaluation Criteria

- **UI & Layout Quality:** Visual hierarchy, proper spacing, alignment, and responsiveness.
- **React Router v7 Data Flow:** Proper usage of `clientLoader`, `clientAction`, `useFetcher`, and URL search params rather than `useEffect` for data fetching.
- **Form Handling & State:** Dynamic array fields, clean validation feedback, and precision math calculations.
- **Error Handling & Optimistic State:** Graceful handling of network latency, isolated error rollback, and user feedback.
