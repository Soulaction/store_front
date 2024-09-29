export type Subscriber = {
    unsubscribe: () => void
}

export class EventBus<T> {
    private listens: ((data: T) => void)[] = [];

    subscribe(listen: (data: T) => void): Subscriber {
        this.listens.push(listen);
        return {unsubscribe: this.unsubscribe.bind(this, listen)};
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
