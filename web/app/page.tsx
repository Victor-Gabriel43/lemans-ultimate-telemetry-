"use client";

import { useEffect } from "react";
import { useRoomStore } from "@/state/roomStore";
import { SiteNav } from "@/components/mi/SiteNav";
import { Hero } from "@/components/mi/Hero";
import { Manifesto } from "@/components/mi/Manifesto";
import { Experiences } from "@/components/mi/Experiences";
import { Cinematic, Marquee } from "@/components/mi/Cinematic";
import { RaceRoom } from "@/components/mi/RaceRoom";
import { SiteFooter } from "@/components/mi/SiteFooter";

export default function Home() {
  // Back on Home = out of any room: clear store so a stale snapshot is never reused.
  useEffect(() => {
    useRoomStore.getState().reset();
  }, []);

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Manifesto />
        <Experiences />
        <Cinematic />
        <Marquee />
        <RaceRoom />
      </main>
      <SiteFooter />
    </>
  );
}
