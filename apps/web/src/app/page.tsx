/** biome-ignore-all lint/a11y/noSvgWithoutTitle: // biome-ignore lint: false positive */

import HomePage from "./home/page";

export default function Home() {
  return (
    <div className="relative min-h-screen text-foreground">
      <main>
        <HomePage />
      </main>
    </div>
  );
}
