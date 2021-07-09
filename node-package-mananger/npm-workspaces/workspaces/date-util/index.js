import StringUtil from "@rafalogan/string-util";

const availableFormats = {
	'dd-mm-yyyy': '$<day>-$<month>-$<year>',
	'yyyy-mm-dd': '$<year>-$<month>-$<day>',
	'dd/mm/yyyy': '$<day>/$<month>/$<year>',
}

const yyyymmdd = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g
const ddmmyyyy = /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g

const stringToDateExps = {
	'dd-mm-yyyy': ddmmyyyy,
	'yyyy-mm-dd': ddmmyyyy,
	'dd/mm/yyyy': yyyymmdd
}

export default class DateUtil {
	static formatDate(date, format) {
		if (!Object.keys(availableFormats).includes(format)) return { error: `the format ${format} is not available yet :(`}

		const exp = availableFormats[format];
		const [result] = date.toISOString().match(yyyymmdd);
		return result.replace(yyyymmdd, exp);
	}

	static formatString(date, currentFormat, expectedFormat) {
		if (StringUtil.isEmpty(date)) return { error: 'your text is empty'};
		if (!Object.keys(stringToDateExps).includes(currentFormat)) return { error: `the format ${currentFormat} is not available yet`};
		if (!Object.keys(availableFormats).includes(expectedFormat)) return { error: `the format ${expectedFormat} is not available yet`};

		const toDateExp = stringToDateExps[currentFormat];
		const dateStr = StringUtil.removeEmptySpaces(date)
			.replace(toDateExp, `$<year>-$<month>-$<day>`);

		const finalDate = new Date(dateStr);

		return this.formatDate(finalDate,expectedFormat)
	}
}
