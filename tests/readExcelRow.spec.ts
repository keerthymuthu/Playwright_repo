import { test, expect } from '@playwright/test';
import * as path from 'path';
import { getRowByColumnValue } from '../utils/excelReader';

const EXCEL_FILE = path.resolve(__dirname, '../testdata/TestData.xlsx');

test('Read row from Excel by TestId', async () => {
  // Input value: pass via env var, falls back to the example
  const testId = process.env.TEST_ID ?? 'VPRASXP-301';

  const row = getRowByColumnValue(EXCEL_FILE, 'TestId', testId);

  expect(row, `No row found for TestId "${testId}"`).toBeDefined();

  // Prints all columns of the row separated by "|"
  console.log(Object.values(row!).join('|'));
  // -> VPRASXP-301|Smoke

  // Or access specific columns
  expect(row!['Category']).toBe('Regression');

  //print values
  console.log(row!['cityPair']);
});