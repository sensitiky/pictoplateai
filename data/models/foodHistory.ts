class HistoryItem {
  id: number;
  imagePath: string;
  dateTime = new Date();
  nutritionalInfo = new Map<string, number>();

  constructor(
    id: number,
    imagePath: string,
    dateTime: Date,
    nutritionalInfo: Map<string, number>
  ) {
    this.id = id;
    this.imagePath = imagePath;
    dateTime = dateTime;
    nutritionalInfo = nutritionalInfo;
  }
}
