import { useEffect, useState } from 'react'
import { formatTime, hours } from '../data/business'

const SA_OFFSET_MINUTES = 120

/** Current day/minute in South Africa (SAST, UTC+2, no daylight saving). */
export function saNow(date = new Date()) {
  const sa = new Date(date.getTime() + (date.getTimezoneOffset() + SA_OFFSET_MINUTES) * 60_000)
  return { day: sa.getDay(), minutes: sa.getHours() * 60 + sa.getMinutes() }
}

function compute() {
  const { day, minutes } = saNow()
  const today = hours[day]
  const isOpen = minutes >= today.open && minutes < today.close

  if (isOpen) {
    const closingSoon = today.close - minutes <= 45
    return { isOpen, closingSoon, today: day, label: `Open now · Closes ${formatTime(today.close)}` }
  }
  if (minutes < today.open) {
    return { isOpen, closingSoon: false, today: day, label: `Closed · Opens ${formatTime(today.open)} today` }
  }
  const next = hours[(day + 1) % 7]
  return { isOpen, closingSoon: false, today: day, label: `Closed · Opens ${formatTime(next.open)} ${next.short}` }
}

export function useOpenStatus() {
  const [status, setStatus] = useState(compute)
  useEffect(() => {
    const id = window.setInterval(() => setStatus(compute()), 30_000)
    return () => window.clearInterval(id)
  }, [])
  return status
}
