# Wanderspeak: Journey

![CI](https://github.com/wanderspeak/journey-fs/workflows/CI/badge.svg)

This typescript library provides a wrapper around the Journey API that is able to write and read on a file system.

## Beginning a journey

```ts
JourneyIO.fs = require('fs');

const journey = JourneyFS.begin('path/to/directory');
journey.set({ name: "D'Artagnan" });
journey.post('Hello, World!');
journey.save();
```

## Restoring a journey

```ts
JourneyIO.fs = require('fs');

JourneyFS.resume('path/to/directory').then((jfs: JourneyFS) => {
  console.log(jfs.hero.name);
});
```
