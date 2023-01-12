import { useEffect } from "react";
import posthog from 'posthog-js';
import * as amplitude from '@amplitude/analytics-browser';
import * as fullstory from '@fullstory/browser';
import { Button } from "ui";

function trackButtonClick() {
  console.log('hello world button clicked!')
  // test analytics track calls here

  // explicitly send event to posthog
  posthog.capture('html button click', { foo: 'bar' })
  // https://app.posthog.com/insights/etqXuFsp <---- see event in posthog

  // explicitly send event to amplitude
  amplitude.track('html button click', { foo: 'bar' });
  // https://analytics.amplitude.com/test-org-josh-c/chart/new/vojv82n <--- see event in amplitude

  // no fullstory track because that's not in it's wheelhose
}

export default function Web() {
  useEffect(() => {
    // initialize the analytics suite here

    // init posthog
    posthog.init('phc_uAJR8mSpXETE3BIA7bOqdxarru4i2iWwWIUiBT05tpJ', { api_host: 'https://app.posthog.com' })
    
    // init amplitude
    amplitude.init('20d1b129b8de212c4d50fda9f0a0a407');

    // init fullstory
    fullstory.init({orgId: 'o-1GKF1Y-na1'})
  }, [])
  return (
    <div>
      <h1>Web</h1>
      {/* ui lib button */}
      <Button />
      {/* html button */}
      <div style={{marginBottom: '12px'}}/>
      <button onClick={trackButtonClick}>hello world</button>
    </div>
  );
}

// SSR for fun
export function getServerSideProps() {
  return {props: {}}
}