import { challengesType } from "@/types/dailyChallenge";
import { EnhancedUnitData } from "@/types/types";
import Dexie, { Table } from "dexie";

export const db = new Dexie("Falingo.ir");

db.version(1).stores({
  units: "unit_id, section",
  games: "game_id",
  userProperties: "id++",
  dailyQuest: "key",
});

export const unitsTable: Table<EnhancedUnitData> = db.table("units");
export const games: Table = db.table("games");
export const userProperties: Table = db.table("userProperties");
export const dailyQuest: Table<challengesType> = db.table("dailyQuest");
