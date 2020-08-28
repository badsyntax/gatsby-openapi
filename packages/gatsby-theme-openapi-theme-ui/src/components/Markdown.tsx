import React from 'react';
import markdown from 'remark-parse';
import remark2react from 'remark-react';
import unified from 'unified';
import { Link } from '../components/Link';

interface MarkdownProps {
  text: string;
}

export const Markdown: React.FunctionComponent<MarkdownProps> = ({ text }) => {
  return (
    <React.Fragment>
      {
        unified()
          .use(markdown)
          .use(remark2react, {
            remarkReactComponents: {
              a: Link,
            },
          })
          .processSync(text).contents
      }
    </React.Fragment>
  );
};
