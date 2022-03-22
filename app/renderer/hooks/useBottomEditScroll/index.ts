import * as React from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import useDebounce from '../useDebounce';

export default function useBottomEdit(hideHeight: number, showHeight: number) {
  const [editStyle, setEditStyle] = React.useState({
    transform: `translateY(${hideHeight}px)`,
  });
  const [scrollTop, setScrollTop] = React.useState(0);

  const onScroll = useDebounce(
    (e: any) => {
      unstable_batchedUpdates(() => {
        setScrollTop(e.target.scrollTop);
        setEditStyle({
          transform: `translateY(${e.target.scrollTop + showHeight}px)`,
        });
      });
    },
    400,
    [],
  );

  const handleMouseEnter = () => {
    setEditStyle({
      transform: `translateY(${scrollTop + showHeight}px)`,
    });
  };
  const handleMouseLeave = () => {
    setEditStyle({
      transform: `translateY(${scrollTop + hideHeight}px)`,
    });
  };

  return { onScroll, editStyle, handleMouseEnter, handleMouseLeave };
}
