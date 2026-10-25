import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { business, whatsappLink } from '../data/business'

export type CartItem = {
  key: string
  name: string
  price: number
  qty: number
  detail?: string
}

type AddInput = Omit<CartItem, 'qty' | 'key'> & { key?: string }

type CartContextValue = {
  items: CartItem[]
  count: number
  total: number
  open: boolean
  toast: string | null
  setOpen: (open: boolean) => void
  add: (item: AddInput) => void
  inc: (key: string) => void
  dec: (key: string) => void
  remove: (key: string) => void
  clear: () => void
  orderLink: (name?: string, note?: string) => string
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'royal-kitchen-order'

const load = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

export const rands = (n: number) => `R${n}`

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load)
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number>(undefined)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const add = useCallback((input: AddInput) => {
    const key = input.key ?? `${input.name}|${input.detail ?? ''}`
    setItems((prev) => {
      const found = prev.find((i) => i.key === key)
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
      return [...prev, { ...input, key, qty: 1 }]
    })
    setToast(`${input.name} added to your order`)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2200)
  }, [])

  const inc = useCallback((key: string) => setItems((p) => p.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))), [])
  const dec = useCallback(
    (key: string) => setItems((p) => p.flatMap((i) => (i.key !== key ? [i] : i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []))),
    [],
  )
  const remove = useCallback((key: string) => setItems((p) => p.filter((i) => i.key !== key)), [])
  const clear = useCallback(() => setItems([]), [])

  const count = items.reduce((s, i) => s + i.qty, 0)
  const total = items.reduce((s, i) => s + i.qty * i.price, 0)

  const orderLink = useCallback(
    (name?: string, note?: string) => {
      const lines = [
        `Hi ${business.name}! I'd like to place an order:`,
        '',
        ...items.map((i) => `• ${i.qty} x ${i.name}${i.detail ? ` (${i.detail})` : ''} - ${rands(i.qty * i.price)}`),
        '',
        `Total: ${rands(total)}`,
      ]
      if (name) lines.push(`Name: ${name}`)
      if (note) lines.push(`Note: ${note}`)
      lines.push('', 'Collection at 161 Madiba Street. Thank you!')
      return whatsappLink(lines.join('\n'))
    },
    [items, total],
  )

  const value = useMemo(
    () => ({ items, count, total, open, toast, setOpen, add, inc, dec, remove, clear, orderLink }),
    [items, count, total, open, toast, add, inc, dec, remove, clear, orderLink],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
