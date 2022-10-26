import * as React from "react";
import styled from "styled-components";
import {
  getReactionStateLocal,
  setReactionStateLocal,
  updateReactionsDB,
} from "@site/integrations/reactions";

const ActiveButton = styled.button`
  background: #e8f5e9;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid #bdbdbd;
  color: #424242;
  margin: 0.1em 0.3em;
  padding: 0.24em 0.6em;
`;

const InactiveButton = styled.button`
  background: transparent;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #bdbdbd;
  color: #9e9e9e;
  margin: 0.1em 0.3em;
  padding: 0.24em 0.6em;
`;

export default function ButtonReaction({
  slug,
  title,
  reaction,
  reactionCounts,
  setReactionCounts,
}) {
  const isActive = getReactionStateLocal(slug, reaction);
  const ButtonComponent = isActive ? ActiveButton : InactiveButton;

  return (
    <ButtonComponent
      title={title}
      onClick={() => {
        const newReactions = { ...reactionCounts };
        if (isActive) {
          newReactions[reaction] = newReactions[reaction] - 1;
          setReactionStateLocal(slug, reaction, false);
        } else {
          newReactions[reaction] = newReactions[reaction] + 1;
          setReactionStateLocal(slug, reaction, true);
        }
        setReactionCounts(() => newReactions);
        updateReactionsDB(slug, newReactions);
      }}
      type="button"
    >{`${reaction} ${reactionCounts[reaction]}`}</ButtonComponent>
  );
}
