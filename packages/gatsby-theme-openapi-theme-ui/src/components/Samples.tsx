/** @jsx jsx */
import Prism from '@theme-ui/prism';
import { OpenApiXCodeSample } from 'gatsby-source-openapi/types';
import React from 'react';
import { jsx } from 'theme-ui';
import { TabItem, Tabs } from './Tabs';

const langMap = {
  curl: 'shell',
};

function getLang(lang: string): string {
  return langMap[lang] || lang;
}

interface SamplesProps {
  samples: OpenApiXCodeSample[];
}

export const Samples: React.FunctionComponent<SamplesProps> = ({ samples }) => {
  return (
    <Tabs>
      {samples.map((sample) => {
        const lang = getLang(sample.lang.split('_')[0]);
        return (
          <TabItem
            label={sample.label || sample.lang}
            itemKey={lang}
            key={lang}
          >
            <Prism
              sx={{
                mb: 0,
              }}
              className={`language-${lang}`}
            >
              {decodeURIComponent(sample.source)}
            </Prism>
          </TabItem>
        );
      })}
    </Tabs>
  );
};
