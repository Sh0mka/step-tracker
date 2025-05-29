class StepCounter {
  private steps: number = 0;
  private lastAcceleration: number[] = [0, 0, 0];
  private threshold: number = 10; // Порог для определения шага
  private isWalking: boolean = false;
  private stepCount: number = 0;
  private lastStepTime: number = 0;
  private minStepInterval: number = 300; // Минимальный интервал между шагами (мс)
  private onStepCallback: ((steps: number) => void) | null = null;

  constructor() {
    this.init();
  }

  private init() {
    if ("DeviceMotionEvent" in window) {
      window.addEventListener("devicemotion", this.handleMotion.bind(this));
    } else {
      console.log("Акселерометр не поддерживается на этом устройстве");
    }
  }

  private handleMotion(event: DeviceMotionEvent) {
    if (!event.accelerationIncludingGravity) return;

    const { x, y, z } = event.accelerationIncludingGravity;
    if (x === null || y === null || z === null) return;

    const acceleration = Math.sqrt(x * x + y * y + z * z);
    const currentTime = Date.now();

    // Определяем шаг на основе изменения ускорения
    if (this.isWalking) {
      if (acceleration < this.threshold) {
        this.isWalking = false;
      }
    } else {
      if (
        acceleration > this.threshold &&
        currentTime - this.lastStepTime > this.minStepInterval
      ) {
        this.stepCount++;
        this.lastStepTime = currentTime;
        this.isWalking = true;
        this.notifyStep();
      }
    }

    this.lastAcceleration = [x, y, z];
  }

  private notifyStep() {
    if (this.onStepCallback) {
      this.onStepCallback(this.stepCount);
    }
  }

  public onStep(callback: (steps: number) => void) {
    this.onStepCallback = callback;
  }

  public getSteps(): number {
    return this.stepCount;
  }

  public resetSteps() {
    this.stepCount = 0;
    if (this.onStepCallback) {
      this.onStepCallback(0);
    }
  }

  public destroy() {
    window.removeEventListener("devicemotion", this.handleMotion.bind(this));
  }
}

export default StepCounter;
