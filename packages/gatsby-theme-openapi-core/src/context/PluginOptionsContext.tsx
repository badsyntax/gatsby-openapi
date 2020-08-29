import React from 'react';
import { CustomPluginOptions } from '../types';

export const PluginOptionsContext = React.createContext<CustomPluginOptions | null>(
  null
);
