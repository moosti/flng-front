"use client";

import { SortableGrid } from "@/components/dnd/sortable/SortableGrid";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ReactNode, useEffect, useState, useTransition } from "react";
import ExitAnimation from "./AnswersCardAnimation";
import _ from "lodash";
import Icon from "@/app/components/base/Icon";
import { ConfirmBtn } from "./ConfirmBtn";
import { MappedItem, SCGameType } from "@/types/game/SCGameType";
import { question } from "@/types/game/RepetitiveGameTyping";
import { shuffleWithoutOriginalOrder } from "@/app/utils/utils";
import AudioButton from "@/app/components/buttons/AudioButton";

type initialItemsType = {
  id: string;
  content: ReactNode;
};
interface Props {
  gameData: question<SCGameType>;
  updateGameState: (status: boolean, game_id: number, time: number) => void;
}

export default function Game_SC({ gameData, updateGameState }: Props) {
  const t = useTranslations("game");

  const [isPending, startTransition] = useTransition();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [openCard, setOpenCard] = useState<boolean>(false);
  const [correct, setCorrect] = useState(false);
  const [sortedCard, setSortedCard] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<initialItemsType[]>([]);

  useEffect(() => {
    if (!openCard) {
      const startTime = Date.now();
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
    return () => {};
  }, [openCard]);

  const handleSort = (newItems: initialItemsType[]) => {
    const mappedDataOnlyId = _.map(newItems, (item) => item.id);
    setSortedCard(mappedDataOnlyId);
  };

  const transformedDataChoices: MappedItem[] =
    gameData.game_content.content.choices.map((item, index) => ({
      id: item.id,
      content: (
        <div
          className="h-full w-full flex flex-col gap-3 justify-center items-center"
          key={index}
        >
          {item.text && <h3 className="text-lg font-semibold">{item.text}</h3>}
          {item.image && (
            <Image
              src={item.image.path || "/placeholder.png"}
              alt={item.image.title}
              fill
              className="object-contain"
              draggable={false}
            />
          )}
        </div>
      ),
    }));

  const shuffleData = shuffleWithoutOriginalOrder(transformedDataChoices);

  const handleConfirm = () => {
    startTransition(async () => {
      const trueAnswerIds = transformedDataChoices.map((item) => item.id);

      if (_.isEqual(sortedCard, trueAnswerIds)) {
        setCorrect(true);
      } else {
        const sortedAnswerSelected = _.orderBy(transformedDataChoices, (item) =>
          _.indexOf(trueAnswerIds, item.id)
        );
        setCorrect(false);

        setCorrectAnswer(sortedAnswerSelected);
      }
      setOpenCard(true);
    });
  };

  return (
    <div className="w-full h-full overflow-hidden grid grid-col-1 grid-rows-12 gap-5 px-5">
      <div className="row-span-2 flex justify-center items-center gap-4">
        <h2>{gameData.game_question}</h2>
        {gameData.game_attachments?.voice && (
          <AudioButton audioSrc={gameData.game_attachments.voice.path} />
        )}
      </div>

      {gameData.game_attachments?.image && (
        <div className="row-span-3 relative flex justify-center items-center">
          <Image
            src={gameData.game_attachments?.image.path}
            alt={gameData.game_attachments?.image.title}
            fill
            className="object-contain"
          />
        </div>
      )}

      <SortableGrid
        color={openCard ? (correct ? "border-success" : "border-error") : ""}
        items={shuffleData}
        onSort={handleSort}
      />

      {!openCard && (
        <div className="row-span-2 w-full absolute bottom-4 flex justify-center items-center translate-x-5">
          <ConfirmBtn onClick={handleConfirm} loading={isPending} />
        </div>
      )}

      <ExitAnimation
        correct={correct}
        isVisible={openCard}
        onClick={() => {
          updateGameState(correct, gameData.game_id, elapsedTime);
        }}
      >
        <div className="flex flex-wrap justify-center items-center gap-2">
          <Icon size="md" name="check_circle" className="text-success" />
          <h3>{t("correct_answer")} :</h3>
          <div className="flex justify-center items-center gap-2">
            {correctAnswer.map((item) => {
              return item.content;
            })}
          </div>
        </div>
      </ExitAnimation>
    </div>
  );
}
