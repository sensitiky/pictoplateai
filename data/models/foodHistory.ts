export class HistoryItem {
  id: string;
  dateTime: string;
  nutritionalInfo?: Record<string, string>;
  imagePath?: string;

  constructor(
    id: string,
    dateTime: Date,
    nutritionalInfo: Record<string, string>,
    imagePath?: string
  ) {
    this.id = id;
    this.dateTime = dateTime.toISOString();
    this.nutritionalInfo = nutritionalInfo;
    this.imagePath = imagePath;
  }
}
