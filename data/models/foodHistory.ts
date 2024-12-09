export class HistoryItem {
  id: number;
  dateTime: Date;
  nutritionalInfo?: Record<string, string>;
  imagePath?: string | undefined;

  constructor(
    id: number,
    dateTime: Date,
    nutritionalInfo: Record<string, string>,
    imagePath?: string
  ) {
    this.id = id;
    this.dateTime = dateTime;
    this.nutritionalInfo = nutritionalInfo;
    this.imagePath = imagePath;
  }
}
