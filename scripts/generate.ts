import { JourneyFS, JourneyIO } from '../src';
import os = require('os');

// tslint:disable no-var-requires
JourneyIO.fs = require('fs');

// Define a function to get the directory name
const dir = (id: any) => `${os.homedir()}/.wanderspeak/test/journey-fs/${id}`;

// Start the journey and set some data
const jfs = JourneyFS.begin(dir);
jfs.set({
  name: 'Jane Doe',
  description: 'Just an anonymous person'
});
jfs.post('Hello, World!');

// Save the profile
jfs.save().then(() => {
  JourneyFS.resume(jfs.directory).then((jfs2: JourneyFS) => {
    // tslint:disable no-console
    console.log(jfs2.hero.name);
  });
});
