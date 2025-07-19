import { useCallback, useEffect, useMemo, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

/**
 * A minimal hook to manage nested scrolling with optional debugging
 *
 * @param debug - Enable debug logging (default: false)
 * @returns Props for parent and child components
 */
const useNestedScroll = (debug = false) => {
  // State to track parent scroll enabled status
  const [isParentScrollEnabled, setIsParentScrollEnabled] = useState(true);
  // Simple state for tracking last event (for debugging)
  const [lastEvent, setLastEvent] = useState('');

  // Log helper function - memoized to prevent recreation
  const logDebug = useCallback(
    (message: string) => {
      if (debug) {
        console.log(`[NestedScroll] ${message}`);
      }
    },
    [debug]
  );

  // Log when parent scroll state changes - only if debug is enabled
  useEffect(() => {
    if (debug) {
      logDebug(`Parent scroll state: ${isParentScrollEnabled ? 'enabled' : 'disabled'}`);
    }
  }, [isParentScrollEnabled, logDebug, debug]);

  // Memoized event handlers to prevent recreation
  const onChildScrollStart = useCallback(
    (_e: NativeSyntheticEvent<NativeScrollEvent>) => {
      setIsParentScrollEnabled(false);
      if (debug) {
        setLastEvent('Child start');
        logDebug('Child scroll START');
      }
    },
    [debug, logDebug]
  );

  const onChildScrollEnd = useCallback(
    (_e: NativeSyntheticEvent<NativeScrollEvent>) => {
      setIsParentScrollEnabled(true);
      if (debug) {
        setLastEvent('Child end');
        logDebug('Child scroll END');
      }
    },
    [debug, logDebug]
  );

  const onParentScrollBeginDrag = useCallback(() => {
    if (debug) {
      setLastEvent('Parent start');
      logDebug('Parent scroll BEGIN');
    }
  }, [debug, logDebug]);

  const onParentScrollEndDrag = useCallback(() => {
    if (debug) {
      setLastEvent('Parent end');
      logDebug('Parent scroll END');
    }
  }, [debug, logDebug]);

  // Memoize props to prevent unnecessary re-renders
  const parentProps = useMemo(
    () => ({
      scrollEnabled: isParentScrollEnabled,
      nestedScrollEnabled: true,
      onScrollBeginDrag: onParentScrollBeginDrag,
      onScrollEndDrag: onParentScrollEndDrag,
    }),
    [isParentScrollEnabled, onParentScrollBeginDrag, onParentScrollEndDrag]
  );

  const childProps = useMemo(
    () => ({
      nestedScrollEnabled: true,
      onScrollBeginDrag: onChildScrollStart,
      onScrollEndDrag: onChildScrollEnd,
      onMomentumScrollBegin: onChildScrollStart,
      onMomentumScrollEnd: onChildScrollEnd,
      estimatedItemSize: 150, // Increased for better performance
    }),
    [onChildScrollStart, onChildScrollEnd]
  );

  const debugInfo = useMemo(
    () => ({
      isParentScrollEnabled,
      lastEvent,
    }),
    [isParentScrollEnabled, lastEvent]
  );

  return {
    // Props for parent ScrollView
    parentProps,
    // Props for child FlashList/FlatList
    childProps,
    // Debug info
    debugInfo,
  };
};

export default useNestedScroll;
