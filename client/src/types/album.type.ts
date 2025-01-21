import type { Track } from "./track.type";

export type Album = {
  id: number;
  title: string;
  userId: number;
  tracks: Track[];
}