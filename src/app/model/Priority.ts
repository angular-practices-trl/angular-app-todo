export class Priority {

  private _id: number;
  private _title: string;
  private _color: string;

  constructor(id: number, title: string, color: string) {
    this._id = id;
    this._title = title;
    this._color = color;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }
}
