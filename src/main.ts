export default class Capture {

  constructor() {
    // construct something
  }

  async go(): Promise<void> {
    try {
      await this.connect();
      await this.playVideo();
    } catch (error) {
      console.log("Capture.go failed", error);
      throw error;
    } finally {
      this.quit();
    }
  }

  async cleanup(): Promise<void> {
    console.log("cleaning up");
  }

  quit(): void {
    console.log("Capture.quit");
  }

  async connect() {
    try {
      console.log("connecting to browser...");
      throw new Error("connect error");

    } catch (error) {
      console.log("Capture.connect failed", error);

      await this.cleanup();
      throw error;
    }
  }

  async playVideo() {
    try {
      // throw new Error("playVideo error");
    } catch (error) {
      console.log("Capture.play Video failed", error);
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}
