import { IssueData, RefinementCtx, ZodIssueCode } from "zod"
import { pluralize } from "@/shared/utils"

export function isRobustPassword(
  password: string,
  ctx: RefinementCtx,
): boolean {
  let robust = true

  const {
    minLength,
    maxLength,
    minLowercase,
    minUppercase,
    minNumber,
    minSymbol,
  } = PASSWORD_CONSTRAINT

  const baseCustomIssue: IssueData = {
    code: ZodIssueCode.custom,
  }

  if (password.length < minLength || password.length > maxLength) {
    robust = false
    ctx.addIssue({
      ...baseCustomIssue,
      // message: `Between ${minLength.toString()} and ${maxLength.toString()} ${pluralize("character", minLength)} long`,
      message: PASSWORD_REQUIREMENT.length,
    })
  }

  if (countlowerCase(password) < minLowercase) {
    robust = false
    ctx.addIssue({
      ...baseCustomIssue,
      // message: `At least ${minLowercase.toString()} lowercase ${pluralize("letter", minLowercase)}`,
      message: PASSWORD_REQUIREMENT.lowercase,
    })
  }

  if (countUppercase(password) < minUppercase) {
    robust = false
    ctx.addIssue({
      ...baseCustomIssue,
      // message: `At least ${minUppercase.toString()} uppercase ${pluralize("letter", minUppercase)}`,
      message: PASSWORD_REQUIREMENT.uppercase,
    })
  }

  if (countNumber(password) < minNumber) {
    robust = false
    ctx.addIssue({
      ...baseCustomIssue,
      message: PASSWORD_REQUIREMENT.number,
    })
  }

  if (countSymbol(password) < minSymbol) {
    robust = false
    ctx.addIssue({
      ...baseCustomIssue,
      // message: `At least ${minSymbol.toString()} ${pluralize("symbol", minNumber)}`,
      message: PASSWORD_REQUIREMENT.symbol,
    })
  }

  return robust
}

const PASSWORD_CONSTRAINT = {
  minLength: 12,
  maxLength: 40,
  minLowercase: 1,
  minUppercase: 1,
  minNumber: 1,
  minSymbol: 1,
}

export const PASSWORD_REQUIREMENT = {
  length: `Between ${PASSWORD_CONSTRAINT.minLength.toString()} and ${PASSWORD_CONSTRAINT.maxLength.toString()} ${pluralize("character", PASSWORD_CONSTRAINT.minLength)} long`,
  lowercase: `At least ${PASSWORD_CONSTRAINT.minLowercase.toString()} lowercase ${pluralize("letter", PASSWORD_CONSTRAINT.minLowercase)}`,
  uppercase: `At least ${PASSWORD_CONSTRAINT.minUppercase.toString()} uppercase ${pluralize("letter", PASSWORD_CONSTRAINT.minUppercase)}`,
  number: `At least ${PASSWORD_CONSTRAINT.minNumber.toString()} ${pluralize("number", PASSWORD_CONSTRAINT.minNumber)}`,
  symbol: `At least ${PASSWORD_CONSTRAINT.minSymbol.toString()} ${pluralize("symbol", PASSWORD_CONSTRAINT.minNumber)}`,
}

const ALLOWED_SYMBOLS = [
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  "|",
  "\\",
  ":",
  ";",
  '"',
  "'",
  "<",
  ",",
  ">",
  ".",
  "?",
  "/",
]

function toRegExp(symbols: string[]): RegExp {
  const escapeSymbols: string[] = ["-", "]", "/", "\\"]
  const escapedString = symbols
    .map((symbol) => (escapeSymbols.includes(symbol) ? "\\" + symbol : symbol))
    .join("")
  return new RegExp(`[${escapedString}]`, "g")
}

function countUppercase(password: string): number {
  return (password.match(/[A-Z]/g) ?? []).length
}

function countlowerCase(password: string): number {
  return (password.match(/[a-z]/g) ?? []).length
}

function countNumber(password: string): number {
  return (password.match(/[0-9]/g) ?? []).length
}

function countSymbol(password: string): number {
  const pattern = toRegExp(ALLOWED_SYMBOLS)
  return (password.match(pattern) ?? []).length
}
