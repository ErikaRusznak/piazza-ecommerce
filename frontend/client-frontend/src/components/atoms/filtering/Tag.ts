class Tag {
    private filterName: string;
    private value: string | number;
    private type: "ONE_VALUE" | "MULTIPLE";
    constructor(filterName: string, value: string|number, type: "ONE_VALUE"|"MULTIPLE") {
        this.filterName = filterName;
        this.value = value;
        this.type = type;
    }
}

export default Tag;


