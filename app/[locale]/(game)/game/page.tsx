"use client";

import { games, userProperties } from "@/app/db/db";
import { useEffect, useState, useTransition } from "react";
import { TransformedFlashcardType } from "@/types/game/flashcardType";
import { useRouter } from "next/navigation";
import { question } from "@/types/game/RepetitiveGameTyping";
import { CCOGameType } from "@/types/game/CCOGameType";
import _ from "lodash";
import { ICTFGameType } from "@/types/game/ICTFGameType";
import Image from "next/image";
import Icon from "@/app/components/base/Icon";
import ProgressBar from "@/app/components/base/ProgressBar";
import { JLGameType } from "@/types/game/JLGameType";
import { SCGameType } from "@/types/game/SCGameType";
import { CCWGameType } from "@/types/game/CCWGameType";
import { SBGameType } from "@/types/game/SBGameType";
import { FIBGameType } from "@/types/game/FIBGameType";
import { MCGameType } from "@/types/game/MCGameType";
import GameOver from "../components/GameOver";
import { ReqLostHeart } from "@/app/hooks/ReqLostHeart";
import { setLostHeart } from "./hook/updateLostHeart";
import dynamic from "next/dynamic";

const Game_Flash_Card = dynamic<{ cards: TransformedFlashcardType[] }>(
  () => import("../components/Game_Flash_Card"),
  {
    loading: () => (
      <div className="w-full h-full mx-auto bg-disable/40 skeleton rounded-2xl" />
    ),
    ssr: false,
  }
);

const Game_CCO = dynamic<{
  gameData: question<CCOGameType>;
  updateGameState: (
    status: boolean,
    game_id: number,
    time: number
  ) => Promise<void>;
}>(() => import("../components/Game_CCO"), {
  loading: () => (
    <div className="w-full h-full mx-auto bg-disable/40 skeleton rounded-2xl" />
  ),
  ssr: false,
});

const Game_ICTF = dynamic(() => import("../components/Game_ICTF"), {
  loading: () => (
    <div className="w-full h-full mx-auto bg-disable/40 skeleton rounded-2xl" />
  ),
  ssr: false,
});

const Game_SC = dynamic(() => import("../components/Game_SC"), {
  loading: () => (
    <div className="w-full h-full mx-auto bg-disable/40 skeleton rounded-2xl" />
  ),
  ssr: false,
});

const Game_CCW = dynamic(() => import("../components/Game_CCW"), {
  loading: () => (
    <div className="w-full h-full mx-auto bg-disable/40 skeleton rounded-2xl" />
  ),
  ssr: false,
});

const Game_SB = dynamic(() => import("../components/Game_SB"), {
  loading: () => (
    <div className="w-full h-full mx-auto bg-disable/40 skeleton rounded-2xl" />
  ),
  ssr: false,
});

const Game_FIB = dynamic(() => import("../components/Game_FIB"), {
  loading: () => (
    <div className="w-full h-full mx-auto bg-disable/40 skeleton rounded-2xl" />
  ),
  ssr: false,
});

const Game_MC = dynamic(() => import("../components/Game_MC"), {
  loading: () => (
    <div className="w-full h-full mx-auto bg-disable/40 skeleton rounded-2xl" />
  ),
  ssr: false,
});

const Game_JL = dynamic(() => import("../components/Game_JL"), {
  loading: () => (
    <div className="w-full h-full mx-auto bg-disable/40 skeleton rounded-2xl" />
  ),
  ssr: false,
});

const Measurement = dynamic<{
  measurement: {
    correctness_measurement_percentage: number;
    lesson_type: LessonType;
    spending_time: number;
    total_time: number;
    step_id: string;
    lesson_id: number;
    unit_id: number;
  };
}>(() => import("../components/Measurement"), {
  loading: () => (
    <div className="w-full h-full mx-auto bg-disable/40 skeleton rounded-2xl" />
  ),
  ssr: false,
});

type LessonType = "exam" | "flashcard" | "exercise" | "practice";

const GamePage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [game, setGame] = useState<(question & { wrongNumber?: number })[]>();
  const [flashcard, setFlashCard] = useState<TransformedFlashcardType[]>();
  const [LessonType, setLessonType] = useState<LessonType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [wrongAnswer, setWrongAnswer] = useState<number>(0);
  const [totalGame, setTotalGame] = useState<number>(0);
  const [progressCompleted, setProgressCompleted] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [estimateTime, setEstimateTime] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [heart, setHeart] = useState<number>(0);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [stepId, setStepId] = useState<string>("");
  const [lessonId, setLessonId] = useState<number>(0);
  const [unitId, setUnitId] = useState<number>(0);

  const fetchGameData = () => {
    startTransition(async () => {
      await ReqLostHeart();
      const getGame = (await games.toArray()) as
        | question[]
        | TransformedFlashcardType[];
      const getUserProperties = await userProperties.toArray();

      if (getUserProperties && getUserProperties.length > 0) {
        setHeart(getUserProperties[0].heart);
        setIsPremium(getUserProperties[0].isPremium);
      }

      if (getGame && getGame.length > 0) {
        if (getGame[0].type === "flashcard") {
          setFlashCard(getGame as TransformedFlashcardType[]);
        } else {
          setGame(getGame as question[]);
        }
        setLessonType(getGame[0].type);
        setEstimateTime(getGame[0]?.estimate_time_sec || 0);
        setTotalGame(getGame.length);
        setStepId(getGame[0].step_id);
        setLessonId(getGame[0].lesson_id);
        setUnitId(getGame[0].unit_id);
        setLoading(false);
      } else {
        router.back();
      }
    });
  };

  const updateGameState = async (
    status: boolean,
    game_id: number,
    time: number
  ) => {
    setElapsedTime((prev) => prev + time);
    if (status) {
      setProgressCompleted((prev) => prev + 1);
    } else {
      if (!isPremium) {
        setHeart((prev) => (prev > 0 ? prev - 1 : 0));
        await setLostHeart();
      }
    }
    setGame((prevGames) => {
      if (!prevGames) return [];

      let gameItem = _.find(prevGames, { game_id }) as question & {
        wrongNumber?: number;
      };

      if (!gameItem) return prevGames;

      let updatedGames = _.filter(
        prevGames,
        (item: question) => item.game_id !== game_id
      );

      if (!status) {
        gameItem = {
          ...gameItem,
          wrongNumber: (gameItem.wrongNumber || 0) + 1,
        };

        updatedGames = [...updatedGames, gameItem];
        setWrongAnswer((prev) => prev + 1);
      }

      if (updatedGames.length === 0) {
        setTimeout(() => {
          setFinished(true);
        }, 800);
      }
      return updatedGames;
    });
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  if (loading || isPending) {
    return (
      <div className="grid grid-flow-col grid-rows-12 h-dvh md:h-full w-full bg-base-card gap-5 rounded-none md:rounded-2xl overflow-hidden scrollbar-hidden p-10">
        <div className="col-span-3 row-span-12">
          <div className="w-full h-full bg-disable/40 skeleton rounded-2xl" />
        </div>
      </div>
    );
  }

  if (finished && LessonType) {
    return (
      <Measurement
        measurement={{
          correctness_measurement_percentage: Math.ceil(
            ((totalGame - wrongAnswer) / totalGame) * 100
          ),
          lesson_type: LessonType,
          spending_time: elapsedTime,
          total_time: estimateTime,
          step_id: stepId,
          lesson_id: lessonId,
          unit_id: unitId,
        }}
      />
    );
  }

  if (LessonType === "flashcard" && flashcard) {
    return (
      <div className="grid grid-flow-col grid-rows-12 h-dvh md:h-full w-full bg-base-card gap-5 rounded-none md:rounded-2xl overflow-hidden scrollbar-hidden relative p-5">
        <div className="col-span-3 row-span-12">
          <div className="flex justify-center items-center h-full w-full">
            <Game_Flash_Card
              key={flashcard[0].step_id + "_" + flashcard[0].lesson_id}
              cards={flashcard}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-flow-col grid-rows-12 h-dvh md:h-full w-full bg-base-card gap-5 rounded-none md:rounded-2xl overflow-hidden scrollbar-hidden py-5 relative">
      <div className="col-span-3 row-span-1 px-5 flex justify-between items-center ">
        <div className="w-full sm:w-3/4 mx-auto flex justify-between items-center gap-5">
          <div className="flex justify-center items-center gap-2">
            <Image
              src="/svg/shop/favorite.svg"
              alt="favorite"
              width={40}
              height={40}
            />
            {isPremium ? (
              <Icon size="md" name="all_inclusive" />
            ) : (
              <h2>{heart}</h2>
            )}
          </div>
          <ProgressBar
            percent={
              progressCompleted > 0 ? (progressCompleted / totalGame) * 100 : 0
            }
            color="bg-neutral-content"
          />
          <button
            className="cursor-pointer opacity-60"
            onClick={() => {
              router.back();
            }}
          >
            <Icon name="close" size="lg" />
          </button>
        </div>
      </div>

      <div className="col-span-3 row-span-11 ">
        <>
          {game && game.length > 0 && (
            <div className="flex justify-center items-center h-full w-full">
              {(game[0].game_content.type === 1 ||
                game[0].game_content.type === 2) && (
                <Game_CCO
                  key={game[0].game_id + "_" + game[0].wrongNumber || 0}
                  gameData={game[0] as question<CCOGameType>}
                  updateGameState={updateGameState}
                />
              )}

              {game[0].game_content.type === 3 && (
                <Game_ICTF
                  key={game[0].game_id + "_" + game[0].wrongNumber || 0}
                  gameData={game[0] as question<ICTFGameType>}
                  updateGameState={updateGameState}
                />
              )}

              {game[0].game_content.type === 4 && (
                <Game_SC
                  key={game[0].game_id + "_" + game[0].wrongNumber || 0}
                  gameData={game[0] as question<SCGameType>}
                  updateGameState={updateGameState}
                />
              )}

              {game[0].game_content.type === 5 && (
                <Game_CCW
                  key={game[0].game_id + "_" + game[0].wrongNumber || 0}
                  gameData={game[0] as question<CCWGameType>}
                  updateGameState={updateGameState}
                />
              )}

              {game[0].game_content.type === 6 && (
                <Game_SB
                  key={game[0].game_id + "_" + game[0].wrongNumber || 0}
                  gameData={game[0] as question<SBGameType>}
                  updateGameState={updateGameState}
                />
              )}

              {game[0].game_content.type === 7 && (
                <Game_FIB
                  key={game[0].game_id + "_" + game[0].wrongNumber || 0}
                  gameData={game[0] as question<FIBGameType>}
                  updateGameState={updateGameState}
                />
              )}

              {game[0].game_content.type === 8 && (
                <Game_MC
                  key={game[0].game_id + "_" + game[0].wrongNumber || 0}
                  gameData={game[0] as question<MCGameType>}
                  setHeart={async () => {
                    if (!isPremium) {
                      await setLostHeart();
                      setHeart((prev) => (prev > 0 ? prev - 1 : 0));
                    }
                  }}
                  updateGameState={updateGameState}
                />
              )}

              {game[0].game_content.type === 10 && (
                <Game_JL
                  key={game[0].game_id + "_" + game[0].wrongNumber || 0}
                  gameData={game[0] as question<JLGameType>}
                  updateGameState={updateGameState}
                />
              )}
            </div>
          )}
        </>
      </div>

      {!isPremium && heart === 0 && (
        <GameOver
          isVisible={true}
          type="lost_heart"
          onClick={() => {
            router.push("/shop");
          }}
        />
      )}
    </div>
  );
};

export default GamePage;
