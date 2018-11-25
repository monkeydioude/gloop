export class CouldNotLoad {
    constructor(public msg: string) {}
    error(): string {
        return "Could not Load: " + this.msg;
    }
}