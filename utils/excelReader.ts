import * as XLSX from 'xlsx';

export type ExcelRow = Record<string, string>;

/**
 * Returns the first row whose `columnName` equals `value`.
 * Returns undefined if no row matches.
 */
export function getRowByColumnValue(
  filePath: string,
  columnName: string,
  value: string,
  sheetName?: string // defaults to the first sheet
): ExcelRow | undefined {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName ?? workbook.SheetNames[0]];
  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found in ${filePath}`);
  }

  // Each row becomes an object keyed by the header row
  const rows = XLSX.utils.sheet_to_json<ExcelRow>(sheet, { defval: '', raw: false });

  return rows.find(
    (row) => String(row[columnName] ?? '').trim() === value.trim()
  );
}