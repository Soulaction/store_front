export type Subscriber = () => void;

export class EventBus<T> {
    private listens: ((data: T) => void)[] = [];

    subscribe(listen: (data: T) => void): Subscriber {
        this.listens.push(listen);
        return this.unsubscribe.bind(this);
    }

    publish(data: T): void {
        this.listens.forEach(func => func(data));
    }

    unsubscribe(listen: (data: T) => void): void {
        const position: number = this.listens.findIndex((ls) => ls === listen);
        if (~position) {
            this.listens.splice(position, 1);
        }
    }
}
