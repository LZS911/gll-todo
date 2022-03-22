import * as React from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { IMarkDownProps, MarkDownType } from './index.type';
import { classnames, localWrapper } from '../../utils';

import './index.less';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export default function MarkDown(props: IMarkDownProps) {
  const { size, onChange, defaultContent, name, readonly } = props;
  const cacheContent = localWrapper.get(name) ?? '';
  const [value, setValue] = React.useState(
    (cacheContent || defaultContent) ?? '**Hello world!!**'
  );

  const [selectedTab, setSelectedTab] = React.useState<MarkDownType>(
    props.defaultModal ?? 'write'
  );

  const handleChange = React.useCallback(
    (val: string) => {
      localWrapper.set(name, val);
      setValue(val);
      onChange?.(val);
    },
    [name, onChange]
  );

  React.useEffect(() => {
    setValue(cacheContent || defaultContent);
  }, [defaultContent]);

  React.useEffect(() => {
    onChange?.(value);
  }, []);

  return (
    <div
      className={classnames(
        [
          'markdown-container',
          'markdown-container-mini',
          'markdown-container-large',
          'markdown-container-read-only',
        ],
        [true, size === 'mini', size === 'large', !!readonly]
      )}
    >
      <ReactMde
        readOnly={!!readonly}
        value={value}
        onChange={handleChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>
  );
}
