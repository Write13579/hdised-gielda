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
    <div>
      <div>BTC-USD: </div>
      <div>
        {price} {currency}
      </div>
    </div>
  );
}
