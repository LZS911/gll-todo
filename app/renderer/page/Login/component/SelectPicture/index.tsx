import { useMemo, useState } from 'react';
import { classnames } from '../../../../utils';
import './index.less';

export default function SelectPicture(props: {
  onChange: (picName: string, index: number) => void;
  errorInfo: string;
}) {
  const [picIndex, setPicIndex] = useState(-1);

  const handleClick = (picName: string, index: number) => {
    setPicIndex(index);
    props.onChange(picName, index);
  };
  const generatePic = useMemo(() => {
    return Array.from({ length: 9 }).map((_, index) => {
      const picName = `../../../../assets/pic/avatar_0${index + 1}.png`;
      return (
        <div
          onClick={() => handleClick(picName, index)}
          className={classnames(
            ['pic-item', 'pic-item-active'],
            [true, picIndex === index]
          )}
          key={picName}
        >
          <img
            src={require(`../../../../assets/pic/avatar_0${index + 1}.png`)}
          />
        </div>
      );
    });
  }, [picIndex]);
  return (
    <>
      <div className="select-picture">
        <div className="label">
          <span className="required">* </span>
          <span> 选择头像:</span>
        </div>
        <div>
          {generatePic}
          {props.errorInfo && (
            <div className="error-info">{props.errorInfo}</div>
          )}
        </div>
      </div>
    </>
  );
}
