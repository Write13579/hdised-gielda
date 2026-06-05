"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type WynikCompProps = {
  price: number;
  currency: string;
};

export default function WynikComp({ price, currency }: WynikCompProps) {
  const router = useRouter();

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      router.refresh();
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [router]);

  return (
    <div className="flex flex-row mb-2">
      <div>
        kurs BTC-USD irl: {price} {currency}
      </div>
    </div>
  );
}
