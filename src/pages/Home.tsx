import Features from 'components/features/Features';
import Github from 'components/github/Github';
import MainBanner from 'components/MainBanner';
import Technology from 'components/technology/Technology';
import React from 'react';

export default function Home() {
  return (
    <div>
      <MainBanner />
      <Technology />
      <Features />
      <Github />
    </div>
  );
}
