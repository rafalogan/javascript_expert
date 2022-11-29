# Observable Pattern

**Important** that [update] is responsibility to management yours errors/exceptions  
One should not have await in notify because the responsibility of notify is only to issue an event  
Only notify all
```js
export default class Marketing {
	update() {
		console.log(`[${id}]: [marketing] will pack the user's order to [${userName}]`);
	}
}
```

Just will go an event emitter to shipment
