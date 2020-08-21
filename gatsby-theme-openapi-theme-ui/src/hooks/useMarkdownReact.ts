import unified from 'unified';
import markdown from 'remark-parse';
import remark2react from 'remark-react';
import { Link } from '../components/Link';

export function useMarkdownReact(contents: string): unknown {
  return renderMarkdown(contents);
}

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
