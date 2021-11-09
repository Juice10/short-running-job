#!/usr/bin/env ts-node

import Capture from "./main";
import Appsignal from "@appsignal/javascript";

const NODE_ENV = process.env.NODE_ENV || 'development';
const appsignalKey = "KEYHERE";
const appsignal = new Appsignal({
  key: appsignalKey,
  // revision: process.env.APP_REVISION,
});

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// process.stdin.resume() // Make AppSignal errors show up in dashboard by never stopping process
let capture: Capture | undefined;
(async () => {
  await appsignal
    .wrap(
      async () => {
        capture = new Capture();
        await capture.go();
      },
      (span) => {
        span.setAction("RecordingInstructor");
        span.setNamespace("background");
        span.setTags({ environment: NODE_ENV });
      }
    )
    .catch(async(error) => {
      if (capture) capture.cleanup();
      // console.log(error)
      await sleep(10000)
      throw error;
    });
})();
