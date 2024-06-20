import React, { useCallback } from 'react';

/**
 * @param handler
 * @param disabled
 */
export const useHandleClick = <T extends HTMLElement>(handler: React.MouseEventHandler<T> | undefined, disabled?: boolean) =>
  useCallback<React.MouseEventHandler<T>>(
    (event) => {
      if (disabled) {
        event.preventDefault();
      }
      handler?.(event);
    },
    [disabled, handler]
  );
