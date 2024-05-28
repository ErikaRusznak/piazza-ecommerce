import {FilterOptionValues} from "@/components/organisms/filtering/FilteringComponent";

class Tag {
    filterName: string;
    value: FilterOptionValues;
    private type: "ONE_VALUE" | "MULTIPLE";
    constructor(filterName: string, value: FilterOptionValues, type: "ONE_VALUE"|"MULTIPLE") {
        this.filterName = filterName;
        this.value = value;
        this.type = type;
    }
}

export default Tag;


