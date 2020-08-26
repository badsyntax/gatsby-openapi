import markdown from 'remark-parse';
import remark2react from 'remark-react';
import unified from 'unified';
import { Link } from '../components/Link';

export function renderMarkdown(contents: string): unknown {
  return (
    unified()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .use(markdown)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .use(remark2react, {
        remarkReactComponents: {
          a: Link,
        },
      })
      .processSync(contents).contents
  );
}
