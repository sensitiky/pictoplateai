export class ClarifaiService {
  private pat: string;
  private userID: string;
  private appID: string;
  private modelID: string;
  private modelVersionID: string;

  constructor() {
    this.pat = process.env.EXPO_PUBLIC_PAT_KEY;
    this.userID = process.env.EXPO_PUBLIC_USER_ID;
    this.appID = process.env.EXPO_PUBLIC_CLARIFAI_APP_ID;
    this.modelID = process.env.EXPO_PUBLIC_MODEL_ID;
    this.modelVersionID = process.env.EXPO_PUBLIC_MODEL_VERSION_ID;
  }

  public async analyzeImage(base64Image: string): Promise<Map<string, any>> {
    const formattedBase64 = base64Image.startsWith('data:image')
      ? base64Image
      : `data:image/jpeg;base64,${base64Image}`;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: this.userID,
        app_id: this.appID,
      },
      inputs: [
        {
          data: {
            image: {
              base64: formattedBase64.split(',')[1],
            },
          },
        },
      ],
    });

    try {
      const response = await fetch(
        `https://api.clarifai.com/v2/models/${this.modelID}/versions/${this.modelVersionID}/outputs`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Key ${this.pat}`,
            'Content-Type': 'application/json',
          },
          body: raw,
        }
      );

      if (response.ok) {
        const data: any = await response.json();
        const outputs = data.outputs;
        if (outputs && outputs.length > 0) {
          const concepts = outputs[0]['data']['concepts'];
          const topConcepts = concepts.slice(0, 4);
          return new Map([['concepts', topConcepts]]);
        }
        return new Map([['message', 'No concepts found.']]);
      } else {
        console.error(`Failed to analyze image: ${response.statusText}`);
        throw new Error('Failed to analyze image');
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
