import { Item } from "../Item";

export interface IFilter {
  name: string;
  field: string;
  value: string;
  predicate: (item: Item, field: string, value: string) => boolean;
  selected: boolean;

  check(item: Item): boolean;
}

export class Filter implements IFilter {
  name: string;
  field: string;
  value: string;
  predicate: (item: Item, field: string, value: string) => boolean;
  selected: boolean;

  constructor(
    name: string,
    field: string,
    value: string = null,
    predicate: (item: Item, field: string, value: string) => boolean = null,
    selected: boolean = false
  ) {
    this.name = name;
    this.field = field;
    this.value = value;
    this.selected = selected;
    this.predicate =
      predicate === undefined || predicate === null
        ? (item, field, value) => item[field] == value
        : predicate;
  }

  public check(item: Item): boolean {
    return this.predicate(item, this.field, this.value);
  }
}
