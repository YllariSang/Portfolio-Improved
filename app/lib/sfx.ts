const loadingStartEvent = "sfx:loading-start";
const loadingStopEvent = "sfx:loading-stop";
const redirectEvent = "sfx:redirect";

const dispatch = (eventName: string) => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(eventName));
};

export const emitLoadingStart = () => {
  dispatch(loadingStartEvent);
};

export const emitLoadingStop = () => {
  dispatch(loadingStopEvent);
};

export const emitRedirectSound = () => {
  dispatch(redirectEvent);
};

export const SFX_EVENTS = {
  loadingStartEvent,
  loadingStopEvent,
  redirectEvent,
};
