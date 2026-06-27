// Convert AD to BS
import { anchorAD, anchorBS, monthNames, type BSDate } from "../constants/NepaliDate"
import { dateConfigMap } from "../constants/YearData"

//Look how many days a specific BS month has
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

// BS to AD 
export function bsToAd(target: BSDate): Date {
  const totalDays = daysSinceAnchor(target)
  const result = new Date(anchorAD)
  result.setDate(result.getDate() + totalDays)
  return result
}

 // Throw the millisecond time and give year, month, date
  function stripTime(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

// AD to BS
export function adToBs(adDate: Date): BSDate {
  const msPerDay = 1000 * 60 * 60 * 24 
  const diffDays = Math.round(
    (stripTime(adDate).getTime() - stripTime(anchorAD).getTime()) / msPerDay
  )//how many days apart adDate if from anchorAD

  let y = anchorBS.year
  let m = anchorBS.month
  let remaining = anchorBS.date - 1 + diffDays 
  // remaining: how many days past the start of the current month am I?"

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


export function getTodayBS(): BSDate {
  return adToBs(new Date())
}

// which wweek day 1 of a given BS month falls on
export function getMonthStartWeekday(year: number, month: number): number {
  const adDate = bsToAd({ year, month, date: 1, weekday: 0 })
  return adDate.getDay()
}

