import { deepStrictEqual } from 'assert';
import DateUtil from "./index.js";

{
	const format = 'dd-M-Y';
	const expected = {error: `the format ${format} is not available yet :(`}
	const date = new Date(1990, 2, 1);
	const result = DateUtil.formatDate(date, format);

	deepStrictEqual(result, expected);
}

{
	const expected = '01-12-1990';
	const format = 'dd-mm-yyyy';
	const date = new Date('1990-12-01');
	const result = DateUtil.formatDate(date, format);

	deepStrictEqual(result, expected);
}

{
	const expected = '22/06/2020';
	const format = 'dd/mm/yyyy';
	const date = new Date('2020-06-22');
	const result = DateUtil.formatDate(date, format);

	deepStrictEqual(result, expected);
}
{
	const expected = '2021-07-08';
	const format = 'yyyy-mm-dd';
	const date = new Date('2021-07-08');
	const result = DateUtil.formatDate(date, format);

	deepStrictEqual(result, expected);
}

// formatString

{
	const expected = { error: 'your text is empty'};
	const date = '';
	const result = DateUtil.formatString(date);

	deepStrictEqual(result, expected);
}

{
	const data = {
		value: '1990-april-01',
		format: 'yyyy-M-dd'
	};

	const expected = { error: `the format ${data.format} is not available yet`};
	const result = DateUtil.formatString(data.value, data.format);

	deepStrictEqual(result, expected);
}

{
	const data = {
		value: '1990-04-01',
		format: 'yyyy-mm-dd'
	};
	const expectedFormat = 'dd/M/yyyy'

	const expected = { error: `the format ${expectedFormat} is not available yet`};
	const result = DateUtil.formatString(data.value, data.format, expectedFormat);

	deepStrictEqual(result, expected);
}

{
	const data = {
		value: '1990-04-01',
		format: 'yyyy-mm-dd',
		expectedFormat: 'dd-mm-yyyy'
	};

	const expected = '01-04-1990'
	const result = DateUtil.formatString(data.value, data.format, data.expectedFormat);

	deepStrictEqual(result, expected);
}

{
	const data = {
		value: '20 21-0 7-09 ',
		format: 'yyyy-mm-dd',
		expectedFormat: 'dd/mm/yyyy'
	};

	const expected = '09/07/2021'
	const result = DateUtil.formatString(data.value, data.format, data.expectedFormat);

	deepStrictEqual(result, expected);
}
