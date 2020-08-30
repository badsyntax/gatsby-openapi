import React from 'react';
import { CustomPluginOptions } from '../types';
import { defaultPluginOptions } from '../util/defaultPluginOptions';

export const PluginOptionsContext = React.createContext<CustomPluginOptions>(
  defaultPluginOptions({
    specPath: null,
  })
);
