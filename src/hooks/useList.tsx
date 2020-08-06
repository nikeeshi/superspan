import { useState } from "react";
export function useList<Item>(init: Item[]) {
  const [state, setState] = useState(init);
  return {
    state,
    setIth(index: number, newValue: Item) {
      setState(
        state
          .slice(0, index)
          .concat([newValue])
          .concat(state.slice(index + 1))
      );
    },
    delete(index: number) {
      setState(state.slice(0, index).concat(state.slice(index + 1)));
    },
    push(item: Item) {
      setState(state.concat([item]));
    },
    pop() {
      setState(state.slice(0, state.length - 1));
    },
  };
}
