export class Stats {
	count: number;
	countHalfWeighted: number;
	sumCrp: number;
	missingCrp: number;
	averageGrade: number;

	constructor(
		count: number,
		countHalfWeighted: number,
		sumCrp: number,
		missingCrp: number,
		averageGrade: number
	) {
		this.count = count;
		this.countHalfWeighted = countHalfWeighted;
		this.sumCrp = sumCrp;
		this.missingCrp = missingCrp;
		this.averageGrade = averageGrade;
	}
}
