export class SideBarService {
    isOpen: boolean;

    constructor() {
        this.isOpen = true;
    }

    toggle(): void {
        this.isOpen = !this.isOpen;
    }

    getIsOpen(): boolean {
        return this.isOpen;
    }
}