type subscriptionType = {
	[key: string]: Set<Function>;
}

const subscriptions: subscriptionType = {};

export const subscribe = (eventName: string, callback: Function) => {
	if (!subscriptions[eventName]) {
		subscriptions[eventName] = new Set();
	}

	const callbacks: Set<Function> = subscriptions[eventName];
	callbacks.add(callback);

	return () => {
		callbacks.delete(callback);

		if (callbacks.size === 0) {
			delete subscriptions[eventName];
		}
	};
};

export const unsubscribe = (eventName: string, callback: Function) => {
	const callbacks: Set<Function> = subscriptions[eventName];
	callbacks.delete(callback);

	if (callbacks.size === 0) {
		delete subscriptions[eventName];
	}

};

export const broadcast = (eventName: string, ...args: any) => {
	if (subscriptions[eventName]) {
		const callbacks: Set<Function> = subscriptions[eventName];

		callbacks.forEach(callback => callback(...args));
	}
};