export class OpenFoodService {
  public async getNutritionalInfo(
    foodName: string
  ): Promise<Record<string, string> | null> {
    const searchUrl = 'https://world.openfoodfacts.org/cgi/search.pl';
    const response = await fetch(
      `${searchUrl}?search_terms=${encodeURIComponent(
        foodName
      )}&search_simple=1&action=process&json=1`
    );

    if (response.ok) {
      const data = await response.json();
      if (data['products'] != null && data['products'].length > 0) {
        const product = data['products'][0];
        const nutriments = product['nutriments'];

        const calories: number = nutriments['energy-kcal'] ?? 0.0;
        const protein: number = nutriments['proteins_100g'] ?? 0.0;
        const fat: number = nutriments['fat_100g'] ?? 0.0;
        const carbohydrates: number = nutriments['carbohydrates_100g'] ?? 0.0;

        return {
          calories: `${calories.toString()} kcal`,
          protein: `${protein.toString()} gr`,
          fat: `${fat.toString()} gr`,
          carbohydrates: `${carbohydrates.toString()} gr`,
        };
      } else {
        console.log('Food not found on Open Food Facts.');
        return null;
      }
    } else {
      console.log(`Food not recognized: ${response.body}`);
      return null;
    }
  }
}
