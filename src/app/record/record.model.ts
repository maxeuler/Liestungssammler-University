export class Record {
	id: number;
	moduleNr: string;
	moduleName: string;
	crp: number;
	mark: number;
	isHalfWeighted: boolean;
	isSummerTerm: boolean;
	year: number;

	constructor(
		id: number,
		moduleNr: string,
		moduleName: string,
		crp: number,
		mark: number,
		isHalfWeighted: boolean,
		isSummerTerm: boolean,
		year: number
	) {
		this.id = id;
		this.moduleNr = moduleNr;
		this.moduleName = moduleName;
		this.crp = crp;
		this.mark = mark;
		this.isHalfWeighted = isHalfWeighted;
		this.isSummerTerm = isSummerTerm;
		this.year = year;
	}
}
