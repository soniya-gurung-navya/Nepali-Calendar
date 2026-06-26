// Convert AD to BS core math
import { anchorAD, anchorBS, type BSDate } from "../constants/NepaliDate"
import { dateConfigMap } from "../constants/YearData"

const monthNames = [
  "Baisakh", "Jestha", "Asar", "Shrawan", "Bhadra", "Aswin",
  "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra",
] as const
function getMonthDays(year: number, month: number): number {
  const yearData = dateConfigMap[String(year)]
  if (!yearData) {
    throw new Error(`Year ${year} BS is out of supported range`)
  }
  return yearData[monthNames[month - 1]]
}

// Counts total days between anchorBS and the target BS date
function daysSinceAnchor(target: BSDate): number {
  let totalDays = 0
  let y = anchorBS.year
  let m = anchorBS.month

  while (y < target.year || (y === target.year && m < target.month)) {
    totalDays += getMonthDays(y, m)
    m++
    if (m > 12) { m = 1; y++ }
  }

  totalDays += target.date - anchorBS.date
  return totalDays
}

// BS → AD (kept in case you ever need it internally, e.g. debugging)
export function bsToAd(target: BSDate): Date {
  const totalDays = daysSinceAnchor(target)
  const result = new Date(anchorAD)
  result.setDate(result.getDate() + totalDays)
  return result
}

// AD → BS (this is what your calendar actually needs)
export function adToBs(adDate: Date): BSDate {
  const msPerDay = 1000 * 60 * 60 * 24
  const diffDays = Math.round(
    (stripTime(adDate).getTime() - stripTime(anchorAD).getTime()) / msPerDay
  )

  let y = anchorBS.year
  let m = anchorBS.month
  let remaining = anchorBS.date - 1 + diffDays // days past month-start, can be negative

  // walk forward
  while (remaining >= getMonthDays(y, m)) {
    remaining -= getMonthDays(y, m)
    m++
    if (m > 12) { m = 1; y++ }
  }
  // walk backward (if adDate is before anchor)
  while (remaining < 0) {
    m--
    if (m < 1) { m = 12; y-- }
    remaining += getMonthDays(y, m)
  }

  const date = remaining + 1
  const weekday = adDate.getDay()
  return { year: y, month: m, date, weekday }
}

// Returns today's date as a BSDate — what your calendar uses to highlight "today"
export function getTodayBS(): BSDate {
  return adToBs(new Date())
}

// Returns weekday (0–6) of the 1st day of a given BS month — for grid alignment
export function getMonthStartWeekday(year: number, month: number): number {
  const adDate = bsToAd({ year, month, date: 1, weekday: 0 })
  return adDate.getDay()

}

function stripTime(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

